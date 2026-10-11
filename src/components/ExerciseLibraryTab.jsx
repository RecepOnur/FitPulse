import React, { useState } from 'react';
import { Search, Filter, Dumbbell, Play, Eye, Sparkles } from 'lucide-react';
import { exercisesData } from '../data/exercisesData';
import { AnimatedExerciseVisual } from './AnimatedExerciseVisual';
import { sound } from '../utils/soundEffects';

export const ExerciseLibraryTab = ({ onOpenExerciseDemo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'lower', label: 'Alt Vücut (Bacak)' },
    { id: 'upper', label: 'Üst Vücut (Göğüs/Kol)' },
    { id: 'core', label: 'Core (Karın/Bel)' },
    { id: 'cardio', label: 'Kardiyo & Yağ Yakımı' }
  ];

  const filteredExercises = exercisesData.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="tab-container exercise-lib-tab">
      <div className="lib-header">
        <div className="lib-title-row">
          <div>
            <span className="badge-tag">GÖRSEL HAREKET REHBERİ</span>
            <h2>Egzersiz Kütüphanesi</h2>
          </div>
          <span className="lib-count-chip">{filteredExercises.length} Hareket</span>
        </div>
        <p className="lib-desc">
          Tüm hareketler spora yeni başlayanlara uygun güvenli formlar, prototip hareket animasyonları ve doğru nefes teknikleriyle hazırlanmıştır.
        </p>

        {/* Search bar */}
        <div className="search-bar-wrap">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Egzersiz veya kas grubu ara (örn: Squat, Bacak)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Pills */}
        <div className="category-scroll-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="exercises-cards-grid">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card-item">
            {/* Visual preview */}
            <div 
              className="card-visual-header" 
              onClick={() => {
                sound.playClick();
                onOpenExerciseDemo(exercise);
              }}
            >
              <AnimatedExerciseVisual exerciseId={exercise.id} isPlaying={true} showControls={false} />
              <div className="visual-hover-hint">
                <Eye size={18} />
                <span>Rehberi Aç</span>
              </div>
            </div>

            {/* Content */}
            <div className="card-info-content">
              <div className="card-badge-row">
                <span className="badge-pill-green">{exercise.badge || 'Temel'}</span>
                <span className="badge-pill-slate">{exercise.difficulty}</span>
              </div>

              <h4 className="card-ex-name">{exercise.name}</h4>
              <p className="card-ex-muscle">🎯 {exercise.targetMuscle}</p>
              
              <div className="card-rep-info">
                <span>Standart: <strong>{exercise.defaultReps}</strong></span>
                <span>•</span>
                <span>~{exercise.calories} kcal/set</span>
              </div>

              <button 
                type="button" 
                className="btn-demo-action"
                onClick={() => {
                  sound.playClick();
                  onOpenExerciseDemo(exercise);
                }}
              >
                <span>Nasıl Yapılır? İzle</span>
                <Play size={14} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}

        {filteredExercises.length === 0 && (
          <div className="empty-search-box">
            <span>🔍</span>
            <h4>Egzersiz Bulunamadı</h4>
            <p>Arama terimini değiştirerek tekrar deneyebilirsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
};
