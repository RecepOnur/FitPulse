import React, { useState } from 'react';
import { Play, Pause, Zap, CheckCircle2 } from 'lucide-react';

export const AnimatedExerciseVisual = ({ exerciseId, isPlaying = true, showControls = true }) => {
  const [internalPlaying, setInternalPlaying] = useState(isPlaying);
  const [showMuscles, setShowMuscles] = useState(true);
  const [speed, setSpeed] = useState(1); // 1 = normal, 0.5 = slow-mo

  const activePlay = showControls ? internalPlaying : isPlaying;
  const animDuration = `${2 / speed}s`;

  // Render dedicated SVG & CSS animation per exercise type
  const renderVisual = () => {
    switch (exerciseId) {
      case 'squat':
        return (
          <div className="exercise-anim-container squat-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              {/* Floor */}
              <line x1="20" y1="210" x2="220" y2="210" stroke="#334155" strokeWidth="3" strokeDasharray="6 4" />
              
              {/* Squat Avatar Rig */}
              <g className="squat-body-rig">
                {/* Head */}
                <circle cx="120" cy="55" r="14" fill="#38bdf8" />
                <path d="M120 45 Q126 43 130 48" stroke="#0f172a" strokeWidth="2" fill="none" />
                
                {/* Torso */}
                <line x1="120" y1="69" x2="114" y2="128" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                
                {/* Arms */}
                <path d="M120 80 L145 95 L160 88" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Quads / Glutes Highlight glow */}
                {showMuscles && (
                  <ellipse cx="110" cy="142" rx="14" ry="20" fill="rgba(16, 185, 129, 0.45)" className="muscle-pulse" />
                )}

                {/* Pelvis to Knees */}
                <line x1="114" y1="128" x2="140" y2="168" stroke={showMuscles ? '#10b981' : '#f1f5f9'} strokeWidth="11" strokeLinecap="round" />
                
                {/* Knees to Feet */}
                <line x1="140" y1="168" x2="135" y2="208" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
                
                {/* Shoes */}
                <ellipse cx="140" cy="210" rx="14" ry="5" fill="#f43f5e" />
              </g>

              {/* Angle Guideline & Indicator */}
              <g className="squat-guideline">
                <circle cx="140" cy="168" r="4" fill="#10b981" />
                <text x="155" y="172" fill="#10b981" fontSize="10" fontWeight="bold">90° Form</text>
              </g>
            </svg>
          </div>
        );

      case 'pushup-incline':
      case 'pushup':
        return (
          <div className="exercise-anim-container pushup-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              {/* Floor */}
              <line x1="15" y1="195" x2="225" y2="195" stroke="#334155" strokeWidth="3" />
              
              <g className="pushup-rig">
                {/* Head */}
                <circle cx="60" cy="100" r="13" fill="#38bdf8" />
                
                {/* Chest Glow */}
                {showMuscles && (
                  <ellipse cx="85" cy="115" rx="14" ry="14" fill="rgba(16, 185, 129, 0.45)" className="muscle-pulse" />
                )}

                {/* Torso & Legs line */}
                <line x1="68" y1="108" x2="195" y2="165" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                
                {/* Arm / Push */}
                <path d="M85" y1="112" x2="85" y2="195" stroke={showMuscles ? '#10b981' : '#94a3b8'} strokeWidth="9" strokeLinecap="round" className="pushup-arms" />
                
                {/* Feet / Knees on ground */}
                <circle cx="195" cy="165" r="7" fill="#f43f5e" />
                <line x1="195" y1="165" x2="195" y2="195" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
              </g>

              <text x="75" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">Sırt & Bel Düz</text>
            </svg>
          </div>
        );

      case 'plank':
        return (
          <div className="exercise-anim-container plank-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              {/* Floor */}
              <line x1="15" y1="185" x2="225" y2="185" stroke="#334155" strokeWidth="3" strokeDasharray="6 4" />
              
              <g className="plank-rig">
                {/* Head */}
                <circle cx="62" cy="120" r="13" fill="#38bdf8" />
                
                {/* Core abdominal highlight */}
                {showMuscles && (
                  <rect x="95" y="125" width="45" height="18" rx="8" fill="rgba(16, 185, 129, 0.55)" className="muscle-pulse" />
                )}

                {/* Torso & Legs perfectly aligned */}
                <line x1="68" y1="126" x2="195" y2="155" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                
                {/* Forearms on ground */}
                <line x1="82" y1="130" x2="82" y2="185" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                <line x1="82" y1="185" x2="60" y2="185" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
                
                {/* Toes on ground */}
                <circle cx="195" cy="180" r="6" fill="#f43f5e" />
              </g>

              {/* Level indicator line */}
              <line x1="50" y1="110" x2="200" y2="140" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="95" y="95" fill="#10b981" fontSize="11" fontWeight="bold">Düz Omurga Hattı</text>
            </svg>
          </div>
        );

      case 'glute-bridge':
        return (
          <div className="exercise-anim-container bridge-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              <line x1="15" y1="195" x2="225" y2="195" stroke="#334155" strokeWidth="3" />
              
              <g className="bridge-rig">
                {/* Head on floor */}
                <circle cx="50" cy="182" r="12" fill="#38bdf8" />
                <line x1="55" y1="188" x2="105" y2="188" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                
                {/* Torso lifting */}
                <line x1="60" y1="185" x2="120" y2="135" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" className="bridge-torso" />
                
                {/* Glute highlight */}
                {showMuscles && (
                  <circle cx="120" cy="135" r="16" fill="rgba(16, 185, 129, 0.55)" className="muscle-pulse" />
                )}

                {/* Thigh */}
                <line x1="120" y1="135" x2="168" y2="145" stroke={showMuscles ? '#10b981' : '#e2e8f0'} strokeWidth="11" strokeLinecap="round" className="bridge-thigh" />
                
                {/* Lower leg down to floor */}
                <line x1="168" y1="145" x2="168" y2="195" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
                <ellipse cx="172" cy="195" rx="10" ry="4" fill="#f43f5e" />
              </g>

              <text x="80" y="80" fill="#10b981" fontSize="11" fontWeight="bold">Kalçayı Sık & Yükselt</text>
            </svg>
          </div>
        );

      case 'lunges':
        return (
          <div className="exercise-anim-container lunge-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              <line x1="15" y1="210" x2="225" y2="210" stroke="#334155" strokeWidth="3" />
              
              <g className="lunge-rig">
                {/* Head & Torso */}
                <circle cx="110" cy="65" r="13" fill="#38bdf8" />
                <line x1="110" y1="78" x2="110" y2="135" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                
                {/* Front Leg (stepping forward) */}
                <line x1="110" y1="135" x2="155" y2="165" stroke={showMuscles ? '#10b981' : '#e2e8f0'} strokeWidth="11" strokeLinecap="round" />
                <line x1="155" y1="165" x2="155" y2="210" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
                <ellipse cx="158" cy="210" rx="10" ry="4" fill="#f43f5e" />

                {/* Back Leg */}
                <line x1="110" y1="135" x2="70" y2="170" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
                <line x1="70" y1="170" x2="60" y2="210" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
                <circle cx="60" cy="210" r="5" fill="#f43f5e" />

                {showMuscles && (
                  <ellipse cx="132" cy="150" rx="12" ry="16" fill="rgba(16, 185, 129, 0.45)" className="muscle-pulse" />
                )}
              </g>

              <text x="140" y="155" fill="#10b981" fontSize="10" fontWeight="bold">90° Ön Diz</text>
            </svg>
          </div>
        );

      case 'mountain-climbers':
      case 'mountainclimber':
        return (
          <div className="exercise-anim-container climber-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              <line x1="15" y1="195" x2="225" y2="195" stroke="#334155" strokeWidth="3" />
              <g className="climber-rig">
                <circle cx="65" cy="115" r="13" fill="#38bdf8" />
                <line x1="72" y1="122" x2="185" y2="150" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                {/* Arms supporting */}
                <line x1="85" y1="125" x2="85" y2="195" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
                {/* Core / Abs highlight */}
                {showMuscles && (
                  <ellipse cx="115" cy="135" rx="18" ry="14" fill="rgba(16, 185, 129, 0.55)" className="muscle-pulse" />
                )}
                {/* Driven Knee */}
                <line x1="130" y1="140" x2="105" y2="165" stroke="#10b981" strokeWidth="10" strokeLinecap="round" className="climber-knee" />
                {/* Back leg */}
                <line x1="185" y1="150" x2="195" y2="195" stroke="#64748b" strokeWidth="9" strokeLinecap="round" />
                <circle cx="195" cy="195" r="6" fill="#f43f5e" />
              </g>
              <text x="80" y="70" fill="#10b981" fontSize="11" fontWeight="bold">Dinamik Diz Çekişi (İlerleme Seviyesi)</text>
            </svg>
          </div>
        );

      case 'bird-dog':
      case 'birddog':
        return (
          <div className="exercise-anim-container birddog-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              <line x1="15" y1="195" x2="225" y2="195" stroke="#334155" strokeWidth="3" />
              <g className="birddog-rig">
                <circle cx="85" cy="115" r="12" fill="#38bdf8" />
                <line x1="90" y1="125" x2="155" y2="125" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                {/* Left arm down */}
                <line x1="100" y1="125" x2="100" y2="195" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                {/* Right knee down */}
                <line x1="155" y1="125" x2="155" y2="195" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                {/* Extended right arm */}
                <line x1="90" y1="125" x2="45" y2="125" stroke="#10b981" strokeWidth="8" strokeLinecap="round" className="bird-arm" />
                {/* Extended left leg */}
                <line x1="155" y1="125" x2="205" y2="125" stroke="#10b981" strokeWidth="8" strokeLinecap="round" className="bird-leg" />
                {showMuscles && (
                  <rect x="110" y="118" width="35" height="14" rx="6" fill="rgba(6, 182, 212, 0.45)" className="muscle-pulse" />
                )}
              </g>
              <text x="75" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold">Çapraz Denge & Omurga Düzlüğü</text>
            </svg>
          </div>
        );

      case 'high-knees':
      case 'highknees':
        return (
          <div className="exercise-anim-container knees-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              <line x1="15" y1="215" x2="225" y2="215" stroke="#334155" strokeWidth="3" />
              <g className="knees-rig">
                <circle cx="120" cy="55" r="13" fill="#38bdf8" />
                <line x1="120" y1="68" x2="120" y2="135" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                {/* Arms bent 90 */}
                <path d="M120 85 L95 105 L110 115" stroke="#94a3b8" strokeWidth="7" fill="none" strokeLinecap="round" />
                <path d="M120 85 L145 95 L140 115" stroke="#94a3b8" strokeWidth="7" fill="none" strokeLinecap="round" />
                {/* High Knee lifted */}
                <path d="M120 135 L95 145 L95 180" stroke="#10b981" strokeWidth="10" fill="none" strokeLinecap="round" className="highknee-leg" />
                {/* Standing Leg */}
                <line x1="120" y1="135" x2="125" y2="215" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
                <ellipse cx="128" cy="215" rx="10" ry="4" fill="#f43f5e" />
                {showMuscles && (
                  <ellipse cx="105" cy="145" rx="14" ry="10" fill="rgba(16, 185, 129, 0.55)" className="muscle-pulse" />
                )}
              </g>
              <text x="75" y="30" fill="#10b981" fontSize="11" fontWeight="bold">Diz 90° Kalça Hizasına</text>
            </svg>
          </div>
        );

      case 'jumping-jacks':
      default:
        return (
          <div className="exercise-anim-container jumping-anim" style={{ '--anim-duration': animDuration, '--play-state': activePlay ? 'running' : 'paused' }}>
            <svg viewBox="0 0 240 240" className="anim-svg">
              <line x1="15" y1="215" x2="225" y2="215" stroke="#334155" strokeWidth="3" />
              
              <g className="jumping-rig">
                {/* Head */}
                <circle cx="120" cy="55" r="14" fill="#38bdf8" />
                
                {/* Torso */}
                <line x1="120" y1="69" x2="120" y2="135" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                
                {/* Left Arm & Right Arm */}
                <line x1="120" y1="80" x2="80" y2="50" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" className="jack-arm-l" />
                <line x1="120" y1="80" x2="160" y2="50" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" className="jack-arm-r" />

                {/* Left Leg & Right Leg */}
                <line x1="120" y1="135" x2="85" y2="205" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" className="jack-leg-l" />
                <line x1="120" y1="135" x2="155" y2="205" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" className="jack-leg-r" />

                {showMuscles && (
                  <circle cx="120" cy="100" r="18" fill="rgba(244, 63, 94, 0.35)" className="muscle-pulse" />
                )}
              </g>

              <text x="75" y="30" fill="#f43f5e" fontSize="11" fontWeight="bold">Ritmik Kardiyo Temposu</text>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="animated-visual-wrapper">
      <div className="visual-stage">
        {renderVisual()}
        
        {/* Dynamic status chip */}
        <div className="visual-badge-overlay">
          <span className="badge-live-pulse">
            <span className="pulse-dot"></span>
            {activePlay ? 'PROTOTİP VİDEO DÖNGÜSÜ' : 'DURAKLATILDI'}
          </span>
          <span className="badge-speed">{speed}x Hız</span>
        </div>
      </div>

      {showControls && (
        <div className="visual-controls-bar">
          <button 
            type="button" 
            className="ctrl-btn play-pause-btn"
            onClick={() => setInternalPlaying(!internalPlaying)}
            title={internalPlaying ? 'Duraklat' : 'Oynat'}
          >
            {internalPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{internalPlaying ? 'Durdur' : 'Oynat'}</span>
          </button>

          <button 
            type="button" 
            className={`ctrl-btn ${speed === 0.5 ? 'active' : ''}`}
            onClick={() => setSpeed(speed === 1 ? 0.5 : 1)}
            title="Yavaş Çekim Modu"
          >
            <span>{speed === 0.5 ? '0.5x Slow-Mo' : '1.0x Normal'}</span>
          </button>

          <button 
            type="button" 
            className={`ctrl-btn ${showMuscles ? 'active' : ''}`}
            onClick={() => setShowMuscles(!showMuscles)}
            title="Kas Vurgusunu Aç/Kapat"
          >
            <Zap size={15} />
            <span>Kas Vurgusu</span>
          </button>
        </div>
      )}
    </div>
  );
};
