import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const MobileFrame = ({ children, isPhoneFrame = true }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!isPhoneFrame) {
    return <div className="fullscreen-container">{children}</div>;
  }

  return (
    <div className="phone-mockup-wrapper">
      <div className="phone-device-shell">
        {/* Dynamic Island / Status Bar */}
        <div className="phone-status-bar">
          <span className="phone-status-time">{currentTime}</span>
          <div className="phone-dynamic-island">
            <span className="island-camera"></span>
          </div>
          <div className="phone-status-icons">
            <Signal size={13} strokeWidth={2.5} />
            <Wifi size={13} strokeWidth={2.5} />
            <Battery size={15} strokeWidth={2.5} className="text-emerald" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="phone-screen-content">
          {children}
        </div>

        {/* Home Indicator bar */}
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
};
