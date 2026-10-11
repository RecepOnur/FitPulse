import React from 'react';
import { Play, Flame, Clock, Droplets, CheckCircle2, ChevronRight, Sparkles, HeartPulse, ShieldAlert, BellRing } from 'lucide-react';
import { AnimatedExerciseVisual } from './AnimatedExerciseVisual';
import { sound } from '../utils/soundEffects';

export const TodayTab = ({ 
  userProfile, 
  weeklyPlan, 
  onStartWorkout, 
  onOpenExerciseDemo,
  waterGlasses,
  onAddWater,
  onRemoveWater,
  onGoToNotifications
}) => {
  // Determine today's workout (by default day 1 of the weekly cycle or based on current date)
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday
  const todayPlan = weeklyPlan?.days?.find(d => d.dayIndex === currentDayIndex) || weeklyPlan?.days?.[0];
  const featuredExercise = todayPlan?.exercises?.[0] || weeklyPlan?.days?.[0]?.exercises?.[0];

  const targetWaterGlasses = Math.round((Number(weeklyPlan?.nutrition?.dailyWaterLiters) || 2.5) * 4); // each glass ~250ml

  return (
    <div className="tab-container today-tab">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div>
          <span className="welcome-sub">SPORA HOŞ GELDİN ✨</span>
          <h2 className="welcome-name">Merhaba, {userProfile?.name || 'Sporcu'}!</h2>
        </div>
        <div className="goal-chip">
          <span>{userProfile?.goal === 'lose_weight' ? '🔥 Yağ Yakımı' : userProfile?.goal === 'build_muscle' ? '💪 Kas Kazanımı' : '🌿 Sağlıklı Yaşam'}</span>
        </div>
      </div>

      {/* Main Today's Workout Card */}
      <div className={`hero-workout-card ${todayPlan?.isWorkout ? 'workout-active' : 'rest-day'}`}>
        <div className="hero-card-header">
          <div className="hero-status-pill">
            <span className="pulse-dot-green"></span>
            <span>{todayPlan?.isWorkout ? 'GÜNÜN ANTRENMANI' : 'DİNLENME GÜNÜ'}</span>
          </div>
          <span className="hero-day-name">{todayPlan?.dayName}</span>
        </div>

        <div className="hero-card-body">
          <h3 className="hero-title">{todayPlan?.title}</h3>
          <p className="hero-subtitle">{todayPlan?.subtitle}</p>

          {todayPlan?.isWorkout ? (
            <>
              <div className="hero-meta-row">
                <div className="hero-meta-item">
                  <Clock size={16} className="text-emerald" />
                  <span>{todayPlan?.estimatedMinutes} Dakika</span>
                </div>
                <div className="hero-meta-item">
                  <Flame size={16} className="text-amber" />
                  <span>~{todayPlan?.estimatedCalories} kcal</span>
                </div>
                <div className="hero-meta-item">
                  <HeartPulse size={16} className="text-rose" />
                  <span>{todayPlan?.exercises?.length} Egzersiz</span>
                </div>
              </div>

              {/* Exercises in today's session preview */}
              <div className="hero-exercises-pills">
                {todayPlan?.exercises?.map((ex, i) => (
                  <button 
                    key={i} 
                    type="button" 
                    className="hero-ex-tag"
                    onClick={() => {
                      sound.playClick();
                      onOpenExerciseDemo(ex);
                    }}
                  >
                    <span>{ex.name}</span>
                    <ChevronRight size={13} />
                  </button>
                ))}
              </div>

              <button 
                type="button" 
                className="btn-start-hero"
                onClick={() => {
                  sound.playClick();
                  onStartWorkout(todayPlan);
                }}
              >
                <div className="play-icon-box">
                  <Play size={20} fill="#090d16" />
                </div>
                <div className="start-btn-texts">
                  <span className="start-main">Antrenmana Başla</span>
                  <span className="start-sub">Sesli ve animasyonlu rehber ile</span>
                </div>
              </button>
            </>
          ) : (
            <div className="rest-day-content">
              <div className="rest-icon-circle">🌿</div>
              <p className="rest-tip-text">
                Bugün kaslarının dinlenme günü. Kas lifleri dinlenme esnasında kendini onarır ve güçlenir.
              </p>
              <div className="rest-suggestion-box">
                <strong>Günün Tavsiyesi:</strong> 25-30 dakikalık açık hava yürüyüşü ve bol su tüketimi.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Exercise Visual Demo Card */}
      {featuredExercise && (
        <div className="featured-demo-card">
          <div className="demo-card-head">
            <div className="demo-badge-wrap">
              <Sparkles size={16} className="text-cyan" />
              <span>GÜNÜN ÖNE ÇIKAN HAREKETİ</span>
            </div>
            <button 
              type="button" 
              className="text-link-btn"
              onClick={() => {
                sound.playClick();
                onOpenExerciseDemo(featuredExercise);
              }}
            >
              Tüm Detayları Gör
            </button>
          </div>

          <div className="featured-demo-inner">
            <div className="demo-mini-visual">
              <AnimatedExerciseVisual exerciseId={featuredExercise.id} isPlaying={true} showControls={false} />
            </div>
            <div className="demo-mini-content">
              <h4>{featuredExercise.name}</h4>
              <p className="demo-target">{featuredExercise.targetMuscle}</p>
              <div className="demo-tip-callout">
                <span>💡</span> {featuredExercise.beginnerMistakes?.[0] || 'Dizlerini içeri çökertme.'}
              </div>
              <button 
                type="button" 
                className="btn-outline-glow"
                onClick={() => {
                  sound.playClick();
                  onOpenExerciseDemo(featuredExercise);
                }}
              >
                <span>Nasıl Yapılır? İzle</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Water Hydration Tracker Card */}
      <div className="water-tracker-card">
        <div className="water-card-head">
          <div className="water-title-wrap">
            <Droplets size={20} className="text-cyan" />
            <div>
              <h4>Günlük Su Takibi</h4>
              <span className="water-sub">Hedef: {weeklyPlan?.nutrition?.dailyWaterLiters || 2.5} Litre ({targetWaterGlasses} Bardak)</span>
            </div>
          </div>
          <span className="water-current-num text-cyan">
            {waterGlasses * 0.25} / {weeklyPlan?.nutrition?.dailyWaterLiters || 2.5} L
          </span>
        </div>

        {/* Progress bar */}
        <div className="water-bar-track">
          <div 
            className="water-bar-fill" 
            style={{ width: `${Math.min(100, (waterGlasses / targetWaterGlasses) * 100)}%` }}
          ></div>
        </div>

        <div className="water-controls">
          <button 
            type="button" 
            className="water-btn-circle" 
            onClick={() => {
              sound.playClick();
              onRemoveWater();
            }}
            disabled={waterGlasses <= 0}
          >
            -
          </button>
          <span className="water-glasses-count">{waterGlasses} Bardak İçildi</span>
          <button 
            type="button" 
            className="water-btn-circle active" 
            onClick={() => {
              sound.playClick();
              onAddWater();
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Notification status preview banner */}
      <div className="notification-teaser-card" onClick={onGoToNotifications}>
        <div className="teaser-icon">
          <BellRing size={20} className="text-emerald" />
        </div>
        <div className="teaser-content">
          <h4>Haftalık Akıllı Bildirimler Açık</h4>
          <p>Antrenman günlerinde ve dinlenme saatlerinde otomatik bildirim alıyorsun.</p>
        </div>
        <ChevronRight size={18} className="text-slate-400" />
      </div>

      {/* Daily Motivation snippet */}
      <div className="daily-quote-card">
        <span className="quote-mark">“</span>
        <p className="quote-body">
          {todayPlan?.healthTip || 'Bugün attığın küçük bir adım, bir ay sonraki büyük enerjinin başlangıcıdır.'}
        </p>
      </div>
    </div>
  );
};
