import React from 'react';
import { X, CheckCircle, AlertTriangle, Wind, Target, Dumbbell, Play } from 'lucide-react';
import { AnimatedExerciseVisual } from './AnimatedExerciseVisual';
import { sound } from '../utils/soundEffects';

export const ExerciseDemoModal = ({ exercise, onClose, onStartPractice }) => {
  if (!exercise) return null;

  return (
    <div className="modal-backdrop">
      <div className="exercise-demo-modal">
        {/* Top bar with close button */}
        <div className="demo-header">
          <div>
            <span className="badge-tag">{exercise.difficulty}</span>
            <h3 className="demo-title">{exercise.name}</h3>
            <span className="demo-subtitle">{exercise.nameEn}</span>
          </div>
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
        </div>

        {/* Animated Visual Stage */}
        <div className="demo-visual-box">
          <AnimatedExerciseVisual exerciseId={exercise.id} showControls={true} />
        </div>

        {/* Meta Stats row */}
        <div className="demo-stats-row">
          <div className="stat-pill">
            <span className="stat-label">Hedef Tekrar / Süre</span>
            <span className="stat-value text-emerald">{exercise.defaultReps || '10 Tekrar'}</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">Önerilen Dinlenme</span>
            <span className="stat-value">{exercise.defaultRest || 25} sn</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">Tahmini Kalori</span>
            <span className="stat-value">~{exercise.calories || 10} kcal/set</span>
          </div>
        </div>

        <div className="demo-content-scroll">
          {/* Target muscles */}
          <div className="content-section">
            <div className="section-title">
              <Target size={16} className="text-emerald" />
              <span>Çalışan Kas Grupları</span>
            </div>
            <div className="muscle-tags">
              <span className="tag-prime">Birincil: {exercise.targetMuscle}</span>
              {exercise.secondaryMuscles && (
                <span className="tag-second">İkincil: {exercise.secondaryMuscles}</span>
              )}
            </div>
          </div>

          {/* Step by step execution */}
          <div className="content-section">
            <div className="section-title">
              <CheckCircle size={16} className="text-emerald" />
              <span>Adım Adım Doğru Form</span>
            </div>
            <ol className="steps-list">
              {exercise.steps?.map((step, idx) => (
                <li key={idx} className="step-item">
                  <span className="step-idx">{idx + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Beginner tips and mistakes */}
          {exercise.beginnerMistakes && (
            <div className="content-section warning-box">
              <div className="section-title text-amber">
                <AlertTriangle size={16} />
                <span>Yeni Başlayanlar İçin Hatalar & Püf Noktaları</span>
              </div>
              <ul className="mistakes-list">
                {exercise.beginnerMistakes.map((tip, idx) => (
                  <li key={idx}>
                    <span>•</span>
                    <p>{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Breathing technique */}
          {exercise.breathing && (
            <div className="content-section breath-box">
              <div className="section-title text-cyan">
                <Wind size={16} />
                <span>Nefes Alma / Verme Tekniği</span>
              </div>
              <p className="breath-text">{exercise.breathing}</p>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="demo-footer">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
          >
            Kapat
          </button>
          {onStartPractice && (
            <button 
              type="button" 
              className="btn-primary-glow flex-1"
              onClick={() => {
                sound.playClick();
                onStartPractice(exercise);
              }}
            >
              <Play size={18} />
              <span>Bu Hareketi Antrenmanda Yap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
