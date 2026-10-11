import React from 'react';
import { Home, CalendarDays, Dumbbell, Bell, User } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const BottomNav = ({ activeTab, onSelectTab, unreadNotificationsCount = 0 }) => {
  const tabs = [
    { id: 'today', label: 'Bugün', icon: Home },
    { id: 'plan', label: 'Haftalık Plan', icon: CalendarDays },
    { id: 'exercises', label: 'Egzersizler', icon: Dumbbell },
    { id: 'notifications', label: 'Bildirimler', icon: Bell, badge: unreadNotificationsCount },
    { id: 'profile', label: 'Profil & VKİ', icon: User }
  ];

  return (
    <nav className="bottom-nav-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => {
              sound.playClick();
              onSelectTab(tab.id);
            }}
          >
            <div className="icon-wrapper">
              <Icon size={22} />
              {tab.badge > 0 && <span className="nav-badge-dot">{tab.badge}</span>}
            </div>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
