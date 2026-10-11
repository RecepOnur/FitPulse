// Notification management supporting both Web Push Notification API and In-App notification simulation

export const getNotificationPermission = () => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    return Notification.permission;
  }
  return 'unsupported';
};

export const requestNotificationPermission = async () => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch {
      return 'denied';
    }
  }
  return 'unsupported';
};

export const triggerSystemNotification = (title, options = {}) => {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      return new Notification(title, {
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310b981"><circle cx="12" cy="12" r="10"/></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310b981"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
        ...options,
      });
    } catch {
      // Fallback
    }
  }
  return null;
};

// Default smart weekly notification rules for beginners
export const defaultWeeklyReminders = [
  {
    id: 'mon-workout',
    day: 'Pazartesi',
    dayIndex: 1,
    time: '09:00',
    title: 'Haftaya Güçlü Başla! 🚀',
    body: 'Bugün 15 dakikalık Full-Body Başlangıç seansın var. Doğru formda ve acele etmeden yapalım!',
    category: 'workout',
    active: true
  },
  {
    id: 'tue-recovery',
    day: 'Salı',
    dayIndex: 2,
    time: '11:30',
    title: 'Toparlanma & Su Hatırlatması 💧',
    body: 'Dünkü hareketlerden sonra kaslarının onarılması için bol su içmeyi ve kısa bir yürüyüş yapmayı unutma.',
    category: 'recovery',
    active: true
  },
  {
    id: 'wed-workout',
    day: 'Çarşamba',
    dayIndex: 3,
    time: '18:30',
    title: 'Alt Vücut & Core Zamanı 🔥',
    body: 'Bacak ve karın odaklı hafif başlangıç antrenmanın hazır. Sadece 4 egzersiz, kendini zinde hissettirecek!',
    category: 'workout',
    active: true
  },
  {
    id: 'thu-mobility',
    day: 'Perşembe',
    dayIndex: 4,
    time: '14:00',
    title: 'Duruş & Esneme Molası 🧘',
    body: 'Masa başında mısın? Omuzlarını geriye al, derin bir nefes al ve 3 dakika vücudunu esnet.',
    category: 'health',
    active: true
  },
  {
    id: 'fri-workout',
    day: 'Cuma',
    dayIndex: 5,
    time: '17:45',
    title: 'Hafta Sonu Öncesi Ter Atma Seansı ⚡',
    body: 'Haftalık programının 3. antrenmanı! Enerjini yükseltip haftayı zafere dönüştürmek için hazır mısın?',
    category: 'workout',
    active: true
  },
  {
    id: 'sat-active',
    day: 'Cumartesi',
    dayIndex: 6,
    time: '10:30',
    title: 'Aktif Hafta Sonu 🌿',
    body: 'Açık havada 30 dakika tempolu yürüyüş veya hafif tempolu hareketlerle vücudunu canlandır.',
    category: 'lifestyle',
    active: true
  },
  {
    id: 'sun-summary',
    day: 'Pazar',
    dayIndex: 0,
    time: '20:00',
    title: 'Haftalık Başarı Özeti & Tebrikler 🏆',
    body: 'Harika bir başlangıç haftası geride kaldı! Gelecek haftanın antrenman planı hazırlandı, dinlen ve hazır ol.',
    category: 'summary',
    active: true
  }
];
