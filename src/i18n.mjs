// Teks antarmuka & rute dua bahasa. Konten (layanan, acara, produk, artikel) datang dari Airtable.

export const routes = {
  home: { id: '/', en: '/en/' },
  about: { id: '/tentang/', en: '/en/about/' },
  services: { id: '/layanan/', en: '/en/services/' },
  events: { id: '/jadwal-acara/', en: '/en/events/' },
  products: { id: '/produk/', en: '/en/products/' },
  blog: { id: '/blog/', en: '/en/blog/' }
};

export const t = {
  id: {
    htmlLang: 'id',
    ogLocale: 'id_ID',
    skip: 'Lewati ke konten',
    menu: 'Menu',
    nav: { home: 'Beranda', about: 'Tentang', services: 'Layanan', events: 'Jadwal Acara', products: 'Produk', blog: 'Blog' },
    langName: 'Bahasa Indonesia',
    switchTo: 'Ganti ke English',
    chatWA: 'Chat WhatsApp',
    waShort: 'WhatsApp',
    bookLynk: 'Pesan lewat Lynk',
    askWA: 'Tanya lewat WhatsApp',
    seeServices: 'Lihat layanan',
    seeAllEvents: 'Lihat semua jadwal',
    seeAllPosts: 'Baca semua tulisan',
    seeProducts: 'Lihat produk',
    detail: 'Selengkapnya',
    readArticle: 'Baca artikel',
    home: {
      title: 'Teman Pulih | Konseling Intuitif & Sound Healing Nusantara',
      description: 'Teman Pulih menemani komunitas dan institusi lewat konseling intuitif online, sound healing Nusantara, meditasi suara, dan pijat chakra & meridian.',
      portfolio: 'Portofolio',
      heroAlt: 'Fikri Arya menyatukan tangan dalam sikap salam',
      testimonialsTitle: 'Instrumen, Sumber Bunyi & Testimoni',
      momentsTitle: 'Momen sesi',
      momentsLead: 'Ruang-ruang bunyi dan sesi',
      viewService: 'Lihat layanan',
      servicesTitle: 'Layanan kami',
      servicesLead: 'Empat cara untuk didampingi, untuk individu, komunitas, maupun institusi.',
      eventsTitle: 'Acara mendatang',
      productsTitle: 'Singing bowl Nusantara dan jasa grafir',
      productsLead: 'Alat yang menemani praktik Anda, dan sentuhan personal agar menjadi milik Anda sendiri.',
      blogTitle: 'Tulisan terbaru',
      blogLead: 'Catatan tentang suara, napas, dan pemulihan diri.',
      ctaTitle: 'Bawa ketenangan ke komunitas Anda',
      ctaBody: 'Ceritakan kebutuhan kelompok Anda. Kami bantu merancang sesi yang pas, dari satu jam hingga satu hari penuh.'
    },
    about: {
      title: 'Tentang Teman Pulih | Pendampingan, Sound Healing, dan Praktik Tubuh',
      description: 'Kenali Teman Pulih: ruang pendampingan yang memadukan konseling intuitif, sound healing Nusantara, dan praktik tubuh untuk komunitas dan institusi.',
      valuesTitle: 'Cara kami bekerja',
      ctaTitle: 'Mulai dengan satu percakapan',
      ctaBody: 'Tanyakan layanan yang paling sesuai untuk Anda atau kelompok Anda.'
    },
    services: {
      title: 'Layanan Teman Pulih | Konseling Intuitif, Sound Healing, Pijat Chakra',
      description: 'Layanan Teman Pulih: Online Intuitive Counseling, Sound Meditation & Grounding, Chakra and Meridian Massage, dan Sound Healing Nusantara privat maupun kelompok.',
      h1: 'Layanan',
      lead: 'Pilih bentuk pendampingan yang paling cocok. Belum yakin? Kirim pesan dan kami bantu memilih.',
      gallery: 'Momen dari layanan ini',
      about: 'Tentang layanan ini',
      booking: 'Pemesanan',
      bookingBody: 'Pesan langsung lewat Lynk atau tanya dulu lewat WhatsApp.',
      upcoming: 'Jadwal terkait',
      others: 'Layanan lainnya'
    },
    events: {
      title: 'Jadwal Acara | Sound Healing, Meditasi Suara, dan Grounding',
      description: 'Jadwal sesi dan acara Teman Pulih: sound healing, sound meditation, grounding, dan open slot konseling. Daftar lewat WhatsApp.',
      h1: 'Jadwal acara',
      lead: 'Sesi terbuka dan slot yang sedang dibuka. Untuk sesi khusus komunitas atau institusi, hubungi kami.',
      upcoming: 'Akan datang',
      past: 'Telah berlalu',
      none: 'Belum ada acara terjadwal. Hubungi kami untuk sesi privat atau kelompok.',
      register: 'Daftar lewat WhatsApp',
      registerLink: 'Daftar sekarang',
      service: 'Layanan',
      modes: { Online: 'Online', Offline: 'Tatap muka', Hybrid: 'Online dan tatap muka' }
    },
    products: {
      title: 'Singing Bowl Nusantara & Jasa Grafir | Teman Pulih',
      description: 'Singing bowl Nusantara untuk meditasi dan sound healing, plus jasa grafir mallet stick dan singing bowl agar menjadi milik Anda sendiri.',
      h1: 'Produk',
      lead: 'Alat bunyi untuk praktik harian Anda, dan layanan grafir untuk memberinya identitas.',
      orderWA: 'Pesan lewat WhatsApp',
      price: 'Harga'
    },
    blog: {
      title: 'Blog | Catatan tentang Suara, Napas, dan Pemulihan Diri',
      description: 'Artikel Teman Pulih tentang sound healing, singing bowl, grounding, dan konseling intuitif.',
      h1: 'Blog',
      lead: 'Catatan tentang suara, napas, dan cara pelan-pelan pulih.',
      none: 'Belum ada artikel.',
      watch: 'Video pendukung dari Instagram',
      openIG: 'Buka di Instagram',
      cta: 'Ingin didampingi langsung?',
      ctaBody: 'Lihat layanan kami atau kirim pesan lewat WhatsApp.',
      more: 'Tulisan lainnya',
      published: 'Terbit'
    },
    footer: {
      tagline: 'Pendampingan, sound healing, dan praktik tubuh dengan akar Nusantara.',
      explore: 'Jelajahi',
      contact: 'Hubungi',
      rights: 'Seluruh hak cipta dilindungi.',
      instagram: 'Instagram',
      store: 'Toko Lynk'
    },
    notFound: { title: 'Halaman tidak ditemukan', body: 'Alamat yang Anda tuju tidak tersedia atau sudah dipindahkan.', back: 'Kembali ke beranda' },
    wa: {
      general: 'Halo Teman Pulih, saya ingin bertanya tentang layanan.',
      service: (n) => `Halo Teman Pulih, saya ingin bertanya tentang layanan ${n}.`,
      event: (n) => `Halo Teman Pulih, saya ingin mendaftar acara ${n}.`,
      product: (n) => `Halo Teman Pulih, saya ingin bertanya tentang ${n}.`,
      group: 'Halo Teman Pulih, kami dari komunitas/institusi dan ingin mendiskusikan sesi untuk kelompok kami.'
    },
    breadcrumbHome: 'Beranda'
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    skip: 'Skip to content',
    menu: 'Menu',
    nav: { home: 'Home', about: 'About', services: 'Services', events: 'Events', products: 'Products', blog: 'Blog' },
    langName: 'English',
    switchTo: 'Ganti ke Bahasa Indonesia',
    chatWA: 'Chat on WhatsApp',
    waShort: 'WhatsApp',
    bookLynk: 'Book via Lynk',
    askWA: 'Ask on WhatsApp',
    seeServices: 'See services',
    seeAllEvents: 'See all events',
    seeAllPosts: 'Read all articles',
    seeProducts: 'See products',
    detail: 'Learn more',
    readArticle: 'Read article',
    home: {
      title: 'Teman Pulih | Intuitive Counseling & Nusantara Sound Healing',
      description: 'Teman Pulih supports communities and institutions with online intuitive counseling, Nusantara sound healing, sound meditation, and chakra massage.',
      portfolio: 'Portfolio',
      heroAlt: 'Fikri Arya with hands pressed together in greeting',
      testimonialsTitle: 'Instruments, Sound Sources & Testimonials',
      momentsTitle: 'Session moments',
      momentsLead: 'Spaces of sound and sessions',
      viewService: 'View service',
      servicesTitle: 'Our services',
      servicesLead: 'Four ways to be accompanied, for individuals, communities, and institutions.',
      eventsTitle: 'Upcoming events',
      productsTitle: 'Nusantara singing bowls and engraving',
      productsLead: 'Instruments for your practice, and a personal touch that makes them yours.',
      blogTitle: 'Latest writing',
      blogLead: 'Notes on sound, breath, and recovery.',
      ctaTitle: 'Bring calm to your community',
      ctaBody: "Tell us what your group needs. We'll help design a session that fits, from one hour to a full day."
    },
    about: {
      title: 'About Teman Pulih | Companionship, Sound Healing, and Body Practice',
      description: 'Meet Teman Pulih: a companionship space blending intuitive counseling, Nusantara sound healing, and body-based practice for communities and institutions.',
      valuesTitle: 'How we work',
      ctaTitle: 'Start with one conversation',
      ctaBody: 'Ask which service suits you or your group best.'
    },
    services: {
      title: 'Services | Intuitive Counseling & Sound Healing | Teman Pulih',
      description: 'Teman Pulih services: Online Intuitive Counseling, Sound Meditation & Grounding, Chakra and Meridian Massage, and private or group Nusantara Sound Healing.',
      h1: 'Services',
      lead: "Choose the kind of support that fits. Not sure yet? Send a message and we'll help you choose.",
      gallery: 'Moments from this service',
      about: 'About this service',
      booking: 'Booking',
      bookingBody: 'Book directly via Lynk or ask first on WhatsApp.',
      upcoming: 'Related events',
      others: 'Other services'
    },
    events: {
      title: 'Events | Sound Healing, Sound Meditation, and Grounding',
      description: 'Teman Pulih event schedule: sound healing, sound meditation, grounding, and open counseling slots. Register via WhatsApp.',
      h1: 'Event schedule',
      lead: 'Open sessions and slots currently available. For community or institutional sessions, get in touch.',
      upcoming: 'Upcoming',
      past: 'Past',
      none: 'No events scheduled yet. Contact us for a private or group session.',
      register: 'Register via WhatsApp',
      registerLink: 'Register now',
      service: 'Service',
      modes: { Online: 'Online', Offline: 'In person', Hybrid: 'Online and in person' }
    },
    products: {
      title: 'Nusantara Singing Bowls & Engraving Service | Teman Pulih',
      description: 'Nusantara singing bowls for meditation and sound healing, plus mallet stick and singing bowl engraving to make yours truly personal.',
      h1: 'Products',
      lead: 'Sound instruments for your daily practice, and an engraving service that gives them an identity.',
      orderWA: 'Order via WhatsApp',
      price: 'Price'
    },
    blog: {
      title: 'Blog | Notes on Sound, Breath, and Recovery',
      description: 'Teman Pulih articles on sound healing, singing bowls, grounding, and intuitive counseling.',
      h1: 'Blog',
      lead: 'Notes on sound, breath, and recovering at a gentler pace.',
      none: 'No articles yet.',
      watch: 'Supporting video from Instagram',
      openIG: 'Open on Instagram',
      cta: 'Want personal support?',
      ctaBody: 'See our services or send a message on WhatsApp.',
      more: 'More articles',
      published: 'Published'
    },
    footer: {
      tagline: 'Companionship, sound healing, and body practice rooted in Nusantara.',
      explore: 'Explore',
      contact: 'Contact',
      rights: 'All rights reserved.',
      instagram: 'Instagram',
      store: 'Lynk store'
    },
    notFound: { title: 'Page not found', body: 'The address you followed is unavailable or has moved.', back: 'Back to home' },
    wa: {
      general: 'Hello Teman Pulih, I would like to ask about your services.',
      service: (n) => `Hello Teman Pulih, I would like to ask about ${n}.`,
      event: (n) => `Hello Teman Pulih, I would like to register for ${n}.`,
      product: (n) => `Hello Teman Pulih, I would like to ask about ${n}.`,
      group: 'Hello Teman Pulih, we are a community/institution and would like to discuss a session for our group.'
    },
    breadcrumbHome: 'Home'
  }
};

export const other = (lang) => (lang === 'id' ? 'en' : 'id');
// Ambil teks dua bahasa; jika bahasa aktif kosong, pakai bahasa lainnya.
export const L = (obj, lang) => (obj && (obj[lang] || obj[other(lang)])) || '';
