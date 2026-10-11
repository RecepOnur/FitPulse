// Comprehensive Exercise Database tailored for beginners with visual guides and tips

export const exercisesData = [
  {
    id: 'squat',
    name: 'Vücut Ağırlığı Squat',
    nameEn: 'Bodyweight Squat',
    animationType: 'squat',
    category: 'lower',
    targetMuscle: 'Ön Bacak (Quadriceps), Kalça (Glutes)',
    secondaryMuscles: 'Arka Bacak, Alt Sırt, Karın',
    defaultReps: '10-12 Tekrar',
    defaultTime: 35,
    defaultRest: 25,
    calories: 12,
    difficulty: 'Başlangıç Dostu',
    description: 'Bacak ve kalça kaslarını güçlendiren, günlük hayatta oturup kalkma fonksiyonunu geliştiren temel kral egzersiz.',
    steps: [
      'Ayaklarını omuz genişliğinde aç, ayak uçların hafifçe (15-20 derece) dışa baksın.',
      'Göğsünü dik tut, sırtını kamburlaştırmadan geriye doğru bir sandalyeye oturur gibi çömel.',
      'Uylukların yere neredeyse paralel olana kadar in (dizlerin ayak parmaklarınla aynı hizada kalsın).',
      'Topuklarından güç alarak kontrollü biçimde başlangıç pozisyonuna geri kalk ve kalçanı sık.'
    ],
    beginnerMistakes: [
      'Dizlerin içeri doğru çökmesi (Dizlerini hep dışarı doğru itmeye odaklan).',
      'Topukların yerden kalkması (Ağırlığını topuklara ve ayak tabanının ortasına ver).',
      'Öne doğru aşırı eğilmek (Göğsünü karşıya ve dik tut).'
    ],
    breathing: 'Aşağı çömelirken burnundan derin nefes al, yukarı kalkarken ağzından ver.',
    badge: 'Temel Hareket'
  },
  {
    id: 'pushup-incline',
    name: 'Diz Üstü / Başlangıç Şınavı',
    nameEn: 'Knee / Incline Push-Up',
    animationType: 'pushup',
    category: 'upper',
    targetMuscle: 'Göğüs (Pectoralis), Ön Omuz',
    secondaryMuscles: 'Arka Kol (Triceps), Core/Karın',
    defaultReps: '8-10 Tekrar',
    defaultTime: 30,
    defaultRest: 25,
    calories: 10,
    difficulty: 'Sıfırdan Başlayan',
    description: 'Üst vücut itme kuvveti inşa etmek için ideal güvenli şınav formu. Bilek ve omuzları zorlamadan göğüs kaslarını aktive eder.',
    steps: [
      'Yere dizlerinin üzerinde yerleş, ellerini omuz genişliğinden biraz daha geniş olacak şekilde yere koy.',
      'Başından dizlerine kadar vücudunun düz bir çizgi halinde olduğundan emin ol, belini çukurlaştırma.',
      'Dirseklerini gövdenle yaklaşık 45 derecelik bir ok ucu açısı oluşturacak şekilde bükerek göğsünü yere yaklaştır.',
      'Göğsün yere 2-3 cm yaklaşınca avuç içlerinle yeri iterek başlangıç pozisyonuna dön.'
    ],
    beginnerMistakes: [
      'Dirsekleri 90 derece yana açıp omuzları sıkıştırmak (Dirsekler gövdeye 45 derece olmalı).',
      'Karnı salıp belin aşağıya düşmesi (Karın ve kalçayı sıkı tut).',
      'Boynu öne doğru uzatarak kafayla dokunmaya çalışmak.'
    ],
    breathing: 'Aşağı inerken nefes al, yukarı itiş yaparken nefesini dışarı ver.',
    badge: 'Üst Vücut Gücü'
  },
  {
    id: 'plank',
    name: 'Statik Karın Duruşu (Plank)',
    nameEn: 'Standard / Knee Plank',
    animationType: 'plank',
    category: 'core',
    targetMuscle: 'Derin Karın (Transverse Abdominis), Core',
    secondaryMuscles: 'Omuzlar, Sırt, Kalça',
    defaultReps: '20-30 Saniye',
    defaultTime: 25,
    defaultRest: 25,
    calories: 8,
    difficulty: 'Başlangıç',
    description: 'Omurgayı koruyarak karın ve bel kaslarını çelik gibi güçlendiren, duruş bozukluklarına birebir izometrik duruş.',
    steps: [
      'Ön kollarının üzerinde yüzüstü pozisyon al, dirseklerin tam olarak omuzlarının altında olsun.',
      'Ayak parmak uçlarına veya yeni başlıyorsan dizlerine basarak gövdeni yerden kaldır.',
      'Baş, boyun, sırt ve kalçanın aynı hizada dümdüz bir tahta gibi olmasını sağla.',
      'Karnını içeriye çekip sıkarak belirtilen süre boyunca pozisyonu bozmadan bekle.'
    ],
    beginnerMistakes: [
      'Kalçayı havaya dikmek veya aşağı sarkıtmak (Omurgan tamamen düz olmalı).',
      'Nefesi tutmak (Nefesini kesinlikle tutma, ritmik ve sakin nefes alıp ver).',
      'Boynu yukarı bükmek (Gözlerin yere iki elinin arasına baksın).'
    ],
    breathing: 'Pozisyon boyunca burnundan sakin ve derin nefes alıp ağzından ver.',
    badge: 'Postür Düzeltici'
  },
  {
    id: 'glute-bridge',
    name: 'Köprü Hareketi (Glute Bridge)',
    nameEn: 'Glute Bridge',
    animationType: 'glutebridge',
    category: 'lower',
    targetMuscle: 'Kalça Kasları (Gluteus Maximus)',
    secondaryMuscles: 'Arka Bacak (Hamstrings), Bel Dengeleyiciler',
    defaultReps: '12-15 Tekrar',
    defaultTime: 35,
    defaultRest: 20,
    calories: 9,
    difficulty: 'Çok Kolay & Güvenli',
    description: 'Masa başında çok oturanlar için uykudaki kalça kaslarını uyandıran ve bel ağrılarını önleyen en dost hareket.',
    steps: [
      'Sırtüstü yere uzan, dizlerini bük ve ayak tabanlarını kalça genişliğinde yere bas.',
      'Kollarını vücudunun yanına uzat, avuç içlerin yere baksın.',
      'Topuklarından yeri iterek kalçanı yukarı kaldır; dizlerin, kalçan ve omuzların düz bir hat oluştursun.',
      'En tepe noktada kalçanı 1 saniye kuvvetlice sık ve sonra yavaşça yere indir.'
    ],
    beginnerMistakes: [
      'Beli aşırı büküp karnı yukarı fırlatmak (Hareketi belden değil kalçadan yap).',
      'Ayakları kalçadan çok uzağa koymak.',
      'Hareketi aceleyle yapmak.'
    ],
    breathing: 'Kalçanı yukarı kaldırırken nefes ver, yere indirirken nefes al.',
    badge: 'Bel Dostu'
  },
  {
    id: 'lunges',
    name: 'Statik Adımlama (Lunge)',
    nameEn: 'Stationary Lunge',
    animationType: 'lunges',
    category: 'lower',
    targetMuscle: 'Ön Bacak, Kalça',
    secondaryMuscles: 'Kalf, Denge Kasları',
    defaultReps: 'Her bacak için 8 Tekrar',
    defaultTime: 35,
    defaultRest: 25,
    calories: 11,
    difficulty: 'Başlangıç',
    description: 'Tek bacak kuvvetini, koordinasyonu ve kalça dengesini geliştiren etkili bir alt vücut egzersizi.',
    steps: [
      'Ayakta dik dur, bir bacağınla öne doğru geniş bir adım at.',
      'Gövdeni dik tutarak her iki dizin de 90 derecelik açı yapana kadar alçal.',
      'Arka dizin yere hafifçe yaklaşsın ancak çarpmamalı.',
      'Öndeki topuğundan güç alarak kendini yukarı doğru it.'
    ],
    beginnerMistakes: [
      'Öndeki dizin ayak parmağını çok aşırı geçmesi.',
      'Dengenin bozulması (Ayaklarını tek çizgi üzerinde değil ray hattı gibi tut).',
      'Gövdeyi öne doğru eğmek.'
    ],
    breathing: 'Aşağı alçalırken nefes al, yukarı kalkarken nefes ver.',
    badge: 'Denge & Şekillendirme'
  },
  {
    id: 'jumping-jacks',
    name: 'Hafif Zıplama & Yıldız Hareketi',
    nameEn: 'Jumping Jacks',
    animationType: 'jumpingjacks',
    category: 'cardio',
    targetMuscle: 'Tüm Vücut / Kardiyovasküler Sistem',
    secondaryMuscles: 'Omuzlar, Kalf, Karın',
    defaultReps: '25-30 Saniye',
    defaultTime: 30,
    defaultRest: 30,
    calories: 14,
    difficulty: 'Başlangıç Dostu',
    description: 'Kalp atış hızını güvenle artıran, yağ yakımını tetikleyen ve vücuttaki oksijen akışını hızlandıran dinamik hareket.',
    steps: [
      'Ayaklar bitişik ve kollar yanda olacak şekilde dik dur.',
      'Hafifçe zıplayarak ayaklarını omuz genişliğinde açarken aynı anda kollarını başının üzerine kaldır.',
      'Tekrar hafif bir sıçramayla başlangıç pozisyonuna dön.',
      'Eklemleri korumak için parmak ucuna yumuşak iniş yap, dizlerini kilitleme.'
    ],
    beginnerMistakes: [
      'Topukların üzerine sertçe düşmek (Daima yumuşakça parmak ucuna inin).',
      'Nefes ritmini kaybetmek.',
      'Dizleri tamamen kilitli tutmak.'
    ],
    breathing: 'Her sıçrayışta düzenli ve ritmik nefes alışverişi sağla.',
    badge: 'Kardiyo & Yağ Yakımı'
  },
  {
    id: 'bird-dog',
    name: 'Kuş-Köpek Duruşu (Bird-Dog)',
    nameEn: 'Bird-Dog',
    animationType: 'birddog',
    category: 'core',
    targetMuscle: 'Alt Sırt (Erector Spinae), Core',
    secondaryMuscles: 'Kalça, Omuz',
    defaultReps: 'Her taraf için 8 Tekrar',
    defaultTime: 35,
    defaultRest: 20,
    calories: 7,
    difficulty: 'Çok Güvenli / Terapötik',
    description: 'Fizik tedavi uzmanlarının önerdiği, omurga sağlığını ve çapraz vücut koordinasyonunu mükemmelleştiren egzersiz.',
    steps: [
      'Dört ayak üzerinde (eller ve dizler yerde) masa pozisyonuna geç.',
      'Aynı anda sağ kolunu öne doğru ve sol bacağını arkaya doğru düz uzat.',
      'Gövdenin ve pelvisin yana dönmemesine dikkat et, 1 saniye bekle.',
      'Yavaşça geri gel ve ardından diğer çapraz taraf (sol kol, sağ bacak) ile tekrar et.'
    ],
    beginnerMistakes: [
      'Beli aşırı çukurlaştırmak.',
      'Kol ve bacağı gereğinden fazla yukarı kaldırmak (Yere paralel olmaları yeterlidir).',
      'Dönüşlerde acele etmek.'
    ],
    breathing: 'Kol ve bacağı uzatırken nefes ver, başlangıca dönerken nefes al.',
    badge: 'Omurga Sağlığı'
  },
  {
    id: 'high-knees',
    name: 'Yerinde Diz Çekme (Marching / High Knees)',
    nameEn: 'High Knees / March in Place',
    animationType: 'highknees',
    category: 'cardio',
    targetMuscle: 'Kalça Fleksörleri, Karın, Kardiyo',
    secondaryMuscles: 'Ön Bacak, Kalf',
    defaultReps: '30 Saniye',
    defaultTime: 30,
    defaultRest: 25,
    calories: 12,
    difficulty: 'Başlangıç',
    description: 'Eklemlere yük bindirmeden bacakları ve karın bölgesini çalıştıran, kalp ritmini hızlandıran tempolu yürüyüş/diz çekiş.',
    steps: [
      'Ayakta dik dur, kollarını 90 derece bükerek koşu pozisyonuna getir.',
      'Sırayla dizlerini kalça hizasına doğru yukarı çek.',
      'Yeni başlayanlar için zıplamadan tempolu adım (Marching) şeklinde yapılabilir.',
      'Karnını daima sıkı tut ve dik dur.'
    ],
    beginnerMistakes: [
      'Gövdeyi geriye doğru yaslamak.',
      'Dizleri çok az kaldırmak.',
      'Omuzları kasmak.'
    ],
    breathing: 'Her iki adımda bir düzenli nefes alıp ver.',
    badge: 'Enerji Artırıcı'
  },
  {
    id: 'mountain-climbers',
    name: 'Dağ Tırmanışı (Mountain Climber)',
    nameEn: 'Mountain Climbers',
    animationType: 'mountainclimber',
    category: 'cardio',
    targetMuscle: 'Karın (Abs), Kalça Fleksörleri',
    secondaryMuscles: 'Omuzlar, Göğüs, Kardiyo',
    defaultReps: '20-30 Saniye',
    defaultTime: 30,
    defaultRest: 25,
    calories: 14,
    difficulty: 'Orta / İlerleme Hareketi',
    description: '3. ve 4. haftalarda açılan, hem karın kaslarını yakan hem de kalp ritmini zirveye taşıyan dinamik güç hareketi.',
    steps: [
      'Yüksek şınav (plank) pozisyonuna geç, eller omuzların tam altında ve gövde düz olsun.',
      'Karın kaslarını sıkarak sağ dizini göğsüne doğru çek.',
      'Sağ ayağını geriye iterken hemen sol dizini öne doğru çekerek ritmik tempo yakala.',
      'Kalçanın havaya fırlamamasına ve sırtının düz kalmasına dikkat et.'
    ],
    beginnerMistakes: [
      'Kalçayı çok yukarı kaldırmak.',
      'Parmak uçlarıyla yere çok sert vurmak.',
      'Omuzları kulaklara doğru sıkıştırmak.'
    ],
    breathing: 'Her iki diz çekişinde bir ritmik nefes ver.',
    badge: 'İlerleme & Yağ Yakımı'
  }
];
