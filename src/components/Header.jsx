import React from 'react';
import { Flame, Bell, Smartphone, Monitor, Droplets, QrCode } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const Header = ({ 
  userProfile, 
  streakCount = 1, 
  waterGlasses = 4, 
  onAddWater, 
  onOpenNotifications,
  isPhoneFrame,
  onToggleFrame,
  onOpenPhoneConnect
}) => {
  return (
    <header className="app-top-header">
      <div className="header-brand">
        <div className="brand-logo-mark">
          <svg viewBox="0 0 24 24" className="brand-bolt" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div className="brand-text">
          <h1>FitPulse</h1>
          <span className="brand-tag">BAŞLANGIÇ ASİSTANI</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Streak counter */}
        <div className="streak-pill" title="Haftalık Devamlılık Serisi">
          <Flame size={16} className="text-orange" />
          <span>{streakCount} Gün</span>
        </div>

        {/* Quick Water Button */}
        <button 
          type="button" 
          className="water-quick-pill" 
          onClick={() => {
            sound.playClick();
            onAddWater();
          }}
          title="Bir bardak su ekle (250ml)"
        >
          <Droplets size={16} className="text-cyan" />
          <span>{waterGlasses * 250} ml</span>
        </button>

        {/* QR Code / Phone Connect button */}
        <button
          type="button"
          className="qr-connect-btn"
          onClick={() => {
            sound.playClick();
            onOpenPhoneConnect();
          }}
          title="Telefonda Aç (QR Kod & Wi-Fi)"
        >
          <QrCode size={17} />
        </button>

        {/* Frame switch (Mobile mockup vs Full screen) */}
        <button
          type="button"
          className="frame-toggle-btn"
          onClick={() => {
            sound.playClick();
            onToggleFrame();
          }}
          title={isPhoneFrame ? 'Geniş Ekran Moduna Geç' : 'Telefon Simülatörüne Geç'}
        >
          {isPhoneFrame ? <Monitor size={17} /> : <Smartphone size={17} />}
        </button>

        {/* Notification Bell */}
        <button 
          type="button" 
          className="bell-btn"
          onClick={() => {
            sound.playClick();
            onOpenNotifications();
          }}
          title="Bildirimler"
        >
          <Bell size={18} />
          <span className="bell-pulse-dot"></span>
        </button>
      </div>
    </header>
  );
};
