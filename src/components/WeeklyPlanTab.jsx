import React, { useState } from 'react';
import { Calendar, Clock, Flame, CheckCircle2, ChevronDown, ChevronUp, Play, Info, Sparkles, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { WEEKS_CONFIG } from '../data/workoutGenerator';
import { sound } from '../utils/soundEffects';

export const WeeklyPlanTab = ({ 
  weeklyPlan, 
  currentWeek = 1,
  onSelectWeek,
  completedDays = {}, 
  onToggleDayCompleted, 
  onStartWorkout, 
  onOpenExerciseDemo,
  onLevelUp
}) => {
  const [expandedDay, setExpandedDay] = useState(1); // default expand Monday

  const days = weeklyPlan?.days || [];
  const weekConfig = weeklyPlan?.weekConfig || WEEKS_CONFIG[0];

  return (
    <div className="tab-container weekly-plan-tab">
      {/* 4-Week Progression Navigation Strip */}
      <div className="weeks-selector-card">
        <div className="weeks-nav-head">
          <div className="nav-head-left">
            <TrendingUp size={16} className="text-emerald" />
            <span className="weeks-nav-title">AŞAMALI ZORLAŞMA (PROGRESSIVE OVERLOAD)</span>
          </div>
          <span className="current-level-pill" style={{ color: weekConfig.color, borderColor: `${weekConfig.color}40`, backgroundColor: `${weekConfig.color}15` }}>
            {weekConfig.intensity} Zorluk
          </span>
        </div>

        <div className="weeks-pills-row">
          {WEEKS_CONFIG.map((w) => (
            <button
              key={w.week}
              type="button"
              className={`week-pill-btn ${currentWeek === w.week ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                onSelectWeek(w.week);
              }}
            >
              <span className="pill-w-num">{w.week}. Hafta</span>
              <span className="pill-w-sub">{w.intensityLevel}</span>
            </button>
          ))}
        </div>

        {/* Current Week Progression Details Banner */}
        <div className="week-progression-banner" style={{ borderLeftColor: weekConfig.color }}>
          <div className="prog-title-row">
            <h4>{weekConfig.title}</h4>
            <span className="prog-tag" style={{ color: weekConfig.color }}>{weekConfig.subtitle}</span>
          </div>
          <p className="prog-desc-p">{weekConfig.desc}</p>
        </div>
      </div>

      {/* Plan Header */}
      <div className="plan-header-card">
        <div className="plan-title-row">
          <div className="plan-badge">
            <Sparkles size={16} className="text-emerald" />
            <span>{currentWeek}. HAFTA ANTRENMAN PROGRAMI</span>
          </div>
          <span className="badge-tag">{weekConfig.intensityLevel}</span>
        </div>
        <h3>7 Günlük Antrenman & Dinlenme Takvimi</h3>
        <p className="plan-summary-p">
          İlerledikçe set sayıları, egzersiz süreleri ve kalori yakımı artar; dinlenme süreleri kısalarak kondisyonun güçlenir.
        </p>

        {/* Weekly Stats Bar */}
        <div className="plan-stats-strip">
          <div className="strip-item">
            <span className="strip-val text-emerald">{weeklyPlan?.totalWeeklyWorkouts || 3} Gün</span>
            <span className="strip-lbl">Antrenman</span>
          </div>
          <div className="strip-divider"></div>
          <div className="strip-item">
            <span className="strip-val">{weeklyPlan?.totalWeeklyMinutes || 52} dk</span>
            <span className="strip-lbl">Toplam Süre</span>
          </div>
          <div className="strip-divider"></div>
          <div className="strip-item">
            <span className="strip-val text-amber">~{weeklyPlan?.totalWeeklyCalories || 370} kcal</span>
            <span className="strip-lbl">Tahmini Yakım</span>
          </div>
        </div>
      </div>

      {/* Days List */}
      <div className="weekly-days-list">
        {days.map((day) => {
          const isExpanded = expandedDay === day.dayIndex;
          const isCompleted = !!completedDays[day.dayIndex];

          return (
            <div 
              key={day.dayIndex} 
              className={`day-card ${day.isWorkout ? 'workout-day' : 'rest-day'} ${isCompleted ? 'completed-card' : ''}`}
            >
              {/* Day Header Row */}
              <div 
                className="day-card-header"
                onClick={() => {
                  sound.playClick();
                  setExpandedDay(isExpanded ? null : day.dayIndex);
                }}
              >
                <div className="day-left-meta">
                  <span className={`day-tag ${day.isWorkout ? 'tag-workout' : 'tag-rest'}`}>
                    {day.dayName}
                  </span>
                  <div>
                    <h4 className="day-title">{day.title}</h4>
                    <span className="day-sub-focus">🎯 {day.focus}</span>
                  </div>
                </div>

                <div className="day-right-meta">
                  {day.isWorkout && (
                    <span className="day-mins">{day.estimatedMinutes} dk</span>
                  )}
                  <button 
                    type="button" 
                    className="expand-arrow-btn"
                    title={isExpanded ? 'Gizle' : 'Detayları Gör'}
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="day-card-content">
                  <p className="day-description">{day.subtitle}</p>

                  {/* Health Tip */}
                  {day.healthTip && (
                    <div className="day-tip-bar">
                      <span className="tip-badge">Önemli:</span> {day.healthTip}
                    </div>
                  )}

                  {/* Exercises list */}
                  {day.isWorkout && day.exercises?.length > 0 && (
                    <div className="day-exercises-container">
                      <span className="ex-list-label">Egzersizler ({day.exercises.length} Hareket):</span>
                      <div className="day-exercises-grid">
                        {day.exercises.map((ex, exIdx) => (
                          <div key={exIdx} className="day-exercise-row">
                            <div className="ex-info-block">
                              <span className="ex-idx-num">{exIdx + 1}</span>
                              <div>
                                <span className="ex-row-name">{ex.name}</span>
                                <span className="ex-row-target">{ex.sets} Set × {ex.repsOrDuration}</span>
                              </div>
                            </div>

                            <button 
                              type="button" 
                              className="btn-ex-view"
                              onClick={() => {
                                sound.playClick();
                                onOpenExerciseDemo(ex);
                              }}
                            >
                              <Info size={14} />
                              <span>Nasıl Yapılır?</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Day Action Buttons */}
                      <div className="day-actions-row">
                        <button 
                          type="button" 
                          className="btn-primary-glow flex-1"
                          onClick={() => {
                            sound.playClick();
                            onStartWorkout(day);
                          }}
                        >
                          <Play size={17} />
                          <span>Antrenmanı Başlat</span>
                        </button>

                        <button 
                          type="button" 
                          className={`btn-check-complete ${isCompleted ? 'active' : ''}`}
                          onClick={() => {
                            sound.playClick();
                            onToggleDayCompleted(day.dayIndex);
                          }}
                        >
                          <CheckCircle2 size={18} />
                          <span>{isCompleted ? 'Tamamlandı' : 'Tamamlandı İşaretle'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {!day.isWorkout && (
                    <div className="rest-day-notice">
                      <span>💤</span>
                      <p>Kas toparlanması ve zihinsel dinlenme için ayrılmış gün. 2-3 litre su içmeyi ihmal etme.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Level Up Button to graduate to next week */}
      {currentWeek < 4 && (
        <div className="level-up-card">
          <div className="level-up-info">
            <Award size={24} className="text-emerald" />
            <div>
              <h4>{currentWeek}. Haftayı Tamamladın mı?</h4>
              <p>Bir sonraki haftanın artırılmış zorluk seviyesine terfi et!</p>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-level-up"
            onClick={() => {
              sound.playClick();
              if (onLevelUp) onLevelUp();
            }}
          >
            <span>{currentWeek + 1}. Haftaya Geç</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
