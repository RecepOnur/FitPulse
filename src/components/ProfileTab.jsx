import React from 'react';
import { User, Edit3, Activity, Heart, Flame, Droplets, RefreshCw, Trophy, ShieldAlert, Sparkles, Scale } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const ProfileTab = ({ 
  userProfile, 
  weeklyPlan, 
  onEditProfile, 
  stats = { completedCount: 1, totalCalories: 175 } 
}) => {
  const bmiInfo = weeklyPlan?.bmiInfo || { bmi: 22.5, category: 'İdeal & Sağlıklı', color: '#10b981' };
  const nutrition = weeklyPlan?.nutrition || {};

  return (
    <div className="tab-container profile-tab">
      {/* Profile Card Header */}
      <div className="profile-hero-card">
        <div className="profile-top-row">
          <div className="profile-avatar">
            <span>{userProfile?.name?.charAt(0)?.toUpperCase() || 'S'}</span>
          </div>

          <div className="profile-main-meta">
            <h3>{userProfile?.name || 'Sporcu'}</h3>
            <span className="profile-sub">
              {userProfile?.age} Yaş • {userProfile?.gender === 'female' ? 'Kadın' : 'Erkek'}
            </span>
          </div>

          <button 
            type="button" 
            className="btn-edit-profile"
            onClick={() => {
              sound.playClick();
              onEditProfile();
            }}
            title="Bilgileri Düzenle"
          >
            <Edit3 size={16} />
            <span>Düzenle</span>
          </button>
        </div>

        {/* 3 Metric Pills */}
        <div className="metrics-triad-grid">
          <div className="metric-triad-item">
            <span className="triad-val">{userProfile?.weight} <small>kg</small></span>
            <span className="triad-lbl">Kilo</span>
          </div>
          <div className="triad-divider"></div>
          <div className="metric-triad-item">
            <span className="triad-val">{userProfile?.height} <small>cm</small></span>
            <span className="triad-lbl">Boy</span>
          </div>
          <div className="triad-divider"></div>
          <div className="metric-triad-item">
            <span className="triad-val text-emerald">{userProfile?.workoutDaysPerWeek} <small>gün</small></span>
            <span className="triad-lbl">Haftalık Hedef</span>
          </div>
        </div>
      </div>

      {/* Interactive BMI Meter Card */}
      <div className="bmi-meter-card">
        <div className="bmi-card-top">
          <div className="bmi-badge-icon">
            <Scale size={18} className="text-emerald" />
            <span>VÜCUT KİTLE İNDEKSİ (VKİ)</span>
          </div>
          <span className="bmi-category-badge" style={{ backgroundColor: `${bmiInfo.color}22`, color: bmiInfo.color }}>
            {bmiInfo.category}
          </span>
        </div>

        <div className="bmi-number-display">
          <span className="bmi-big-num" style={{ color: bmiInfo.color }}>
            {bmiInfo.bmi}
          </span>
          <span className="bmi-unit">kg/m²</span>
        </div>

        {/* BMI Spectrum Bar */}
        <div className="bmi-spectrum-bar">
          <div className="spectrum-segment thin" title="Düşük Kilo (< 18.5)"></div>
          <div className="spectrum-segment normal" title="Normal (18.5 - 24.9)"></div>
          <div className="spectrum-segment over" title="Fazla Kilo (25 - 29.9)"></div>
          <div className="spectrum-segment obese" title="Yüksek (>= 30)"></div>
          
          {/* Indicator pin */}
          <div 
            className="spectrum-pin" 
            style={{ 
              left: `${Math.min(95, Math.max(5, ((bmiInfo.bmi - 15) / (35 - 15)) * 100))}%` 
            }}
          ></div>
        </div>

        <div className="spectrum-labels">
          <span>Zayıf</span>
          <span>İdeal</span>
          <span>Fazla Kilo</span>
          <span>Yüksek</span>
        </div>

        <div className="bmi-advice-box">
          <p className="advice-summary">{bmiInfo.summary}</p>
          <p className="advice-rec">💡 <strong>Tavsiye:</strong> {bmiInfo.recommendation}</p>
        </div>
      </div>

      {/* Daily Metabolic & Nutrition Targets */}
      <div className="nutrition-target-card">
        <div className="nutri-card-head">
          <Activity size={18} className="text-emerald" />
          <h4>Günlük Enerji & Kalori İhtiyacı</h4>
        </div>
        <p className="nutri-sub">Mifflin-St Jeor formülüyle boy, kilo ve yaşına göre hesaplanan değerler:</p>

        <div className="nutri-stats-grid">
          <div className="nutri-pill">
            <span className="nutri-lbl">Bazal Metabolizma (BMR)</span>
            <span className="nutri-val">{nutrition.bmr || 1650} kcal</span>
            <span className="nutri-hint">Hareketsizken harcanan</span>
          </div>

          <div className="nutri-pill">
            <span className="nutri-lbl">Günlük Harcama (TDEE)</span>
            <span className="nutri-val text-amber">{nutrition.tdee || 2200} kcal</span>
            <span className="nutri-hint">Mevcut kilonu koruma</span>
          </div>

          <div className="nutri-pill target-pill">
            <span className="nutri-lbl">Hedef Kalori Alımı</span>
            <span className="nutri-val text-emerald">{nutrition.targetCalories || 1850} kcal</span>
            <span className="nutri-hint">Seçilen hedefine göre</span>
          </div>

          <div className="nutri-pill">
            <span className="nutri-lbl">Tavsiye Su İhtiyacı</span>
            <span className="nutri-val text-cyan">{nutrition.dailyWaterLiters || 2.6} L</span>
            <span className="nutri-hint">Kas hidrasyonu için</span>
          </div>
        </div>
      </div>

      {/* Overall Progress Stats */}
      <div className="overall-stats-card">
        <h4>Başarı & İlerleme Tablosu</h4>
        <div className="stats-row">
          <div className="stat-box">
            <Trophy size={20} className="text-amber" />
            <span className="stat-big-val">{stats.completedCount}</span>
            <span className="stat-desc">Tamamlanan Antrenman</span>
          </div>
          <div className="stat-box">
            <Flame size={20} className="text-orange" />
            <span className="stat-big-val">{stats.totalCalories}</span>
            <span className="stat-desc">Yakılan Kalori (kcal)</span>
          </div>
        </div>
      </div>

      {/* Recalculate Button */}
      <button 
        type="button" 
        className="btn-recalculate-all"
        onClick={() => {
          sound.playClick();
          onEditProfile();
        }}
      >
        <RefreshCw size={16} />
        <span>Tüm Programı Yeni Bilgilerle Sıfırdan Hesapla</span>
      </button>
    </div>
  );
};
