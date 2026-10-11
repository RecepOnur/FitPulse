import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, SkipForward, CheckCircle, Volume2, VolumeX, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatedExerciseVisual } from './AnimatedExerciseVisual';
import { sound } from '../utils/soundEffects';

export const WorkoutPlayerModal = ({ workoutTitle, exercises, onClose, onCompleteWorkout }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [state, setState] = useState('prepare'); // 'prepare' | 'active' | 'rest' | 'finished'
  const [timeLeft, setTimeLeft] = useState(5); // start with 5s prepare
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);

  const currentExercise = exercises[currentIdx];
  const totalSets = currentExercise?.sets || 2;
  const isLastExercise = currentIdx === exercises.length - 1 && currentSet === totalSets;

  // Interval timer ref
  const timerRef = useRef(null);

  // Play sound helper
  const triggerAudio = (type) => {
    if (!soundEnabled) return;
    if (type === 'tick') sound.playCountdown();
    if (type === 'start') sound.playStart();
    if (type === 'rest') sound.playRest();
    if (type === 'win') sound.playVictory();
  };

  // Main countdown ticker
  useEffect(() => {
    if (state === 'finished' || isPaused) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTotalSecondsElapsed((prev) => prev + 1);

      setTimeLeft((prev) => {
        if (prev <= 4 && prev > 1) {
          triggerAudio('tick');
        }

        if (prev <= 1) {
          // Transition state
          handleTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [state, isPaused, currentIdx, currentSet]);

  const handleTimerEnd = () => {
    if (state === 'prepare') {
      triggerAudio('start');
      setState('active');
      setTimeLeft(currentExercise.defaultTime || 30);
    } else if (state === 'active') {
      if (currentSet < totalSets) {
        // Need to do more sets of this exercise -> Rest
        triggerAudio('rest');
        setState('rest');
        setTimeLeft(currentExercise.restSeconds || 25);
      } else {
        // Sets finished for this exercise
        if (currentIdx < exercises.length - 1) {
          // Next exercise -> Rest first
          triggerAudio('rest');
          setState('rest');
          setTimeLeft(currentExercise.restSeconds || 25);
        } else {
          // All workout complete!
          triggerAudio('win');
          finishWorkout();
        }
      }
    } else if (state === 'rest') {
      triggerAudio('start');
      if (currentSet < totalSets) {
        setCurrentSet((s) => s + 1);
        setState('active');
        setTimeLeft(currentExercise.defaultTime || 30);
      } else {
        setCurrentIdx((i) => i + 1);
        setCurrentSet(1);
        setState('active');
        setTimeLeft(exercises[currentIdx + 1]?.defaultTime || 30);
      }
    }
  };

  const finishWorkout = () => {
    setState('finished');
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch {
      // ignore
    }
  };

  const handleSkip = () => {
    sound.playClick();
    if (state === 'prepare') {
      setState('active');
      setTimeLeft(currentExercise.defaultTime || 30);
    } else if (state === 'rest') {
      handleTimerEnd();
    } else {
      // Skip current set
      if (currentSet < totalSets) {
        setCurrentSet((s) => s + 1);
        setTimeLeft(currentExercise.defaultTime || 30);
      } else if (currentIdx < exercises.length - 1) {
        setCurrentIdx((i) => i + 1);
        setCurrentSet(1);
        setState('prepare');
        setTimeLeft(5);
      } else {
        triggerAudio('win');
        finishWorkout();
      }
    }
  };

  const formatSeconds = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="modal-backdrop z-player">
      <div className="workout-player-container">
        {/* Top Player Header */}
        <div className="player-top-header">
          <button 
            type="button" 
            className="icon-circle-btn"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
          >
            <X size={20} />
          </button>

          <div className="player-title-info">
            <h4>{workoutTitle || 'Antrenman Seansı'}</h4>
            {state !== 'finished' && (
              <span className="ex-counter">
                Hareket {currentIdx + 1} / {exercises.length}
              </span>
            )}
          </div>

          <button 
            type="button" 
            className={`icon-circle-btn ${soundEnabled ? 'text-emerald' : 'text-slate-500'}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        {/* State: FINISHED SCREEN */}
        {state === 'finished' ? (
          <div className="finished-view">
            <div className="trophy-glow">
              <Trophy size={64} className="text-emerald trophy-animate" />
            </div>
            <h2>Harika İş Çıkardın! 🎉</h2>
            <p className="finished-sub">
              Spora yeni başlayanlar için bu ilk adımlar en değerlisidir. Harika bir antrenmanı başarıyla tamamladın!
            </p>

            <div className="workout-summary-cards">
              <div className="summary-pill">
                <span className="pill-title">Süre</span>
                <span className="pill-num text-emerald">{formatSeconds(totalSecondsElapsed)}</span>
              </div>
              <div className="summary-pill">
                <span className="pill-title">Egzersiz</span>
                <span className="pill-num">{exercises.length} Hareket</span>
              </div>
              <div className="summary-pill">
                <span className="pill-title">Yakılan Kalori</span>
                <span className="pill-num text-amber">
                  ~{Math.round(totalSecondsElapsed * 0.14) + 65} kcal
                </span>
              </div>
            </div>

            <div className="tips-box-post">
              <Sparkles size={18} className="text-emerald shrink-0" />
              <p>
                <strong>Sonraki Adım:</strong> Kas toparlanması için 1-2 bardak ılık su iç ve derin nefes alarak rahatla.
              </p>
            </div>

            <button 
              type="button" 
              className="btn-primary-glow w-full py-4"
              onClick={() => {
                sound.playClick();
                if (onCompleteWorkout) {
                  onCompleteWorkout({
                    durationSeconds: totalSecondsElapsed,
                    calories: Math.round(totalSecondsElapsed * 0.14) + 65,
                    exerciseCount: exercises.length
                  });
                }
                onClose();
              }}
            >
              <span>Antrenmanı Bitir & Kaydet</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          /* State: ACTIVE / PREPARE / REST SCREEN */
          <div className="player-body">
            {/* Visual stage */}
            <div className="player-visual-stage">
              {state === 'rest' ? (
                <div className="rest-screen-box">
                  <div className="rest-timer-ring">
                    <span className="rest-ring-title">DİNLENME</span>
                    <span className="rest-ring-sec">{timeLeft}s</span>
                  </div>
                  <div className="next-ex-teaser">
                    <span className="next-tag">Sıradaki Hareket:</span>
                    <span className="next-name">
                      {currentSet < totalSets
                        ? `${currentExercise.name} (Set ${currentSet + 1})`
                        : exercises[currentIdx + 1]?.name || 'Son Hareket'}
                    </span>
                  </div>
                </div>
              ) : (
                <AnimatedExerciseVisual 
                  exerciseId={currentExercise?.id} 
                  isPlaying={!isPaused}
                  showControls={false} 
                />
              )}
            </div>

            {/* Exercise Information Banner */}
            <div className="player-ex-info">
              <div className="ex-title-row">
                <h3>{currentExercise?.name}</h3>
                <span className="set-tag">
                  Set {currentSet} / {totalSets}
                </span>
              </div>
              <p className="ex-target-txt">🎯 {currentExercise?.targetMuscle}</p>
            </div>

            {/* Big Countdown / Timer */}
            <div className={`player-timer-card ${state}`}>
              <div className="timer-badge">
                {state === 'prepare' && 'HAZIRLAN'}
                {state === 'active' && 'EGZERSİZ ZAMANI'}
                {state === 'rest' && 'NEFES AL & DİNLEN'}
              </div>
              <div className="big-time-display">
                {formatSeconds(timeLeft)}
              </div>
              <p className="timer-subtext">
                {state === 'active' 
                  ? `${currentExercise?.defaultReps || '10 Tekrar'} temposunda düzenli nefes al`
                  : 'Gevşe ve bir sonraki sete odaklan'}
              </p>
            </div>

            {/* Form tip snippet */}
            <div className="quick-tip-bar">
              <span>💡 Form İpucu:</span> {currentExercise?.beginnerMistakes?.[0] || 'Duruşunu bozmadan kontrollü yap.'}
            </div>

            {/* Player Bottom Control buttons */}
            <div className="player-controls">
              <button 
                type="button" 
                className="btn-pause-play"
                onClick={() => {
                  sound.playClick();
                  setIsPaused(!isPaused);
                }}
              >
                {isPaused ? <Play size={24} /> : <Pause size={24} />}
                <span>{isPaused ? 'Devam Et' : 'Duraklat'}</span>
              </button>

              <button 
                type="button" 
                className="btn-skip-step"
                onClick={handleSkip}
              >
                <span>{state === 'rest' ? 'Dinlenmeyi Bitir' : 'Sonraki'}</span>
                <SkipForward size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
