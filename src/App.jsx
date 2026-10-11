import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { TodayTab } from './components/TodayTab';
import { WeeklyPlanTab } from './components/WeeklyPlanTab';
import { ExerciseLibraryTab } from './components/ExerciseLibraryTab';
import { NotificationsTab } from './components/NotificationsTab';
import { ProfileTab } from './components/ProfileTab';
import { OnboardingModal } from './components/OnboardingModal';
import { ExerciseDemoModal } from './components/ExerciseDemoModal';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import { PhoneConnectModal } from './components/PhoneConnectModal';
import { generateWeeklyPlan } from './data/workoutGenerator';
import { defaultWeeklyReminders } from './utils/notificationManager';
import { sound } from './utils/soundEffects';
import { BellRing, X } from 'lucide-react';
import './App.css';

const DEFAULT_PROFILE = {
  name: 'Can',
  age: 26,
  height: 176,
  weight: 76,
  gender: 'male',
  goal: 'lose_weight',
  workoutDaysPerWeek: 3,
  experience: 'beginner'
};

export function App() {
  // Load stored profile or fallback
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('fitpulse_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Modals & Navigation state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isPhoneConnectOpen, setIsPhoneConnectOpen] = useState(false);
  const [selectedDemoExercise, setSelectedDemoExercise] = useState(null);
  const [activeWorkoutSession, setActiveWorkoutSession] = useState(null);

  // App metrics & reminders state
  const [waterGlasses, setWaterGlasses] = useState(() => {
    try {
      const saved = localStorage.getItem('fitpulse_water');
      return saved ? JSON.parse(saved) : 4;
    } catch {
      return 4;
    }
  });

  const [streakCount, setStreakCount] = useState(() => {
    try {
      const saved = localStorage.getItem('fitpulse_streak');
      return saved ? JSON.parse(saved) : 2;
    } catch {
      return 2;
    }
  });

  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('fitpulse_completed_days');
      return saved ? JSON.parse(saved) : { 1: true }; // default Monday done for demo
    } catch {
      return { 1: true };
    }
  });

  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('fitpulse_reminders');
      return saved ? JSON.parse(saved) : defaultWeeklyReminders;
    } catch {
      return defaultWeeklyReminders;
    }
  });

  const [currentWeek, setCurrentWeek] = useState(() => {
    try {
      const saved = localStorage.getItem('fitpulse_current_week');
      return saved ? JSON.parse(saved) : 1;
    } catch {
      return 1;
    }
  });

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('fitpulse_stats');
      return saved ? JSON.parse(saved) : { completedCount: 2, totalCalories: 230 };
    } catch {
      return { completedCount: 2, totalCalories: 230 };
    }
  });

  // In-App Toast notification banner simulator
  const [inAppToast, setInAppToast] = useState(null);

  // Generated weekly plan with progressive overload week scaling
  const [weeklyPlan, setWeeklyPlan] = useState(() => generateWeeklyPlan(userProfile, currentWeek));

  // Update plan whenever profile or current week changes
  useEffect(() => {
    const newPlan = generateWeeklyPlan(userProfile, currentWeek);
    setWeeklyPlan(newPlan);
    localStorage.setItem('fitpulse_profile', JSON.stringify(userProfile));
    localStorage.setItem('fitpulse_current_week', JSON.stringify(currentWeek));
  }, [userProfile, currentWeek]);

  // Persist states
  useEffect(() => {
    localStorage.setItem('fitpulse_water', JSON.stringify(waterGlasses));
  }, [waterGlasses]);

  useEffect(() => {
    localStorage.setItem('fitpulse_streak', JSON.stringify(streakCount));
  }, [streakCount]);

  useEffect(() => {
    localStorage.setItem('fitpulse_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('fitpulse_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('fitpulse_stats', JSON.stringify(stats));
  }, [stats]);

  // Toast auto-dismiss
  useEffect(() => {
    if (inAppToast) {
      const t = setTimeout(() => {
        setInAppToast(null);
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [inAppToast]);

  // Handlers
  const handleSaveProfile = (newProfile) => {
    setUserProfile(newProfile);
    setIsOnboardingOpen(false);
  };

  const handleToggleDayCompleted = (dayIndex) => {
    setCompletedDays((prev) => {
      const updated = { ...prev, [dayIndex]: !prev[dayIndex] };
      return updated;
    });
  };

  const handleToggleReminder = (reminderId) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === reminderId ? { ...r, active: !r.active } : r))
    );
  };

  const handleTriggerInAppToast = (toastData) => {
    setInAppToast(toastData);
  };

  const handleCompleteWorkout = (result) => {
    setStats((prev) => ({
      completedCount: prev.completedCount + 1,
      totalCalories: prev.totalCalories + (result?.calories || 110)
    }));
    setStreakCount((s) => s + 1);

    // Also mark active day as completed if applicable
    if (activeWorkoutSession?.dayIndex !== undefined) {
      handleToggleDayCompleted(activeWorkoutSession.dayIndex);
    }
  };

  const handleAddWater = () => {
    setWaterGlasses((w) => w + 1);
  };

  const handleRemoveWater = () => {
    setWaterGlasses((w) => Math.max(0, w - 1));
  };

  return (
    <div className="fitpulse-root">
      <MobileFrame isPhoneFrame={isPhoneFrame}>
        {/* In-App Toast Push Banner */}
        {inAppToast && (
          <div className="in-app-toast-banner" onClick={() => setInAppToast(null)}>
            <div className="toast-icon">
              <BellRing size={18} className="text-emerald" />
            </div>
            <div className="toast-text-box">
              <div className="toast-head-row">
                <span className="toast-app-name">FitPulse Bildirim</span>
                <span className="toast-time">{inAppToast.time}</span>
              </div>
              <h5 className="toast-title">{inAppToast.title}</h5>
              <p className="toast-body">{inAppToast.body}</p>
            </div>
            <button 
              type="button" 
              className="toast-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setInAppToast(null);
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Top Header */}
        <Header 
          userProfile={userProfile}
          streakCount={streakCount}
          waterGlasses={waterGlasses}
          onAddWater={handleAddWater}
          onOpenNotifications={() => setActiveTab('notifications')}
          isPhoneFrame={isPhoneFrame}
          onToggleFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          onOpenPhoneConnect={() => setIsPhoneConnectOpen(true)}
        />

        {/* Active Tab Screen */}
        <main className="app-main-content">
          {activeTab === 'today' && (
            <TodayTab 
              userProfile={userProfile}
              weeklyPlan={weeklyPlan}
              onStartWorkout={(plan) => setActiveWorkoutSession(plan)}
              onOpenExerciseDemo={(ex) => setSelectedDemoExercise(ex)}
              waterGlasses={waterGlasses}
              onAddWater={handleAddWater}
              onRemoveWater={handleRemoveWater}
              onGoToNotifications={() => setActiveTab('notifications')}
            />
          )}

          {activeTab === 'plan' && (
            <WeeklyPlanTab 
              weeklyPlan={weeklyPlan}
              currentWeek={currentWeek}
              onSelectWeek={(w) => setCurrentWeek(w)}
              completedDays={completedDays}
              onToggleDayCompleted={handleToggleDayCompleted}
              onStartWorkout={(plan) => setActiveWorkoutSession(plan)}
              onOpenExerciseDemo={(ex) => setSelectedDemoExercise(ex)}
              onLevelUp={() => {
                const nextW = Math.min(4, currentWeek + 1);
                setCurrentWeek(nextW);
                setInAppToast({
                  title: `${nextW}. Haftaya Terfi Ettin! 🚀`,
                  body: `Tebrikler! Yeni seviyede set hacmi ve kalori yakımı arttı. Başarılar!`,
                  time: 'Şimdi'
                });
              }}
            />
          )}

          {activeTab === 'exercises' && (
            <ExerciseLibraryTab 
              onOpenExerciseDemo={(ex) => setSelectedDemoExercise(ex)}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsTab 
              reminders={reminders}
              onToggleReminder={handleToggleReminder}
              onTriggerInAppToast={handleTriggerInAppToast}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab 
              userProfile={userProfile}
              weeklyPlan={weeklyPlan}
              onEditProfile={() => setIsOnboardingOpen(true)}
              stats={stats}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unreadNotificationsCount={reminders.filter(r => r.active).length}
        />

        {/* Modals */}
        <OnboardingModal 
          isOpen={isOnboardingOpen}
          currentProfile={userProfile}
          onSave={handleSaveProfile}
          onClose={() => setIsOnboardingOpen(false)}
          isEdit={true}
        />

        {selectedDemoExercise && (
          <ExerciseDemoModal 
            exercise={selectedDemoExercise}
            onClose={() => setSelectedDemoExercise(null)}
            onStartPractice={(ex) => {
              setSelectedDemoExercise(null);
              setActiveWorkoutSession({
                title: `${ex.name} Pratik Seansı`,
                exercises: [ex]
              });
            }}
          />
        )}

        {activeWorkoutSession && (
          <WorkoutPlayerModal 
            workoutTitle={activeWorkoutSession.title}
            exercises={activeWorkoutSession.exercises || []}
            onClose={() => setActiveWorkoutSession(null)}
            onCompleteWorkout={handleCompleteWorkout}
          />
        )}

        <PhoneConnectModal 
          isOpen={isPhoneConnectOpen}
          onClose={() => setIsPhoneConnectOpen(false)}
          localIp="192.168.1.106"
          port="5173"
        />
      </MobileFrame>
    </div>
  );
}

export default App;
