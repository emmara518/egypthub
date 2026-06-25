export interface Experience {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  region: string;
  price: number;
  currency: string;
  duration: string;
  image: string;
  gallery: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: { day: string; title: string; description: string }[];
  host: { name: string; avatar: string; bio: string };
  amenities: { icon: string; label: string }[];
}

export interface Destination {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  heroImage: string;
  rating: number;
  experienceCount: number;
  region: string;
  highlights: string[];
  categories: { name: string; slug: string; count: number }[];
}

export const destinations: Destination[] = [
  {
    slug: 'sharm-el-sheikh',
    name: 'شرم الشيخ',
    subtitle: 'Red Sea Paradise',
    description: 'وجهة الغوص الأولى في العالم، بشواطئ خلابة وحياة بحرية مذهلة ومنتجعات عالمية.',
    image: '/images/destinations/sharm-el-sheikh.jpg',
    heroImage: '/images/destinations/sharm-el-sheikh.jpg',
    rating: 4.8,
    experienceCount: 240,
    region: 'بحر أحمر',
    highlights: ['الغوص في راس محمد', 'رحلات السفاري', 'الحياة الليلية', 'التسوق'],
    categories: [
      { name: 'الغوص', slug: 'diving', count: 85 },
      { name: 'السفاري', slug: 'safari', count: 42 },
      { name: 'مطاعم', slug: 'restaurants', count: 110 },
      { name: 'فنادق', slug: 'hotels', count: 65 },
    ],
  },
  {
    slug: 'cairo',
    name: 'القاهرة',
    subtitle: 'City of a Thousand Minarets',
    description: 'عاصمة مصر الخالدة، حيث تلتقي الحضارة الفرعونية بالحياة العصرية.',
    image: '/images/destinations/cairo.jpg',
    heroImage: '/images/destinations/cairo.jpg',
    rating: 4.5,
    experienceCount: 380,
    region: 'القاهرة الكبرى',
    highlights: ['الأهرامات', 'المتحف المصري', 'خان الخليلي', 'نهر النيل'],
    categories: [
      { name: 'تاريخ', slug: 'history', count: 95 },
      { name: 'تسوق', slug: 'shopping', count: 130 },
      { name: 'مطاعم', slug: 'restaurants', count: 200 },
      { name: 'فنادق', slug: 'hotels', count: 120 },
    ],
  },
  {
    slug: 'luxor',
    name: 'الأقصر',
    subtitle: 'Ancient Wonders',
    description: 'أعظم متحف مفتوح في العالم، موطن وادي الملوك والمعابد الفرعونية.',
    image: '/images/destinations/luxor.jpg',
    heroImage: '/images/destinations/luxor.jpg',
    rating: 4.9,
    experienceCount: 160,
    region: 'صعيد مصر',
    highlights: ['وادي الملوك', 'معبد الكرنك', 'معبد الأقصر', 'المنطاد'],
    categories: [
      { name: 'تاريخ', slug: 'history', count: 55 },
      { name: 'جولات', slug: 'tours', count: 40 },
      { name: 'فنادق', slug: 'hotels', count: 35 },
    ],
  },
  {
    slug: 'aswan',
    name: 'أسوان',
    subtitle: 'Nile Serenity',
    description: 'مدينة النيل الساحرة، بطبيعتها الخلابة ومعابدها النوبية وأجوائها الهادئة.',
    image: '/images/destinations/aswan.jpg',
    heroImage: '/images/destinations/aswan.jpg',
    rating: 4.7,
    experienceCount: 120,
    region: 'صعيد مصر',
    highlights: ['معبد أبو سمبل', 'جزيرة النباتات', 'القرية النوبية', 'المراكب الشراعية'],
    categories: [
      { name: 'تاريخ', slug: 'history', count: 30 },
      { name: 'رحلات نيلية', slug: 'cruises', count: 25 },
      { name: 'فنادق', slug: 'hotels', count: 30 },
    ],
  },
  {
    slug: 'alexandria',
    name: 'الإسكندرية',
    subtitle: 'Mediterranean Bride',
    description: 'عروس البحر المتوسط، مدينة تجمع بين التاريخ اليوناني الروماني وسحر البحر.',
    image: '/images/destinations/alexandria.jpg',
    heroImage: '/images/destinations/alexandria.jpg',
    rating: 4.6,
    experienceCount: 180,
    region: 'ساحل البحر المتوسط',
    highlights: ['مكتبة الإسكندرية', 'القلعة', 'الكورنيش', 'المأكولات البحرية'],
    categories: [
      { name: 'تاريخ', slug: 'history', count: 45 },
      { name: 'مطاعم', slug: 'restaurants', count: 90 },
      { name: 'فنادق', slug: 'hotels', count: 50 },
    ],
  },
  {
    slug: 'hurghada',
    name: 'الغردقة',
    subtitle: 'Diving Capital',
    description: 'عاصمة الغوص في مصر، بشواطئها الذهبية ومياهها الفيروزية ومنتجعاتها الفاخرة.',
    image: '/images/destinations/hurghada.jpg',
    heroImage: '/images/destinations/hurghada.jpg',
    rating: 4.8,
    experienceCount: 290,
    region: 'بحر أحمر',
    highlights: ['الغوص', 'الجولف', 'السفاري', 'الرياضات المائية'],
    categories: [
      { name: 'الغوص', slug: 'diving', count: 95 },
      { name: 'رياضات مائية', slug: 'watersports', count: 55 },
      { name: 'فنادق', slug: 'hotels', count: 80 },
    ],
  },
  {
    slug: 'siwa',
    name: 'سيوة',
    subtitle: 'Oasis Magic',
    description: 'واحة سحرية في قلب الصحراء الغربية، بطبيعتها الفريدة وثقافتها البربرية الأصيلة.',
    image: '/images/destinations/siwa.jpg',
    heroImage: '/images/destinations/siwa.jpg',
    rating: 4.7,
    experienceCount: 60,
    region: 'الصحراء الغربية',
    highlights: ['بحيرة الملح', 'قلعة شالي', 'ينابيع المياه', 'الطبيعة'],
    categories: [
      { name: 'طبيعة', slug: 'nature', count: 20 },
      { name: 'مغامرات', slug: 'adventure', count: 15 },
      { name: 'فنادق', slug: 'hotels', count: 12 },
    ],
  },
  {
    slug: 'dahab',
    name: 'دهب',
    subtitle: 'Bedouin Vibes',
    description: 'وجهة البدو ومحبي الغوص والاسترخاء، بأجوائها البوهيمية الفريدة.',
    image: '/images/destinations/dahab.jpg',
    heroImage: '/images/destinations/dahab.jpg',
    rating: 4.6,
    experienceCount: 90,
    region: 'بحر أحمر',
    highlights: ['البلوهول', 'الغوص', 'ركوب الأمواج', 'المقاهي'],
    categories: [
      { name: 'الغوص', slug: 'diving', count: 35 },
      { name: 'رياضات', slug: 'sports', count: 25 },
      { name: 'مطاعم', slug: 'restaurants', count: 40 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    slug: 'pyramids-private-tour',
    name: 'جولة الأهرامات الخاصة',
    subtitle: 'Egyptian Museum & Pyramids',
    description: 'جولة خاصة تأخذك في رحلة عبر الزمن لاستكشاف أعظم عجائب العالم القديم.',
    longDescription: 'استمتع بجولة خاصة بصحبة مرشد سياحي خبير تأخذك لاستكشاف أهرامات الجيزة وأبو الهول والمتحف المصري الكبير. تشمل الجولة النقل من الفندق بسيارة خاصة مكيفة، ومرشد سياحي متحدث بالعربية والإنجليزية، ووجبة غداء في مطعم تقليدي. ستتعرف على أسرار بناء الأهرامات وقصص الفراعنة من خلال شرحات شيقة وممتعة.',
    category: 'جولات تاريخية',
    rating: 4.9,
    reviewCount: 328,
    location: 'الجيزة، القاهرة',
    region: 'القاهرة الكبرى',
    price: 2500,
    currency: 'EGP',
    duration: '8 ساعات',
    image: '/images/destinations/cairo.jpg',
    gallery: [
      '/images/destinations/cairo.jpg',
      '/images/destinations/luxor.jpg',
      '/images/destinations/aswan.jpg',
      '/images/destinations/sharm-el-sheikh.jpg',
    ],
    highlights: [
      'مرشد سياحي خبير متحدث بالعربية',
      'سيارة خاصة مكيفة للنقل',
      'دخول جميع المواقع الأثرية',
      'وجبة غداء تقليدية',
      'التقاط صور احترافية',
    ],
    includes: [
      'النقل من وإلى الفندق',
      'مرشد سياحي متخصص',
      'تذاكر الدخول لجميع المواقع',
      'وجبة غداء',
      'مياه معدنية ومشروبات',
    ],
    excludes: [
      'الإقامة في الفنادق',
      'التأمين الشخصي',
      'البقشيش',
      'المشتريات الشخصية',
    ],
    itinerary: [
      { day: 'اليوم الأول', title: 'زيارة الأهرامات', description: 'استقبال من الفندق وزيارة أهرامات الجيزة الثلاثة وأبو الهول ومنصة البانوراما.' },
      { day: 'اليوم الأول', title: 'المتحف المصري', description: 'جولة في المتحف المصري الكبير لمشاهدة كنوز توت عنخ آمون.' },
      { day: 'اليوم الأول', title: 'خان الخليلي', description: 'زيارة سوق خان الخليلي التاريخي ووجبة غداء في أشهر مطعم.' },
    ],
    host: {
      name: 'محمد علي',
      avatar: '/images/avatars/avatar-11.svg',
      bio: 'مرشد سياحي محترف بخبرة 15 عامًا في مجال السياحة التاريخية. خبير في الحضارة المصرية القديمة ومتحدث بطلاقة بالعربية والإنجليزية والفرنسية.',
    },
    amenities: [
      { icon: '🚐', label: 'نقل خاص' },
      { icon: '🎧', label: 'مرشد صوتي' },
      { icon: '📸', label: 'تصوير احترافي' },
      { icon: '🍽️', label: 'غداء مجاني' },
      { icon: '💧', label: 'مياه مجانية' },
    ],
  },
  {
    slug: 'red-sea-diving-adventure',
    name: 'مغامرة الغوص في البحر الأحمر',
    subtitle: 'Explore the Coral Reefs',
    description: 'رحلة غوص لا تنسى في أشهر مواقع الغوص في العالم: راس محمد وتيران.',
    longDescription: 'انطلق في مغامرة غوص استثنائية في مياه البحر الأحمر الصافية. تشمل الرحلة رحلة بحرية كاملة إلى محمية راس محمد وجزيرة تيران مع مدرب غوص معتمد دولياً. ستتمكن من استكشاف الشعاب المرجانية الخلابة والتنوع البيولوجي المذهل للحياة البحرية. جميع معدات الغوص متضمنة بالإضافة إلى وجبة غداء ومشروبات على متن اليخت.',
    category: 'رياضات مائية',
    rating: 4.8,
    reviewCount: 412,
    location: 'شرم الشيخ',
    region: 'بحر أحمر',
    price: 1800,
    currency: 'EGP',
    duration: 'يوم كامل',
    image: '/images/businesses/diving.jpg',
    gallery: [
      '/images/activities/diving-activity.jpg',
      '/images/destinations/hurghada.jpg',
      '/images/destinations/sharm-el-sheikh.jpg',
    ],
    highlights: [
      'مدرب غوص معتمد دولياً (PADI)',
      'رحلة بحرية كاملة مع وجبة غداء',
      'زيارة راس محمد وتيران',
      'معدات غوص عالية الجودة',
      'تصوير تحت الماء متاح',
    ],
    includes: [
      'النقل من الفندق',
      'معدات الغوص كاملة',
      'مدرب غوص محترف',
      'وجبة غداء على اليخت',
      'مشروبات ومياه',
      'تأمين الرحلة',
    ],
    excludes: [
      'الإقامة',
      'التصوير تحت الماء (رسوم إضافية)',
      'البقشيش',
    ],
    itinerary: [
      { day: 'اليوم الأول', title: 'الإبحار إلى راس محمد', description: 'مغادرة المارينا، إحاطة السلامة، الإبحار إلى محمية راس محمد.' },
      { day: 'اليوم الأول', title: 'الغوص الأول', description: 'أول غوصة في أشهر مواقع الغوص في راس محمد.' },
      { day: 'اليوم الأول', title: 'الغداء والاسترخاء', description: 'وجبة غداء على اليخت مع فرصة للاسترخاء والتشمس.' },
      { day: 'اليوم الأول', title: 'الغوص الثاني', description: 'الغوصة الثانية في موقع مختلف مع إرشاد المدرب.' },
    ],
    host: {
      name: 'نادية جمال',
      avatar: '/images/avatars/avatar-9.svg',
      bio: 'مدربة غوص محترفة معتمدة من PADI مع أكثر من 3000 غوصة في البحر الأحمر. شغوفة بالحياة البحرية والحفاظ على الشعاب المرجانية.',
    },
    amenities: [
      { icon: '🛥️', label: 'يخت خاص' },
      { icon: '🤿', label: 'معدات غوص' },
      { icon: '👨‍🏫', label: 'مدرب معتمد' },
      { icon: '🍱', label: 'غداء بحري' },
      { icon: '📷', label: 'تصوير فوتوغرافي' },
    ],
  },
  {
    slug: 'luxor-temple-tour',
    name: 'جولة معابد الأقصر',
    subtitle: 'Valley of the Kings & Karnak',
    description: 'استكشف أعظم المعابد الفرعونية في العالم في مدينة الأقصر الساحرة.',
    longDescription: 'جولة شاملة تأخذك في رحلة عبر أعظم حضارة عرفها التاريخ. تبدأ الجولة بزيارة وادي الملوك حيث مقابر الفراعنة العظام، ثم معبد حتشبسوت، يليها معبد الكرنك، وأخيراً معبد الأقصر في المساء مع عرض الصوت والضوء. تشمل الجولة مرشداً متخصصاً ونقلاً مريحاً.',
    category: 'جولات تاريخية',
    rating: 4.9,
    reviewCount: 256,
    location: 'الأقصر',
    region: 'صعيد مصر',
    price: 2200,
    currency: 'EGP',
    duration: 'يوم كامل',
    image: '/images/destinations/luxor.jpg',
    gallery: [
      '/images/destinations/luxor.jpg',
      '/images/destinations/aswan.jpg',
      '/images/destinations/alexandria.jpg',
    ],
    highlights: [
      'زيارة وادي الملوك',
      'معبد حتشبسوت',
      'معبد الكرنك',
      'معبد الأقصر وعرض الصوت والضوء',
      'مرشد سياحي متخصص',
    ],
    includes: [
      'النقل من الفندق',
      'مرشد سياحي متخصص',
      'تذاكر الدخول لجميع المواقع',
      'وجبة غداء نيلية',
      'مياه ومشروبات',
    ],
    excludes: [
      'الإقامة',
      'التأمين',
      'البقشيش',
      'التصوير الداخلي (رسوم)',
    ],
    itinerary: [
      { day: 'اليوم الأول', title: 'وادي الملوك', description: 'استكشاف مقابر الفراعنة في وادي الملوك مع شرح تفصيلي.' },
      { day: 'اليوم الأول', title: 'معبد حتشبسوت', description: 'زيارة معبد الملكة حتشبسوت المهيب في الدير البحري.' },
      { day: 'اليوم الأول', title: 'الغداء على النيل', description: 'وجبة غداء تقليدية على متن مركب شراعي في النيل.' },
      { day: 'اليوم الأول', title: 'معبد الكرنك', description: 'جولة في أكبر معبد في العالم - معبد الكرنك.' },
      { day: 'اليوم الأول', title: 'عرض الصوت والضوء', description: 'حضور عرض الصوت والضوء المذهل في معبد الأقصر.' },
    ],
    host: {
      name: 'خالد عبدالله',
      avatar: '/images/avatars/avatar-12.svg',
      bio: 'أخصائي آثار ومصريات بخبرة 20 عاماً. قام بتأليف عدة كتب عن الحضارة المصرية القديمة ويقدم محاضرات في الجامعات العالمية.',
    },
    amenities: [
      { icon: '🚐', label: 'نقل خاص' },
      { icon: '🎙️', label: 'مرشد خبير' },
      { icon: '⛵', label: 'رحلة نيلية' },
      { icon: '🍽️', label: 'غداء تقليدي' },
      { icon: '🎫', label: 'تذاكر شاملة' },
    ],
  },
  {
    slug: 'siwa-desert-safari',
    name: 'سفاري صحراء سيوة',
    subtitle: 'Oasis Camping & Stargazing',
    description: 'مغامرة في قلب الصحراء الغربية مع التخييم تحت النجوم وزيارة الواحات المخفية.',
    longDescription: 'اهرب من صخب المدينة وانطلق في مغامرة سفاري لا تنسى في صحراء سيوة الساحرة. تشمل الرحلة ركوب الدفع الرباعي بين الكثبان الرملية، وزيارة البحيرات المالحة وينابيع المياه الطبيعية، والتخييم تحت سماء مليئة بالنجوم مع عشاء بدوي تقليدي وسمر حول النار.',
    category: 'مغامرات',
    rating: 4.7,
    reviewCount: 189,
    location: 'سيوة',
    region: 'الصحراء الغربية',
    price: 3500,
    currency: 'EGP',
    duration: 'يومان / ليلة',
    image: '/images/destinations/siwa.jpg',
    gallery: [
      '/images/destinations/siwa.jpg',
      '/images/destinations/hurghada.jpg',
      '/images/activities/desert-safari-activity.jpg',
    ],
    highlights: [
      'ركوب الدفع الرباعي في الكثبان الرملية',
      'التخييم تحت النجوم',
      'عشاء بدوي تقليدي',
      'زيارة البحيرات المالحة',
      'الاستحمام في الينابيع الطبيعية',
    ],
    includes: [
      'النقل من سيوة',
      'سيارة دفع رباعي',
      'خيمة ومعدات التخييم',
      'وجبة عشاء وإفطار بدوية',
      'مرشد صحراوي',
      'مياه ومشروبات',
    ],
    excludes: [
      'النقل إلى سيوة',
      'التأمين الشخصي',
      'البقشيش',
    ],
    itinerary: [
      { day: 'اليوم الأول', title: 'انطلاق السفاري', description: 'انطلاق بسيارات الدفع الرباعي عبر كثبان سيوة الرملية.' },
      { day: 'اليوم الأول', title: 'البحيرات المالحة', description: 'زيارة البحيرات المالحة والاستحمام في الينابيع الطبيعية.' },
      { day: 'اليوم الأول', title: 'التخييم والعشاء', description: 'نصب المخيم، عشاء بدوي تقليدي، وسمر حول النار.' },
      { day: 'اليوم الثاني', title: 'قلعة شالي', description: 'العودة لسيوة وزيارة قلعة شالي التاريخية.' },
    ],
    host: {
      name: 'موسى الطويل',
      avatar: '/images/avatars/avatar-20.svg',
      bio: 'مرشد صحراوي من سيوة يعرف الصحراء الغربية مثل ظهر يده. يقدم تجارب سفاري أصيلة تجمع بين المغامرة والثقافة البدوية.',
    },
    amenities: [
      { icon: '🚙', label: 'دفع رباعي' },
      { icon: '⛺', label: 'تخييم فاخر' },
      { icon: '🔥', label: 'عشاء بدوي' },
      { icon: '⭐', label: 'مراقبة النجوم' },
      { icon: '💧', label: 'مياه وفيرة' },
    ],
  },
  {
    slug: 'nile-cruise-aswan-luxor',
    name: 'رحلة نيلية أسوان - الأقصر',
    subtitle: '5-Day Nile Journey',
    description: 'رحلة بحرية فاخرة على متن مركب شراعي تقليدي بين أسوان والأقصر.',
    longDescription: 'عيش تجربة فريدة من نوعها برحلة نيلية لا تنسى على متن مركب شراعي تقليدي (فيلوكا). رحلة تمتد لخمسة أيام تأخذك من أسوان إلى الأقصر، تمر خلالها بأجمل المناظر الطبيعية والمعابد الفرعونية على ضفاف النيل. استمتع بالهدوء والسكينة وأنت تبحر في أقدس نهر في العالم.',
    category: 'رحلات نيلية',
    rating: 4.8,
    reviewCount: 167,
    location: 'أسوان - الأقصر',
    region: 'صعيد مصر',
    price: 8500,
    currency: 'EGP',
    duration: '5 أيام / 4 ليالٍ',
    image: '/images/activities/nile-cruise.jpg',
    gallery: [
      '/images/activities/nile-cruise.jpg',
      '/images/destinations/aswan.jpg',
      '/images/destinations/luxor.jpg',
    ],
    highlights: [
      'الإقامة على متن المركب',
      'زيارة معابد أبو سمبل',
      'جولات سياحية يومية',
      'مطبخ مصري أصيل',
      'غروب الشمس على النيل',
    ],
    includes: [
      'الإقامة على متن المركب',
      'جميع الوجبات (إفطار، غداء، عشاء)',
      'الجولات السياحية مع مرشد',
      'تذاكر الدخول للمعابد',
      'النقل في المدن',
    ],
    excludes: [
      'النقل الجوي',
      'التأمين',
      'البقشيش',
      'المشروبات الكحولية',
    ],
    itinerary: [
      { day: 'اليوم الأول', title: 'الصعود على متن المركب', description: 'الصعود على متن المركب في أسوان، استقبال ترحيبي، وجبة غداء.' },
      { day: 'اليوم الثاني', title: 'أبو سمبل', description: 'رحلة إلى معبد أبو سمبل الرائع وعرض الصوت والضوء.' },
      { day: 'اليوم الثالث', title: 'الإبحار إلى كوم أمبو', description: 'الإبحار شمالاً مع زيارة معبد كوم أمبو وإدفو.' },
      { day: 'اليوم الرابع', title: 'الوصول إلى الأقصر', description: 'الوصول إلى الأقصر، جولة في معبد الكرنك.' },
      { day: 'اليوم الخامس', title: 'المغادرة', description: 'الفطور على متن المركب، المغادرة بعد جولة وداع.' },
    ],
    host: {
      name: 'أسامة النوبي',
      avatar: '/images/avatars/avatar-15.svg',
      bio: 'قبطان نيلية من أسوان بخبرة 25 عاماً في الملاحة النيلية. يعشق نهر النيل ويقدم لضيوفه تجربة أصيلة تجمع بين الفخامة والتقاليد.',
    },
    amenities: [
      { icon: '⛵', label: 'مركب شراعي' },
      { icon: '🛏️', label: 'كابينة مكيفة' },
      { icon: '🍳', label: 'مطبخ مصري' },
      { icon: '🏛️', label: 'جولات أثرية' },
      { icon: '🧘', label: 'يوغا على السطح' },
    ],
  },
];

export const regions = [
  { name: 'جميع المناطق', slug: 'all' },
  { name: 'القاهرة الكبرى', slug: 'القاهرة الكبرى' },
  { name: 'بحر أحمر', slug: 'بحر أحمر' },
  { name: 'صعيد مصر', slug: 'صعيد مصر' },
  { name: 'ساحل البحر المتوسط', slug: 'ساحل البحر المتوسط' },
  { name: 'الصحراء الغربية', slug: 'الصحراء الغربية' },
];

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string[];
  location: string;
  featured: boolean;
}

export const stories: Story[] = [
  {
    slug: 'sunset-over-the-pyramids',
    title: 'غروب الشمس خلف الأهرامات',
    subtitle: 'رحلة في قلب التاريخ المصري القديم',
    author: 'سارة أحمد',
    authorAvatar: '/images/avatars/avatar-32.svg',
    date: '15 يناير 2025',
    readTime: '5 دقائق',
    image: '/images/destinations/cairo.svg',
    category: 'تاريخ',
    tags: ['الأهرامات', 'الجيزة', 'الحضارة', 'الفراعنة'],
    excerpt: 'لا شيء يضاهي شعور الوقوف أمام أعظم عجائب العالم القديم مع غروب الشمس.',
    content: [
      'كانت الشمس تميل نحو الغروب وأنا أقف أمام الهرم الأكبر. من الصعب وصف الشعور الذي يغمرك عندما ترى هذا الصرح العظيم أمامك، بعد آلاف السنين من بنائه.',
      'بدأت رحلتي في الصباح الباكر من القاهرة. الجو كان منعشاً والشمس تشرق بخفة. بعد ساعة من القيادة، وصلت إلى منطقة أهرامات الجيزة. المنظر من بعيد يخطف الأنفاس — ثلاثة أهرامات عملاقة ترتفع من رمال الصحراء.',
      'تجولت حول الهرم الأكبر لخوفو، وتأملت الأحجار الضخمة التي يبلغ وزن كل منها عدة أطنان. كيف تمكن المصريون القدماء من نقلها ورفعها بهذه الدقة المذهلة؟',
      'زرت بعد ذلك مركب الشمس، وهو مركب فرعوني قديم تم اكتشافه بالقرب من الهرم. حجمه ودقة صناعته يذهلان العقل.',
      'ثم حان الوقت لركوب الجمل والتجول في الصحراء المحيطة. كان المرشد البدوي يروي لي قصصاً عن المنطقة والأساطير المحيطة بالأهرامات.',
      'مع غروب الشمس، أخذت الأهرامات لوناً ذهبياً ساحراً. كان المنظر خيالياً — الشمس البرتقالية خلف الهرم، والظلال الطويلة على الرمال الذهبية.',
      'أنهيت اليوم بعشاء تقليدي في مطعم قريب، مع إطلالة رائعة على الأهرامات المضيئة في الليل. تجربة لا تنسى.',
    ],
    location: 'الجيزة، القاهرة',
    featured: true,
  },
  {
    slug: 'diving-red-sea-magic',
    title: 'الغوص في سحر البحر الأحمر',
    subtitle: 'عالم تحت الماء يفوق الخيال',
    author: 'أحمد كمال',
    authorAvatar: '/images/avatars/avatar-53.svg',
    date: '10 يناير 2025',
    readTime: '7 دقائق',
    image: '/images/activities/diving.svg',
    category: 'مغامرات',
    tags: ['الغوص', 'البحر الأحمر', 'الشعاب المرجانية', 'الحياة البحرية'],
    excerpt: 'اكتشاف عالم ملون تحت سطح البحر الأحمر — تجربة تغير حياتك.',
    content: [
      'منذ أن كنت طفلاً، كنت أحلم برؤية العالم تحت الماء. البحر الأحمر كان دائماً على رأس قائمة أمنياتي، وأخيراً تحقق الحلم.',
      'وصلت إلى الغردقة في الصباح. المارينا كان يعج بالحياة — يخوت بيضاء، ومياه فيروزية، وأشعة شمس دافئة. قابلت مدربي نادية، وهي مدربة غوص محترفة معتمدة من PADI.',
      'بعد جلسة تعريفية قصيرة، ارتدينا معدات الغوص وانطلقنا. كانت أول غوصة في موقع قريب من الشاطئ — عالم ملون من الشعاب المرجانية والأسماك الاستوائية.',
      'رأيت أسماك الملاك الملونة، وفراشات البحر، وحتى سلحفاة بحرية كبيرة سبحت بجانبي. الشعاب المرجانية كانت أشبه بحدائق تحت الماء — ألوان زاهية لا تصدق.',
      'الغوصة الثانية كانت في موقع أعمق. هنا رأيت أسماك القرش ذات الطرف الأبيض، وأسماك شفافة، وموراي مختبئ بين الصخور.',
      'بين الغوصات، استمتعنا بوجبة غداء على متن اليخت. السماء زرقاء صافية، والمياه هادئة، والجو مثالي.',
      'مع نهاية اليوم، وأنا أجلس على سطح اليخت أشاهد غروب الشمس، شعرت بالامتنان لهذه التجربة المذهلة. البحر الأحمر حقاً جوهرة مخفية.',
    ],
    location: 'الغردقة، البحر الأحمر',
    featured: true,
  },
  {
    slug: 'luxor-temples-wonders',
    title: 'معابد الأقصر: رحلة عبر الزمن',
    subtitle: 'أعظم متحف مفتوح في العالم',
    author: 'ليلى حسن',
    authorAvatar: '/images/avatars/avatar-47.svg',
    date: '5 يناير 2025',
    readTime: '6 دقائق',
    image: '/images/destinations/luxor.svg',
    category: 'تاريخ',
    tags: ['الأقصر', 'معابد', 'وادي الملوك', 'الفراعنة'],
    excerpt: 'بين أعمدة الكرنك وأسرار وادي الملوك، رحلة لا تنسى في مدينة الأقصر الساحرة.',
    content: [
      'الأقصر ليست مجرد مدينة — إنها متحف مفتوح يروي قصة أعظم حضارة عرفها الإنسان.',
      'بدأت يومي مع شروق الشمس بزيارة معبد الكرنك. الوقوف بين أعمدة هذا المعبد الهائلة يجعلك تشعر بصغر حجمك أمام عظمة التاريخ. نقوش الفراعنة على الجدران تحكي قصصاً من آلاف السنين.',
      'ثم اتجهت إلى وادي الملوك على الضفة الغربية. هنا، تحت الأرض، استقر فراعنة مصر العظام. مقبرة توت عنخ آمون الأكثر شهرة، لكن المقابر الأخرى لا تقل روعة. رسوم ملونة زاهية تغطي الجدران.',
      'زيارة معبد حتشبسوت كانت محطتي التالية. معبد الملكة المحاربة المنحوت في الجبل — تحفة معمارية فريدة.',
      'بعد الظهر، استمتعت بوجبة غداء على متن مركب شراعي في النيل. النسيم البارد والمناظر الخلابة كانا بمثابة استراحة مثالية.',
      'في المساء، حضرت عرض الصوت والضوء في معبد الأقصر. قصة الفراعنة تروى بطريقة ساحرة مع تأثيرات ضوئية رائعة.',
      'أنهيت اليوم وأنا أشعر أنني عشت آلاف السنين في يوم واحد. الأقصر حقاً مدينة لا تموت.',
    ],
    location: 'الأقصر، صعيد مصر',
    featured: true,
  },
  {
    slug: 'siwa-oasis-escape',
    title: 'سيوة: واحة الهدوء والسحر',
    subtitle: 'هروب من صخب المدينة إلى قلب الصحراء',
    author: 'محمد فريد',
    authorAvatar: '/images/avatars/avatar-68.svg',
    date: '28 ديسمبر 2024',
    readTime: '8 دقائق',
    image: '/images/destinations/siwa.svg',
    category: 'طبيعة',
    tags: ['سيوة', 'الصحراء', 'الواحات', 'الطبيعة'],
    excerpt: 'في قلب الصحراء الغربية، توجد واحة سيوة — جنة مخفية بطبيعتها الساحرة وثقافتها الفريدة.',
    content: [
      'سيوة ليست مجرد وجهة سياحية — إنها عالم مختلف تماماً. بعد رحلة طويلة عبر الصحراء الغربية، تظهر سيوة كسراب في الأفق.',
      'أول ما لفت انتباهي هو قلعة شالي القديمة، المصنوعة من الطين والملح، والتي ترتفع في وسط المدينة. تجولت في أزقتها الضيقة وأنا أتخيل حياة السكان عبر القرون.',
      'زرت بحيرة الملح حيث يمكنك الطفو على سطح الماء بسهولة، تماماً مثل البحر الميت. المناظر المحيطة سريالية — مياه زرقاء في وسط صحراء ذهبية.',
      'حمام كليوباترا — ينبوع طبيعي دافئ — كان محطتي التالية. الماء دافئ بشكل طبيعي ويقال إن له فوائد علاجية.',
      'في المساء، انطلقت في جولة سفاري قصيرة مع مرشد بدوي. ركبنا سيارات الدفع الرباعي عبر الكثبان الرملية، ثم توقفنا لمشاهدة غروب الشمس. منظر لا يوصف.',
      'العشاء كان تجربة بحد ذاتها — طعام بدوي تقليدي تحت سماء مرصعة بالنجوم. بعيداً عن أضواء المدينة، كانت النجوم تبدو قريبة جداً.',
      'سيوة علمتني معنى الهدوء الحقيقي. هذه الواحة السحرية تبقى في القلب.',
    ],
    location: 'سيوة، الصحراء الغربية',
    featured: false,
  },
  {
    slug: 'alexandria-mediterranean-bride',
    title: 'الإسكندرية: عروس البحر المتوسط',
    subtitle: 'مدينة تجمع بين التاريخ وسحر البحر',
    author: 'نورا إبراهيم',
    authorAvatar: '/images/avatars/avatar-44.svg',
    date: '20 ديسمبر 2024',
    readTime: '4 دقائق',
    image: '/images/destinations/alexandria.svg',
    category: 'مدن',
    tags: ['الإسكندرية', 'البحر المتوسط', 'تاريخ', 'ثقافة'],
    excerpt: 'المدينة التي تأسر القلوب بمزيجها الفريد من التاريخ القديم والحياة العصرية.',
    content: [
      'الإسكندرية مدينة لا تشبه أي مدينة أخرى في مصر. لها روح خاصة، مزيج من الثقافات والتاريخ.',
      'بدأت جولتي من مكتبة الإسكندرية — صرح معماري حديث يطل على البحر. القبة الزجاجية العملاقة والتصميم المذهل يجعلانها واحدة من أجمل المكتبات في العالم.',
      'بعد المكتبة، توجهت إلى قلعة قايتباي. القلعة شُيدت في نفس موقع منارة الإسكندرية القديمة، إحدى عجائب العالم القديم. النسيم البارد والمنظر الخلاب للبحر يجعلان المكان ساحراً.',
      'تمشيت على الكورنيش — ممشى البحر الشهير — حيث يلتقي البحر بالمدينة. المقاهي والمطاعم على طول الكورنيش تقدم أشهى المأكولات البحرية.',
      'توقفت لتناول الغداء في أحد المطاعم الشهيرة. السمك الطازج والجمبري والأرز بالجمبري — الإسكندرية حقاً جنة عشاق المأكولات البحرية.',
      'في المساء، زرت شارع فؤاد — شارع تاريخي يعود للعصر اليوناني الروماني. المباني الكلاسيكية والمقاهي القديمة تخلق جواً ساحراً.',
      'الإسكندرية تترك في نفسك أثراً لا يمحى. سأعود إليها مراراً وتكراراً.',
    ],
    location: 'الإسكندرية، ساحل البحر المتوسط',
    featured: false,
  },
  {
    slug: 'nile-cruise-adventure',
    title: 'رحلة نيلية من أسوان إلى الأقصر',
    subtitle: 'خمسة أيام من السحر على ضفاف النيل',
    author: 'هند سليمان',
    authorAvatar: '/images/avatars/avatar-23.svg',
    date: '15 ديسمبر 2024',
    readTime: '6 دقائق',
    image: '/images/luxury/four-seasons.svg',
    category: 'رحلات',
    tags: ['النيل', 'أسوان', 'الأقصر', 'رحلة نيلية'],
    excerpt: 'رحلة بحرية فاخرة على نهر النيل — مزيج من الاسترخاء والمغامرة والاكتشاف.',
    content: [
      'حلمت دائماً برحلة نيلية على نهر النيل، وأخيراً تحقق الحلم. خمسة أيام من الجمال والهدوء والاكتشاف.',
      'بدأت الرحلة من أسوان. استقبلنا القبطان أسامة على متن المركب الشراعي التقليدي. المركب جميل — خشب طبيعي وأشرعة بيضاء وكبائن مكيفة.',
      'في اليوم الأول، أبحرنا بين جزر النيل الخضراء. المناظر طبيعية ساحرة — نخيل عالية، وقرى نوبية ملونة، وطيور مائية.',
      'اليوم الثاني كان مخصصاً لزيارة معبد أبو سمبل. الرحلة البرية كانت طويلة لكنها تستحق كل لحظة. معبد رمسيس الثاني المنحوت في الجبل — عظمة بكل معنى الكلمة.',
      'الأيام التالية مرت بين زيارة معابد كوم أمبو وإدفو، والاسترخاء على سطح المركب، وتناول الطعام المصري اللذيذ.',
      'غروب الشمس على النيل كان أكثر لحظات الرحلة سحراً. المياه الذهبية، والسماء الملونة، والصمت المطلق — لحظات تأملية لا تنسى.',
      'وصلت إلى الأقصر وأنا أشعر أنني عشت عمراً كاملاً في خمسة أيام. الرحلة النيلية تجربة يجب أن يعيشها كل إنسان.',
    ],
    location: 'أسوان - الأقصر',
    featured: false,
  },
];

export const categoryIcons: Record<string, string> = {
  diving: '🤿',
  safari: '🚙',
  restaurants: '🍽️',
  hotels: '🏨',
  history: '🏛️',
  shopping: '🛍️',
  tours: '🎫',
  cruises: '⛵',
  watersports: '🏄',
  nature: '🌿',
  adventure: '🧗',
  sports: '⚽',
  all: '📍',
};

/* ───── Centralized User ───── */
export const MOCK_USER = {
  id: 'user-1',
  name: 'يوسف عبدالله',
  email: 'youssef@egypthub.com',
  phone: '+201001234567',
  role: 'user' as const,
  avatar: '/images/avatars/avatar-11.svg',
  title: 'مستكشف مصر',
  stats: { trips: 8, destinations: 5, reviews: 12, favorites: 6 },
  wallet: { balance: 2750, points: 1250 },
  memberSince: 'يناير 2024',
};

export interface MockBooking {
  id: string; code: string; title: string; date: string; duration: string;
  price: number; guests: string; status: string; image: string; tickets: boolean;
}

export const MOCK_BOOKINGS: MockBooking[] = [
  { id: 'b1', code: 'EH-4521', title: 'مغامرة الغوص في البحر الأحمر', date: '15 يناير 2025', duration: 'يوم كامل', price: 5900, guests: '2 بالغين + 1 طفل', status: 'مؤكد', image: '/images/activities/diving.svg', tickets: true },
  { id: 'b2', code: 'EH-4520', title: 'جولة في معبد الأقصر', date: '18 يناير 2025', duration: 'نصف يوم', price: 2200, guests: '2 بالغين', status: 'قادم', image: '/images/destinations/luxor.svg', tickets: false },
  { id: 'b3', code: 'EH-4519', title: 'رحلة نيلية أسوان - الأقصر', date: '25 يناير 2025', duration: '5 أيام / 4 ليالٍ', price: 8500, guests: '2 بالغين', status: 'مؤكد', image: '/images/luxury/four-seasons.svg', tickets: true },
  { id: 'b4', code: 'EH-4518', title: 'رحلة سفاري في الصحراء', date: '02 فبراير 2025', duration: 'يوم كامل', price: 4100, guests: '2 بالغين', status: 'قيد المراجعة', image: '/images/activities/desert-safari.svg', tickets: false },
  { id: 'b5', code: 'EH-4517', title: 'رحلة غوص في الغردقة', date: '10 فبراير 2025', duration: 'نصف يوم', price: 3500, guests: '3 بالغين', status: 'مؤكد', image: '/images/activities/diving.svg', tickets: true },
  { id: 'b6', code: 'EH-4522', title: 'جولة أهرامات الجيزة', date: '5 مارس 2025', duration: '8 ساعات', price: 2500, guests: 'بالغين', status: 'ملغي', image: '/images/destinations/cairo.svg', tickets: false },
];

export interface MockTransaction {
  id: number; title: string; amount: number; date: string; type: 'expense' | 'income'; category: string;
}

export const MOCK_TRANSACTIONS: MockTransaction[] = [
  { id: 1, title: 'حجز رحلة سفاري', amount: -450, date: '14 يناير', type: 'expense', category: 'مغامرات' },
  { id: 2, title: 'استرداد مبلغ', amount: +200, date: '12 يناير', type: 'income', category: 'استرد' },
  { id: 3, title: 'حجز فندق النيل', amount: -1200, date: '10 يناير', type: 'expense', category: 'فنادق' },
  { id: 4, title: 'حجز غوص', amount: -850, date: '8 يناير', type: 'expense', category: 'رياضات مائية' },
  { id: 5, title: 'استرداد مبلغ', amount: +500, date: '5 يناير', type: 'income', category: 'استرد' },
  { id: 6, title: 'حجز رحلة نيلية', amount: -3400, date: '2 يناير', type: 'expense', category: 'رحلات' },
  { id: 7, title: 'مكافأة إحالة', amount: +150, date: '30 ديسمبر', type: 'income', category: 'مكافآت' },
  { id: 8, title: 'حجز مطعم', amount: -320, date: '28 ديسمبر', type: 'expense', category: 'مطاعم' },
];

export interface MockNotification {
  text: string; time: string; type: 'success' | 'offer' | 'reminder';
}

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  { text: 'تم تأكيد حجز رحلة الصحراء', time: 'منذ 5 دقائق', type: 'success' },
  { text: 'عرض خاص: خصم 20% على رحلات النيل', time: 'منذ ساعة', type: 'offer' },
  { text: 'تذكير: رحلتك بعد 3 أيام', time: 'منذ 3 ساعات', type: 'reminder' },
  { text: 'تم إضافة تقييم جديد على حسابك', time: 'منذ يوم', type: 'success' },
  { text: 'عرض العيد: احجز الآن واستمتع بخصم 30%', time: 'منذ يومين', type: 'offer' },
  { text: 'تم تحديث معلومات رحلتك', time: 'منذ 3 أيام', type: 'reminder' },
];

export interface MockReview {
  title: string; stars: number; text: string; date: string;
}

export const MOCK_REVIEWS: MockReview[] = [
  { title: 'رحلة سفاري رائعة', stars: 5, text: 'تجربة لا تنسى في صحراء مصر', date: 'يناير 2025' },
  { title: 'معبد الأقصر مذهل', stars: 4, text: 'جولة تاريخية ممتعة جداً', date: 'ديسمبر 2024' },
  { title: 'غوص ممتاز', stars: 5, text: 'أجمل تجربة غوص في حياتي', date: 'نوفمبر 2024' },
  { title: 'فندق رائع', stars: 4, text: 'إقامة ممتازة وخدمة رائعة', date: 'أكتوبر 2024' },
];

export interface MockReward {
  id: number; title: string; points: number; expiry: string; icon: string;
}

export const MOCK_REWARDS: MockReward[] = [
  { id: 1, title: 'خصم 15% على الحجز القادم', points: 500, expiry: '31 يناير', icon: '🎫' },
  { id: 2, title: 'ترقية VIP مجانية', points: 1000, expiry: '28 فبراير', icon: '👑' },
  { id: 3, title: 'تجربة مجانية', points: 2000, expiry: '15 مارس', icon: '🎁' },
  { id: 4, title: 'نقاط إضافية', points: 50, expiry: '90 يوم', icon: '⭐' },
];

/* ───── Sharm El-Sheikh Businesses (for Category Pages) ───── */
export interface MockBusiness {
  id: string; name: string; nameEn: string; slug: string; category: string;
  subcategory: string; description: string; rating: number; reviewsCount: number;
  image: string; priceLevel: number; phone: string; address: string;
  workingHours: string; featured: boolean; tags: string[];
}

export const SHARM_BUSINESSES: MockBusiness[] = [
  { id: 'biz-1', name: 'فول وفلافل أبو العلا', nameEn: 'Abou El-Ella', slug: 'foul-wa-falafel', category: 'مطاعم', subcategory: 'مصري', description: 'أشهر مطعم فول وفلافل في شرم الشيخ، طعم أصيل وخدمة سريعة.', rating: 4.5, reviewsCount: 238, image: '/images/businesses/foul-falafel.jpg', priceLevel: 1, phone: '01012345678', address: 'شارع السلام، حي النور', workingHours: '٦ صباحاً - ١١ مساءً', featured: true, tags: ['فول', 'فلافل', 'مصري', 'إفطار'] },
  { id: 'biz-2', name: 'سمك رزق البحر', nameEn: 'Rizq El-Bahr', slug: 'rizq-el-bahr', category: 'مطاعم', subcategory: 'مأكولات بحرية', description: 'أطعم المأكولات البحرية الطازجة يومياً.', rating: 4.7, reviewsCount: 312, image: '/images/businesses/seafood.jpg', priceLevel: 2, phone: '01023456789', address: 'شارع الميناء، المنطقة السياحية', workingHours: '١٢ ظهراً - ١٢ صباحاً', featured: true, tags: ['سمك', 'بحرية', 'طازج'] },
  { id: 'biz-3', name: 'قهوة سي سلام بلدي', nameEn: 'Sea Salam Balady', slug: 'sea-salam-balady', category: 'كافيهات', subcategory: 'بلدي', description: 'قهوة بلدي أصيلة مع إطلالة رائعة على البحر.', rating: 4.3, reviewsCount: 156, image: '/images/businesses/sea-salam-cafe.jpg', priceLevel: 1, phone: '01034567890', address: 'الكورنيش، المنطقة السياحية', workingHours: '٧ صباحاً - ٢ صباحاً', featured: true, tags: ['قهوة', 'شيشة', 'إطلالة', 'بحر'] },
  { id: 'biz-4', name: 'دايف دايف للغوص', nameEn: 'Dive Dive', slug: 'dive-dive', category: 'أنشطة', subcategory: 'غوص', description: 'مركز غوص معتمد دولياً لتعليم الغوص والرحلات البحرية.', rating: 4.9, reviewsCount: 445, image: '/images/businesses/diving.jpg', priceLevel: 3, phone: '01045678901', address: 'مارينا شرم الشيخ', workingHours: '٨ صباحاً - ٦ مساءً', featured: true, tags: ['غوص', 'PADI', 'رحلات بحرية', 'تدريب'] },
  { id: 'biz-5', name: 'بازار خان الخليلي', nameEn: 'Khan El-Khalili', slug: 'khan-el-khalili-bazaar', category: 'تسوق', subcategory: 'هدايا تذكارية', description: 'أكبر بازار للهدايا التذكارية والمشغولات اليدوية.', rating: 4.2, reviewsCount: 89, image: '/images/businesses/khan-bazaar.jpg', priceLevel: 2, phone: '01056789012', address: 'سوق شرم الشيخ القديم', workingHours: '١٠ صباحاً - ١١ مساءً', featured: false, tags: ['هدايا', 'مشغولات يدوية', 'تذكارات'] },
  { id: 'biz-6', name: 'فندق رويال ريف', nameEn: 'Royal Reef Resort', slug: 'royal-reef', category: 'فنادق', subcategory: 'منتجع', description: 'منتجع 5 نجوم على البحر مع شاطئ خاص وسبا فاخر.', rating: 4.8, reviewsCount: 512, image: '/images/businesses/royal-reef.jpg', priceLevel: 4, phone: '01067890123', address: 'خليج نعمة', workingHours: 'على مدار 24 ساعة', featured: true, tags: ['فندق', 'منتجع', 'سبا', 'شاطئ'] },
  { id: 'biz-7', name: 'سفاري الصحراء', nameEn: 'Desert Safari', slug: 'desert-safari-sharm', category: 'أنشطة', subcategory: 'سفاري', description: 'رحلة سفاري مثيرة في صحراء سيناء مع ركوب الجمال وعشاء بدوي.', rating: 4.6, reviewsCount: 278, image: '/images/businesses/desert-safari.jpg', priceLevel: 2, phone: '01078901234', address: 'منطقة الصحراء، طريق دهب', workingHours: '٤ عصراً - ١٠ مساءً', featured: true, tags: ['سفاري', 'جمال', 'صحراء', 'عشاء بدوي'] },
  { id: 'biz-8', name: 'ترانسفير شرم', nameEn: 'Sharm Transfers', slug: 'sharm-transfers', category: 'نقل', subcategory: 'توصيل', description: 'خدمة نقل خاصة مكيفة من وإلى المطار والفنادق.', rating: 4.4, reviewsCount: 167, image: '/images/businesses/sharm-transfers.jpg', priceLevel: 2, phone: '01089012345', address: 'جميع أنحاء شرم الشيخ', workingHours: 'على مدار 24 ساعة', featured: false, tags: ['نقل', 'مطار', 'خاص', 'مكيف'] },
];

export const categoryDisplayNames: Record<string, string> = {
  restaurants: 'مطاعم', cafes: 'كافيهات', activities: 'أنشطة ومغامرات',
  hotels: 'فنادق', shopping: 'تسوق', transport: 'نقل',
};

export function getBusinessesByCategory(categorySlug: string): MockBusiness[] {
  const name = categoryDisplayNames[categorySlug];
  if (!name) return [];
  return SHARM_BUSINESSES.filter(b => b.category === name);
}

export function getCategoryCounts() {
  const counts: Record<string, number> = {};
  SHARM_BUSINESSES.forEach(b => {
    counts[b.category] = (counts[b.category] || 0) + 1;
  });
  return counts;
}

export const MOCK_OFFERS = [
  { id: 'off-1', title: 'خصم 50% على الغوص', business: 'دايف دايف للغوص', originalPrice: 1800, offerPrice: 900, validUntil: '31 يناير 2025', image: '/images/businesses/diving.jpg' },
  { id: 'off-2', title: 'فول وفلافل بسعر 10 جنيه', business: 'فول وفلافل أبو العلا', originalPrice: 25, offerPrice: 10, validUntil: '15 فبراير 2025', image: '/images/businesses/foul-falafel.jpg' },
  { id: 'off-3', title: 'إقامة فندقية خصم 30%', business: 'فندق رويال ريف', originalPrice: 5000, offerPrice: 3500, validUntil: '28 فبراير 2025', image: '/images/businesses/royal-reef.jpg' },
  { id: 'off-4', title: 'سفاري للشخصين بسعر واحد', business: 'سفاري الصحراء', originalPrice: 820, offerPrice: 410, validUntil: '31 مارس 2025', image: '/images/businesses/desert-safari.jpg' },
];

export const MOCK_PARTNERS = [
  { slug: 'abu-ella', name: 'فول وفلافل أبو العلا', category: 'مطاعم', city: 'شرم الشيخ', rating: 4.5, description: 'أشهر مطعم فول وفلافل في شرم الشيخ', image: '/images/businesses/foul-falafel.jpg' },
  { slug: 'dive-dive', name: 'دايف دايف للغوص', category: 'أنشطة', city: 'شرم الشيخ', rating: 4.9, description: 'مركز غوص معتمد دولياً', image: '/images/businesses/diving.jpg' },
  { slug: 'royal-reef', name: 'فندق رويال ريف', category: 'فنادق', city: 'شرم الشيخ', rating: 4.8, description: 'منتجع 5 نجوم على البحر', image: '/images/businesses/royal-reef.jpg' },
];

export const MOCK_AMBASSADORS = [
  { slug: 'nour', name: 'نور الشرم', role: 'سفير شرم الشيخ', city: 'شرم الشيخ', rating: 4.9, specialties: ['الغوص', 'السفاري', 'المطاعم'], languages: ['العربية', 'الإنجليزية', 'الروسية'], referrals: 45, leads: 28, conversions: 19, earnings: 12400, image: '/images/avatars/ambassador-nour.jpg', bio: 'خبير في شرم الشيخ، بعرف كل حتة فيها. هديك أفضل التجارب وأضمنلك أحسن الأسعار.', verified: true },
  { slug: 'ahmed', name: 'أحمد السائح', role: 'سفير القاهرة', city: 'القاهرة', rating: 4.7, specialties: ['التاريخ', 'المتاحف', 'الجولات'], languages: ['العربية', 'الإنجليزية'], referrals: 32, leads: 20, conversions: 14, earnings: 8700, image: '/images/avatars/ambassador-ahmed.jpg', bio: 'مؤرخ شغوف بالحضارة المصرية، هتعرف مني حاجات مكتوبهاش الكتب.', verified: true },
  { slug: 'mariam', name: 'مريم النيل', role: 'سفير الأقصر', city: 'الأقصر', rating: 4.8, specialties: ['الآثار', 'التصوير', 'الرحلات النيلية'], languages: ['العربية', 'الإنجليزية', 'الفرنسية'], referrals: 28, leads: 22, conversions: 16, earnings: 11200, image: '/images/avatars/ambassador-mariam.jpg', bio: 'بنحب الأقصر وبحب أعرف الناس بجمالها، مرشدة سياحية وأثرية بخبرة ١٠ سنين.', verified: true },
];
