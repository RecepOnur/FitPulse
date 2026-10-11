import React, { useState } from 'react';
import { User, Activity, Dumbbell, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateBmi } from '../data/workoutGenerator';
import { sound } from '../utils/soundEffects';

export const OnboardingModal = ({ isOpen, currentProfile, onSave, onClose, isEdit = false }) => {
  const [name, setName] = useState(currentProfile?.name || 'Sporcu');
  const [age, setAge] = useState(currentProfile?.age || 26);
  const [height, setHeight] = useState(currentProfile?.height || 175);
  const [weight, setWeight] = useState(currentProfile?.weight || 75);
  const [gender, setGender] = useState(currentProfile?.gender || 'male');
  const [goal, setGoal] = useState(currentProfile?.goal || 'lose_weight');
  const [workoutDays, setWorkoutDays] = useState(currentProfile?.workoutDaysPerWeek || 3);
  const [experience, setExperience] = useState(currentProfile?.experience || 'beginner');

  if (!isOpen) return null;

  const bmiData = calculateBmi(weight, height);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    onSave({
      name: name.trim() || 'Sporcu',
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      gender,
      goal,
      workoutDaysPerWeek: Number(workoutDays),
      experience
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="onboarding-card">
        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-icon-badge">
            <Sparkles size={24} className="text-emerald" />
          </div>
          <h2>{isEdit ? 'Profilini Güncelle' : 'Kişisel Antrenmanını Oluştur'}</h2>
          <p className="onboarding-desc">
            Spora yeni başlayanlar için boy, kilo ve yaş bilgine göre bilimsel ve eklemleri koruyan haftalık bir plan hazırlayacağız.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          {/* Name & Gender */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label>İsmin veya Takma Adın</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Örn: Can"
                required
                className="form-input"
              />
            </div>

            <div className="form-group flex-1">
              <label>Cinsiyet</label>
              <div className="gender-toggle">
                <button
                  type="button"
                  className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                  onClick={() => setGender('male')}
                >
                  Erkek
                </button>
                <button
                  type="button"
                  className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                  onClick={() => setGender('female')}
                >
                  Kadın
                </button>
              </div>
            </div>
          </div>

          {/* Age, Height, Weight Grid */}
          <div className="form-grid-3">
            <div className="form-group">
              <label>Yaş</label>
              <div className="input-with-unit">
                <input 
                  type="number" 
                  min="14" 
                  max="85" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)}
                  required 
                  className="form-input"
                />
                <span className="unit-label">yaş</span>
              </div>
            </div>

            <div className="form-group">
              <label>Boy</label>
              <div className="input-with-unit">
                <input 
                  type="number" 
                  min="120" 
                  max="230" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
                  required 
                  className="form-input"
                />
                <span className="unit-label">cm</span>
              </div>
            </div>

            <div className="form-group">
              <label>Kilo</label>
              <div className="input-with-unit">
                <input 
                  type="number" 
                  min="35" 
                  max="200" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  required 
                  className="form-input"
                />
                <span className="unit-label">kg</span>
              </div>
            </div>
          </div>

          {/* Realtime BMI Preview Banner */}
          <div className="bmi-live-preview" style={{ borderColor: bmiData.color }}>
            <div className="bmi-left">
              <span className="bmi-tag">Vücut Kitle İndeksi (VKİ)</span>
              <div className="bmi-val" style={{ color: bmiData.color }}>
                {bmiData.bmi} <span className="bmi-status">({bmiData.category})</span>
              </div>
            </div>
            <p className="bmi-summary-text">{bmiData.summary}</p>
          </div>

          {/* Goals Selector */}
          <div className="form-group">
            <label>Fitness Hedefin Nedir?</label>
            <div className="goal-options-grid">
              <button
                type="button"
                className={`goal-card ${goal === 'lose_weight' ? 'active' : ''}`}
                onClick={() => setGoal('lose_weight')}
              >
                <div className="goal-icon">🔥</div>
                <div className="goal-details">
                  <h4>Kilo Verme & Yağ Yakımı</h4>
                  <p>Hafif kardiyo ve kalori yakan tam vücut egzersizleri</p>
                </div>
              </button>

              <button
                type="button"
                className={`goal-card ${goal === 'build_muscle' ? 'active' : ''}`}
                onClick={() => setGoal('build_muscle')}
              >
                <div className="goal-icon">💪</div>
                <div className="goal-details">
                  <h4>Kas Tonusu & Güçlenme</h4>
                  <p>Vücut ağırlığı ile temel kas kuvveti geliştirme</p>
                </div>
              </button>

              <button
                type="button"
                className={`goal-card ${goal === 'healthy_life' ? 'active' : ''}`}
                onClick={() => setGoal('healthy_life')}
              >
                <div className="goal-icon">🌿</div>
                <div className="goal-details">
                  <h4>Sağlıklı Yaşam & Kondisyon</h4>
                  <p>Enerjik hissetme, derin nefes ve aktif toparlanma</p>
                </div>
              </button>
            </div>
          </div>

          {/* Days Per Week Selector */}
          <div className="form-group">
            <label>Haftada Kaç Gün Antrenman Yapmak İstersin?</label>
            <div className="days-picker">
              {[2, 3, 4].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`day-choice-btn ${workoutDays === d ? 'active' : ''}`}
                  onClick={() => setWorkoutDays(d)}
                >
                  <span className="day-number">{d} Gün</span>
                  <span className="day-sub">{d === 3 ? 'İdeal Başlangıç (Önerilen)' : d === 2 ? 'Çok Hafif Giriş' : 'Dinamik Rutin'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Beginner Promise Note */}
          <div className="beginner-guarantee">
            <ShieldCheck size={20} className="text-emerald shrink-0" />
            <p>
              <strong>Sıfır Baskı Garantisi:</strong> Program başlangıç seviyesine uygun, 15-18 dakikalık eklem dostu hareketlerden oluşur. Ekipmana gerek yoktur.
            </p>
          </div>

          {/* Submit */}
          <div className="modal-actions">
            {isEdit && (
              <button type="button" className="btn-secondary" onClick={onClose}>
                Vazgeç
              </button>
            )}
            <button type="submit" className="btn-primary-glow flex-1">
              <span>{isEdit ? 'Değişiklikleri Kaydet' : 'Kişisel Programımı Oluştur'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
