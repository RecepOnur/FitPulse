import React from 'react';
import { X, Smartphone, Wifi, QrCode, Check, Copy } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const PhoneConnectModal = ({ isOpen, onClose, localIp = '192.168.1.106', port = '5173' }) => {
  const [copied, setCopied] = React.useState(false);
  if (!isOpen) return null;

  const url = `http://${localIp}:${port}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&bgcolor=0f172a&color=10b981&margin=2`;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop">
      <div className="phone-connect-card">
        <div className="connect-header">
          <div className="connect-title-wrap">
            <Smartphone size={20} className="text-emerald" />
            <h3>Telefonda Aç & Test Et</h3>
          </div>
          <button 
            type="button" 
            className="icon-circle-btn" 
            onClick={() => {
              sound.playClick();
              onClose();
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="qr-container">
          <img 
            src={qrUrl} 
            alt="FitPulse QR Kodu" 
            className="qr-image"
          />
          <span className="qr-hint">Telefonunun kamerasıyla bu QR kodu okut</span>
        </div>

        {/* Direct Link Box */}
        <div className="connect-link-box">
          <div className="link-text-block">
            <span className="link-label">Veya telefonunun tarayıcısına yaz:</span>
            <span className="link-url">{url}</span>
          </div>
          <button 
            type="button" 
            className="btn-copy-url"
            onClick={handleCopy}
            title="Adresi Kopyala"
          >
            {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>

        {/* Steps */}
        <div className="connect-steps-list">
          <div className="connect-step-row">
            <span className="c-step-num">1</span>
            <p>Telefonunuz ve bilgisayarınızın <strong>aynı Wi-Fi ağına</strong> bağlı olduğundan emin olun.</p>
          </div>
          <div className="connect-step-row">
            <span className="c-step-num">2</span>
            <p>QR kodu okutun veya Safari / Chrome adres çubuğuna adresi yazın.</p>
          </div>
          <div className="connect-step-row">
            <span className="c-step-num">3</span>
            <p>
              <strong>Tam Mobil Uygulama Deneyimi:</strong> Safari'de <em>Paylaş → Ana Ekrana Ekle</em> veya Chrome'da <em>Menü → Uygulamayı Yükle</em> diyerek adres çubuğu olmadan tam ekran kullanın!
            </p>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-primary-glow w-full py-3 mt-2"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
        >
          Anladım, Harika!
        </button>
      </div>
    </div>
  );
};
