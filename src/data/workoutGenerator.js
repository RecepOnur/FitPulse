// Personalized workout generator engine with Progressive Overload (Weekly difficulty scaling)
import { exercisesData } from './exercisesData';

export const WEEKS_CONFIG = [
  {
    week: 1,
    title: '1. Hafta: Temel Alışma & Form',
    subtitle: 'Kas hafızası oluşturma ve eklemleri alıştırma',
    intensity: '%100',
    intensityLevel: 'Başlangıç',
    color: '#38bdf8',
    setCount: 2,
    restMultiplier: 1.0,
    calMultiplier: 1.0,
    desc: 'Hafif tempoda 2 set, uzun dinlenme aralıkları (30 sn) ile hareketlerin doğru formunu öğreniyoruz.'
  },
  {
    week: 2,
    title: '2. Hafta: Kas Adaptasyonu & Hacim',
    subtitle: 'Tekrar sayıları ve set hacmi artıyor',
    intensity: '%120',
    intensityLevel: 'Gelişme',
    color: '#10b981',
    setCount: 2, // 2-3 sets
    restMultiplier: 0.85, // 25s
    calMultiplier: 1.2,
    desc: 'Tekrarlar +2 artar, dinlenme süreleri 25 sn\'ye iner. Kas lifleri harekete alışır ve kalori yakımı hızlanır.'
  },
  {
    week: 3,
    title: '3. Hafta: Kuvvet & Yoğunluk Artışı',
    subtitle: 'Dağ Tırmanışı açılır, dinlenme azalır',
    intensity: '%145',
    intensityLevel: 'Yoğunluk',
    color: '#f59e0b',
    setCount: 3,
    restMultiplier: 0.75, // 20s
    calMultiplier: 1.45,
    desc: 'Tüm egzersizler 3 sete çıkar. Yeni "Mountain Climber" hareketi eklenir, kardiyo ve yağ yakımı zirveye taşınır.'
  },
  {
    week: 4,
    title: '4. Hafta: Zirve Performans & Seviye Atlama',
    subtitle: 'Maksimum dayanıklılık ve 1. ay kutlaması',
    intensity: '%170',
    intensityLevel: 'Zirve Seviye',
    color: '#f43f5e',
    setCount: 3,
    restMultiplier: 0.7,
    calMultiplier: 1.65,
    desc: '3 set, 12-15 tekrar ve 35-40 sn plank! Bu haftayı tamamlayan sporcu Başlangıç Seviyesinden Orta Seviyeye terfi eder.'
  }
];

export const calculateBmi = (weight, height) => {
  if (!weight || !height || height <= 0) return { bmi: 0, category: 'Bilinmiyor', color: '#94a3b8' };
  const heightM = height / 100;
  const bmiVal = Number((weight / (heightM * heightM)).toFixed(1));
  
  if (bmiVal < 18.5) {
    return {
      bmi: bmiVal,
      category: 'Düşük Kilo',
      color: '#38bdf8',
      summary: 'Kuvvet antrenmanları ve sağlıklı kalori artışı ile kas kütlesi kazanmak senin için harika bir hedef!',
      recommendation: 'Kas inşası ve enerji için protein ve kompleks karbonhidrat alımına ağırlık ver.'
    };
  } else if (bmiVal < 25.0) {
    return {
      bmi: bmiVal,
      category: 'İdeal & Sağlıklı',
      color: '#10b981',
      summary: 'Tebrikler! Vücut kitle indeksin ideal aralıkta. Şimdi kas tonusu ve dayanıklılık inşa etme zamanı.',
      recommendation: 'Dengeli beslenme ve düzenli haftalık rutin ile kondisyonunu zirveye taşı.'
    };
  } else if (bmiVal < 30.0) {
    return {
      bmi: bmiVal,
      category: 'Fazla Kilo (Hafif)',
      color: '#f59e0b',
      summary: 'Başlangıç için harika bir andasın. Düzenli hareket ve yağ yakıcı seanslarla hızla fit bir forma ulaşabilirsin.',
      recommendation: 'Eklemleri yormadan kalori yakan ve metabolizmayı hızlandıran başlangıç rutinleri uygula.'
    };
  } else {
    return {
      bmi: bmiVal,
      category: 'Yüksek Vücut Yağı',
      color: '#ef4444',
      summary: 'Sağlıklı bir dönüşüm için ilk adımı atıyorsun! Düşük eklem baskısı olan güvenli hareketlerle başlayacağız.',
      recommendation: 'Zorlayıcı zıplamalardan kaçınıp kontrollü tempolu yürüyüş ve temel güç hareketleri yap.'
    };
  }
};

export const calculateNutritionNeeds = (weight, height, age, gender = 'male', goal = 'lose_weight') => {
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = gender === 'female' ? bmr - 161 : bmr + 5;
  
  const tdee = Math.round(bmr * 1.35);
  
  let targetCalories = tdee;
  if (goal === 'lose_weight') {
    targetCalories = Math.max(1400, tdee - 350);
  } else if (goal === 'build_muscle') {
    targetCalories = tdee + 250;
  }
  
  const dailyWaterLiters = (weight * 0.035).toFixed(1);

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    dailyWaterLiters
  };
};

export const generateWeeklyPlan = (profile, weekNumber = 1) => {
  const { weight = 70, height = 175, age = 28, goal = 'lose_weight', workoutDaysPerWeek = 3 } = profile;
  const bmiInfo = calculateBmi(weight, height);
  const isHighBmi = bmiInfo.bmi >= 28;

  // Selected week configuration
  const weekIndex = Math.max(0, Math.min(3, weekNumber - 1));
  const weekConfig = WEEKS_CONFIG[weekIndex];

  // Base exercises
  const exSquat = exercisesData.find(e => e.id === 'squat');
  const exPushup = exercisesData.find(e => e.id === 'pushup-incline');
  const exPlank = exercisesData.find(e => e.id === 'plank');
  const exGlute = exercisesData.find(e => e.id === 'glute-bridge');
  const exLunges = exercisesData.find(e => e.id === 'lunges');
  const exJumping = exercisesData.find(e => e.id === 'jumping-jacks');
  const exBirdDog = exercisesData.find(e => e.id === 'bird-dog');
  const exHighKnees = exercisesData.find(e => e.id === 'high-knees');
  const exClimbers = exercisesData.find(e => e.id === 'mountain-climbers') || exHighKnees;

  // Adaptive sets, reps, and times according to week progression
  let baseSets = weekConfig.setCount;
  let restTime = Math.round(30 * weekConfig.restMultiplier);

  // Progressive parameters
  let squatReps = weekNumber === 1 ? '10 Tekrar' : weekNumber === 2 ? '12 Tekrar' : weekNumber === 3 ? '14 Tekrar' : '15-18 Tekrar';
  let pushupReps = weekNumber === 1 ? '8 Tekrar' : weekNumber === 2 ? '10 Tekrar' : weekNumber === 3 ? '12 Tekrar' : '12-15 Tekrar';
  let plankSec = weekNumber === 1 ? 20 : weekNumber === 2 ? 25 : weekNumber === 3 ? 35 : 45;
  let cardioSec = weekNumber === 1 ? 25 : weekNumber === 2 ? 30 : weekNumber === 3 ? 35 : 40;

  // Cardio selection: If week >= 3 and BMI is not prohibitive, introduce Mountain Climber!
  const cardioSafe = isHighBmi ? exHighKnees : (weekNumber >= 3 ? exClimbers : exJumping);

  // Day 1: Full-Body Progression
  const day1Exercises = [
    { ...exSquat, sets: baseSets, repsOrDuration: squatReps, restSeconds: restTime },
    { ...exPushup, sets: baseSets, repsOrDuration: pushupReps, restSeconds: restTime },
    { ...exGlute, sets: baseSets, repsOrDuration: `${12 + (weekNumber - 1) * 2} Tekrar`, restSeconds: Math.max(18, restTime - 5) },
    { ...exPlank, sets: baseSets, repsOrDuration: `${plankSec} Saniye`, defaultTime: plankSec, restSeconds: restTime + 5 }
  ];

  // Day 3: Lower Body & Core Progression
  const day3Exercises = [
    { ...exGlute, sets: baseSets, repsOrDuration: `${12 + (weekNumber - 1) * 2} Tekrar`, restSeconds: restTime },
    { ...exLunges, sets: baseSets, repsOrDuration: `${6 + weekNumber * 2} Tekrar (Her Bacak)`, restSeconds: restTime },
    { ...exPlank, sets: baseSets, repsOrDuration: `${plankSec} Saniye`, defaultTime: plankSec, restSeconds: restTime },
    { ...(weekNumber >= 3 ? exClimbers : exBirdDog), sets: baseSets, repsOrDuration: weekNumber >= 3 ? `${cardioSec} Saniye` : `${8 + weekNumber} Tekrar`, defaultTime: cardioSec, restSeconds: restTime }
  ];

  // Day 5: Upper Body & Cardio Burn Progression
  const day5Exercises = [
    { ...exPushup, sets: baseSets, repsOrDuration: pushupReps, restSeconds: restTime },
    { ...cardioSafe, sets: baseSets, repsOrDuration: `${cardioSec} Saniye`, defaultTime: cardioSec, restSeconds: restTime },
    { ...exBirdDog, sets: baseSets, repsOrDuration: `${8 + weekNumber} Tekrar`, restSeconds: Math.max(18, restTime - 5) },
    { ...exSquat, sets: baseSets, repsOrDuration: squatReps, restSeconds: restTime }
  ];

  // Optional 4th day for active mobility / cardio
  const day7BonusExercises = [
    { ...exBirdDog, sets: 2, repsOrDuration: '10 Tekrar', restSeconds: 20 },
    { ...exGlute, sets: 2, repsOrDuration: '12 Tekrar', restSeconds: 20 },
    { ...cardioSafe, sets: 2, repsOrDuration: `${cardioSec} Saniye`, defaultTime: cardioSec, restSeconds: 25 }
  ];

  // Base minutes and calories scaled by week multiplier
  const day1Mins = Math.round(15 + (weekNumber - 1) * 3);
  const day1Cals = Math.round(105 * weekConfig.calMultiplier);

  const day3Mins = Math.round(16 + (weekNumber - 1) * 3);
  const day3Cals = Math.round(115 * weekConfig.calMultiplier);

  const day5Mins = Math.round(17 + (weekNumber - 1) * 3);
  const day5Cals = Math.round(125 * weekConfig.calMultiplier);

  const days = [
    {
      dayIndex: 1,
      dayName: 'Pazartesi',
      isWorkout: true,
      title: `Full-Body ${weekNumber}. Hafta Seansı`,
      subtitle: weekNumber === 1 ? 'Tüm vücut kaslarını uyandıran temel başlangıç' : `${weekConfig.title} kapsamında artırılmış hacim`,
      estimatedMinutes: day1Mins,
      estimatedCalories: day1Cals,
      focus: 'Tüm Vücut / Güç',
      exercises: day1Exercises,
      healthTip: weekNumber === 1 
        ? 'Egzersizden 1-2 saat önce hafif bir muz veya bir avuç ceviz harika enerji verir.'
        : `${weekNumber}. haftadasın! Set aralarında su yudumlayarak temponu koru.`
    },
    {
      dayIndex: 2,
      dayName: 'Salı',
      isWorkout: false,
      title: 'Aktif Toparlanma & Yürüyüş',
      subtitle: 'Kasların dinlenme ve yenilenme günü',
      estimatedMinutes: 20,
      estimatedCalories: 75,
      focus: 'Dinlenme & Hidrasyon',
      exercises: [],
      healthTip: 'Kaslar antrenmanda değil, dinlenirken gelişir. En az 7-8 saat kaliteli uyku hedefle.'
    },
    {
      dayIndex: 3,
      dayName: 'Çarşamba',
      isWorkout: true,
      title: `Alt Vücut & Core (Hafta ${weekNumber})`,
      subtitle: 'Bacak, kalça ve derin karın kaslarına odaklanıyoruz',
      estimatedMinutes: day3Mins,
      estimatedCalories: day3Cals,
      focus: 'Bacak & Karın',
      exercises: day3Exercises,
      healthTip: 'Squat ve Lunge yaparken göğsünü dik tutmayı ve dizlerini dışa doğru yönlendirmeyi unutma.'
    },
    {
      dayIndex: 4,
      dayName: 'Perşembe',
      isWorkout: false,
      title: 'Duruş & Esneklik Günü',
      subtitle: 'Omurganı rahatlatacak hafif esnemeler ve su takibi',
      estimatedMinutes: 15,
      estimatedCalories: 50,
      focus: 'Mobilite & Nefes',
      exercises: [],
      healthTip: 'Bugün su şişeni masandan eksik etme. Vücudunun toparlanması için su hayati önemdedir.'
    },
    {
      dayIndex: 5,
      dayName: 'Cuma',
      isWorkout: true,
      title: `Üst Vücut & Kardiyo Patlaması (Hafta ${weekNumber})`,
      subtitle: 'Göğüs, omuz ve kardiyo ile haftayı enerjik tamamla',
      estimatedMinutes: day5Mins,
      estimatedCalories: day5Cals,
      focus: 'Üst Gövde & Dayanıklılık',
      exercises: day5Exercises,
      healthTip: 'Şınavlarda zorlanırsan dizlerini yere koyabilirsin; önemli olan formu temiz tutmaktır.'
    },
    {
      dayIndex: 6,
      dayName: 'Cumartesi',
      isWorkout: workoutDaysPerWeek >= 4,
      title: workoutDaysPerWeek >= 4 ? `Bonus Seans (Hafta ${weekNumber})` : 'Hafta Sonu Dinlenmesi',
      subtitle: workoutDaysPerWeek >= 4 ? 'Esneklik ve hafif toparlanma hareketleri' : 'Ailenle ve sevdiklerinle aktif zaman geçir',
      estimatedMinutes: workoutDaysPerWeek >= 4 ? 14 : 0,
      estimatedCalories: workoutDaysPerWeek >= 4 ? 90 : 0,
      focus: workoutDaysPerWeek >= 4 ? 'Mobilite' : 'Serbest Gün',
      exercises: workoutDaysPerWeek >= 4 ? day7BonusExercises : [],
      healthTip: 'Açık havada tempolu 30 dakika yürüyüş yapmak ruh haline de ilaç gibi gelir.'
    },
    {
      dayIndex: 0,
      dayName: 'Pazar',
      isWorkout: false,
      title: 'Haftalık Değerlendirme & Seviye Atlama',
      subtitle: `${weekNumber}. haftanın sonuçlarını gözden geçir`,
      estimatedMinutes: 0,
      estimatedCalories: 0,
      focus: 'Strateji & Motivasyon',
      exercises: [],
      healthTip: `${weekNumber}. haftanın sonuna geldin! Süreklilik, ağırlıklardan ve hızdan çok daha önemlidir.`
    }
  ];

  return {
    profile,
    weekNumber,
    weekConfig,
    bmiInfo,
    nutrition: calculateNutritionNeeds(weight, height, age, profile.gender, goal),
    totalWeeklyWorkouts: days.filter(d => d.isWorkout).length,
    totalWeeklyMinutes: days.reduce((sum, d) => sum + d.estimatedMinutes, 0),
    totalWeeklyCalories: days.reduce((sum, d) => sum + d.estimatedCalories, 0),
    days
  };
};
