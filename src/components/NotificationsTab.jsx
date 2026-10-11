import React, { useState } from 'react';
import { Bell, BellRing, Check, Send, Clock, Sparkles, Shield, AlertCircle, Droplets, Trophy } from 'lucide-react';
import { requestNotificationPermission, triggerSystemNotification } from '../utils/notificationManager';
import { sound } from '../utils/soundEffects';

export const NotificationsTab = ({ 
  reminders, 
  onToggleReminder, 
  onTriggerInAppToast 
}) => {
  const [permission, setPermission] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });

  const [preferredTime, setPreferredTime] = useState('18:30');

  const handleRequestPermission = async () => {
    sound.playClick();
    const result = await requestNotificationPermission();
    setPermission(result);
    if (result === 'granted') {
      sendTestNotification({
        title: 'FitPulse Bildirimleri Aktif! 🎉',
        body: 'Harika! Artık antrenman ve toparlanma günlerinde zamanında bildirim alacaksın.'
      });
    }
  };

  const sendTestNotification = (item) => {
    sound.playClick();
    sound.playStart();
    
    // 1. Send native browser notification if granted
    triggerSystemNotification(item.title, {
      body: item.body,
    });

    // 2. Also trigger In-App Toast banner so the user sees it visually regardless of OS settings
    if (onTriggerInAppToast) {
      onTriggerInAppToast({
        title: item.title,
        body: item.body,
        time: item.time || 'Şimdi'
      });
    }
  };

  return (
    <div className="tab-container notifications-tab">
      {/* Header */}
      <div className="notif-header-card">
        <div className="notif-title-row">
          <div className="notif-badge">
            <BellRing size={18} className="text-emerald" />
            <span>AKILLI BİLDİRİM ASİSTANI</span>
          </div>
          <span className="badge-tag">Haftalık Döngü</span>
        </div>
        <h3>Haftalık Antrenman & Sağlık Bildirimleri</h3>
        <p className="notif-sub-desc">
          Spora yeni başlayanların en büyük engeli alışkanlık oluşturmaktır. Doğru gün ve saatte gelen küçük hatırlatmalar devamlılığını sağlar.
        </p>

        {/* Permission Action Banner */}
        <div className="permission-status-banner">
          <div className="perm-left">
            <div className={`perm-dot ${permission === 'granted' ? 'granted' : 'pending'}`}></div>
            <div>
              <span className="perm-title">
                {permission === 'granted' ? 'Tarayıcı Bildirimleri Açık' : 'Bildirim İzni Bekleniyor'}
              </span>
              <span className="perm-hint">
                {permission === 'granted' 
                  ? 'Masaüstü ve mobil kilit ekranında bildirim alabilirsin.' 
                  : 'Cihaz bildirimlerini açarak tam deneyim yaşa.'}
              </span>
            </div>
          </div>

          <div className="perm-actions">
            {permission !== 'granted' && (
              <button 
                type="button" 
                className="btn-enable-perm"
                onClick={handleRequestPermission}
              >
                İzni Aç
              </button>
            )}
            <button 
              type="button" 
              className="btn-test-notif"
              onClick={() => sendTestNotification({
                title: 'FitPulse Canlı Hatırlatma 🚀',
                body: 'Bugün 15 dakikalık hafif bir antrenman günün var. Hazır mısın?',
                time: 'Şimdi'
              })}
            >
              <Send size={14} />
              <span>Test Bildirimi Gönder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preferred Workout Time Picker */}
      <div className="reminder-settings-card">
        <div className="settings-title-row">
          <Clock size={18} className="text-emerald" />
          <h4>Antrenman Bildirimi Tercih Saatin</h4>
        </div>
        <p className="settings-sub">Günün hangi saatinde spora vakit ayırmak sana daha uygun?</p>
        
        <div className="time-chips-grid">
          {[
            { label: 'Sabah (08:30)', time: '08:30' },
            { label: 'Öğle (12:30)', time: '12:30' },
            { label: 'Akşam (18:30)', time: '18:30' },
            { label: 'Gece (20:45)', time: '20:45' }
          ].map((item) => (
            <button
              key={item.time}
              type="button"
              className={`time-chip-btn ${preferredTime === item.time ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                setPreferredTime(item.time);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Schedule List */}
      <div className="weekly-reminders-section">
        <h4 className="section-h4">Haftalık Otomatik Bildirim Takvimi</h4>
        <p className="section-p">Her günün hedefine göre özel olarak formüle edilen akıllı bildirimler:</p>

        <div className="reminders-list">
          {reminders.map((reminder) => (
            <div 
              key={reminder.id} 
              className={`reminder-item-card ${reminder.active ? 'active' : 'disabled'}`}
            >
              <div className="reminder-top-row">
                <div className="day-badge-col">
                  <span className="rem-day">{reminder.day}</span>
                  <span className="rem-time">{reminder.time}</span>
                </div>

                <div className="rem-category-tag">
                  {reminder.category === 'workout' && '🔥 Antrenman'}
                  {reminder.category === 'recovery' && '💧 Toparlanma'}
                  {reminder.category === 'health' && '🧘 Duruş & Nefes'}
                  {reminder.category === 'lifestyle' && '🌿 Yaşam'}
                  {reminder.category === 'summary' && '🏆 Haftalık Özet'}
                </div>

                {/* Toggle on/off */}
                <button 
                  type="button" 
                  className={`toggle-switch ${reminder.active ? 'checked' : ''}`}
                  onClick={() => {
                    sound.playClick();
                    onToggleReminder(reminder.id);
                  }}
                  title={reminder.active ? 'Bildirimi Kapat' : 'Bildirimi Aç'}
                >
                  <span className="switch-thumb"></span>
                </button>
              </div>

              <div className="reminder-body-content">
                <h5 className="rem-title">{reminder.title}</h5>
                <p className="rem-body">{reminder.body}</p>
              </div>

              {/* Instant Test Button for this specific reminder */}
              <div className="reminder-bottom-bar">
                <button 
                  type="button" 
                  className="btn-send-single-test"
                  onClick={() => sendTestNotification(reminder)}
                >
                  <Send size={12} />
                  <span>Bu Bildirimi Şimdi Canlı Simüle Et</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
