/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO CONFIGURATION (`src/data/portfolioData.js`)
 * ============================================================================
 * Seluruh isi website portofolio Yuga Putra Nugraha diatur dari 1 file ini:
 *   1. Identity & Navigation (Home, About, Education, Projects, Sertifikat, Gallery, Comments, Contact)
 *   2. Hero Section
 *   3. About Me (Bio, Dialog Cerita, Foto/Avatar Flip, Status Window Kepribadian & Tech Stack)
 *   4. Education (Riwayat Pendidikan SD -> SMP -> SMK/Pendidikan Lanjutan)
 *   5. Projects (Showcase Proyek dengan Multi-Foto & Lightbox)
 *   6. Sertifikat (Showcase Sertifikat + Zoom Foto Penuh — siap diisi foto sertifikat asli!)
 *   7. Gallery & Moments ( Dokumentasi Momen & Aktivitas — siap diisi foto pribadi!)
 *   8. Comments (Papan Pesan Pengunjung + 7 Peraturan Berkomentar)
 *   9. Contact & Footer
 *
 * CARA MENAMBAHKAN FILE ASLI NANTI:
 * - Foto Profil Asli   -> simpan di folder `public/profile/` lalu ubah `about.portrait.realPhotoUrl`
 * - File CV (PDF)      -> simpan di folder `public/cv/` lalu ubah `identity.cvUrl`
 * - Foto Sertifikat    -> simpan di folder `public/certificates/` lalu ubah `image` pada `certificates.items`
 * - Foto Galeri Momen  -> simpan di folder `public/gallery/` lalu ubah `image` pada `gallery.moments`
 * - Logo/Foto Sekolah  -> simpan di folder `public/education/` lalu ubah `badgeImage` pada `education.levels`
 */

export const portfolioData = {
  // --------------------------------------------------------------------------
  // 1. IDENTITAS & NAVIGASI UTAMA (8 MENU SESUAI REFERENSI)
  // --------------------------------------------------------------------------
  identity: {
    monogram: "YPN",
    fullName: "Yuga Putra Nugraha",
    shortName: "Yuga Putra Nugraha",
    role: "Web & Mobile Developer • UI/UX Enthusiast",
    typingRoles: [
      "Web Developer",
      "UI/UX Designer",
      "Mobile Developer",
      "Fullstack Developer",
    ],
    location: "Bandung, Indonesia",
    statusBadge: "Open to Opportunities",
    cvUrl: "/cv/CV-Yuga-Putra-Nugraha.pdf",
    navigation: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Education", href: "#education" },
      { label: "Projects", href: "#projects" },
      { label: "Sertifikat", href: "#sertifikat" },
      { label: "Gallery", href: "#gallery" },
      { label: "Comments", href: "#comments" },
      { label: "Contact", href: "#contact" },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. HOME / HERO SECTION
  // --------------------------------------------------------------------------
  hero: {
    videoUrl: "/gargantua.mp4", // Latar belakang video Interstellar Gargantua tetap dipertahankan!
    badge: "✦ HII, I'M • WELCOME TO MY DIGITAL SPACE",
    headlineLines: ["Yuga Putra Nugraha"], // Tetap 1 baris utuh (single-line eclipse effect)
    subHeadline:
      "Halo! Aku Yuga Putra Nugraha — seorang pengembang perangkat lunak yang antusias membangun website modern, aplikasi mobile fungsional, serta desain UI/UX yang rapi, interaktif, dan nyaman digunakan.",
    primaryCTA: {
      label: "Explore Projects",
      href: "#projects",
    },
    secondaryCTA: {
      label: "Contact Me",
      href: "#contact",
    },
    cvCTA: {
      label: "Unduh CV",
      href: "/cv/CV-Yuga-Putra-Nugraha.pdf",
    },
    floatingCard: {
      avatarUrl: "/profile/yuga-photo.jpg",
      fallbackAvatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
      title: "Character & Developer Profile",
      description:
        "Fokus pada Web Development, Mobile App, Clean Code & Interactive UI/UX Design.",
      linkLabel: "Kenali Kepribadianku",
      linkHref: "#about",
      secondaryPill: "Passionate Learner • Clean UI Craft",
    },
    statHighlight: {
      number: "12+ Karya",
      description:
        "Eksplorasi proyek aplikasi web, sistem informasi, desain UI/UX & sertifikasi kompetensi.",
      badges: ["Web", "UI", "App", "DB"],
    },
    marqueeItems: [
      "Web Development",
      "Interactive UI/UX",
      "Mobile App Exploration",
      "Clean Architecture",
      "Database Design",
      "Problem Solving",
      "Team Collaboration",
    ],
  },

  // --------------------------------------------------------------------------
  // 3. ABOUT ME (BIO, DIALOG CERITA, FLIP AVATAR & STATUS KEPRIBADIAN)
  // --------------------------------------------------------------------------
  about: {
    sectionTag: "01 • About Me",
    title: "Tentang Aku, Latar Belakang & Karakter Diri.",
    subtitle:
      "Mengenal lebih dekat siapa aku di balik layar kode — mulai dari cerita perjalanan belajar, gaya kerja, hingga hal-hal yang kusukai.",
    portrait: {
      roleLabel: "PETUALANG KODE • CREATIVE DEVELOPER",
      realPhotoUrl: "/profile/yuga-photo.jpg",
      fallbackPhotoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
      caption: "Yuga Putra Nugraha",
      subCaption: "Bandung, Indonesia",
    },
    // Mode Dialog Interaktif (seperti fitur cerita di web teman)
    storyDialogues: [
      "Halo! Selamat datang di ruang portofolioku. Namaku Yuga Putra Nugraha dari Bandung, Indonesia.",
      "Ketertarikanku pada dunia teknologi berawal dari rasa penasaran: bagaimana sebuah baris kode bisa berubah menjadi aplikasi nyata yang membantu banyak orang.",
      "Secara kepribadian, aku tipe orang yang tenang, teliti pada detail visual, senang mengulik hal baru sampai tuntas, dan terbuka berkolaborasi dalam tim.",
      "Bagiku, coding bukan sekadar mengetik sintaks — melainkan seni menggabungkan logika yang kuat dengan tampilan antarmuka yang hidup dan berkarakter!",
    ],
    bioParagraphs: [
      "Halo! Saya Yuga Putra Nugraha, seorang pengembang muda di bidang Rekayasa Perangkat Lunak yang memiliki ketertarikan besar pada dunia pengembangan website modern, aplikasi mobile, dan desain UI/UX. Saya senang membangun aplikasi yang tidak hanya berjalan lancar secara fungsional, tetapi juga sedap dipandang dan nyaman digunakan.",
      "Saat ini saya aktif mendalami ekosistem pengembangan full-stack menggunakan React, Laravel, JavaScript/TypeScript, Tailwind CSS, serta pengelolaan basis data seperti MySQL, PostgreSQL, dan Supabase. Setiap proyek baru selalu saya jadikan tempat untuk melampaui batas kemampuan diri.",
    ],
    // Status Window & Kepribadian (terinspirasi dari Character Status Window web teman)
    statusWindow: {
      windowTitle: "CHARACTER STATUS & PERSONALITY",
      rank: "ACTIVE CREATOR",
      level: "LVL. 21+",
      classRole: "Fullstack & UI Developer",
      academy: "Rekayasa Perangkat Lunak (RPL) • Bandung",
      title: "Explorer of Modern Web & Interactive Systems",
      attributes: [
        {
          code: "INT",
          label: "Logic & Problem Solving",
          value: 94,
          desc: "Kemampuan menganalisis alur sistem, debugging, dan struktur algoritma.",
        },
        {
          code: "SNS",
          label: "UI/UX & Visual Sense",
          value: 95,
          desc: "Kepekaan tata letak, tipografi, animasi interaktif, dan kenyamanan pengguna.",
        },
        {
          code: "AGI",
          label: "Fast Learning & Agility",
          value: 92,
          desc: "Cepat beradaptasi dengan framework dan tools pengembangan terbaru.",
        },
        {
          code: "STA",
          label: "Focus & Consistency",
          value: 96,
          desc: "Ketekunan menyelesaikan fitur dari tahap ide hingga siap digunakan.",
        },
      ],
      loadout: [
        {
          tag: "EQUIPMENT",
          label: "Senjata Utama",
          value: "Laptop Andalan, VS Code & Mechanical Keyboard",
        },
        {
          tag: "ACTIVE BUFF",
          label: "Mood Booster",
          value: "Musik Favorit + Suasana Malam Tenang (+50% Fokus Coding)",
        },
        {
          tag: "PERSONALITY",
          label: "Karakter Diri",
          value: "Rapi, komunikatif di dalam tim, pantang menyerah saat ketemu bug",
        },
        {
          tag: "HOBBIES",
          label: "Di Luar Coding",
          value: "Eksplorasi desain futuristik, gaming, musik, & mengabadikan momen",
        },
      ],
    },
    // Daftar Chip Keahlian (seperti kumpulan skill tag di profil teman)
    skillChips: [
      "Laravel",
      "React.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Flutter & Dart",
      "PHP",
      "Node.js",
      "Python",
      "HTML5 & CSS3",
      "MySQL",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "UI/UX Design",
      "Git & GitHub",
    ],
    // Cincin Orbit Teknologi 3D tetap dipertahankan!
    orbitRings: {
      ring1: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "Laravel",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
        },
        {
          name: "Tailwind",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
      ],
      ring2: [
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "Flutter",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
        },
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
      ],
      ring3: [
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        },
        {
          name: "Supabase",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
        },
        {
          name: "Figma",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // 4. EDUCATION (RIWAYAT PENDIDIKAN — SIAP DISESUAIKAN NAMA SEKOLAH ASLI)
  // --------------------------------------------------------------------------
  education: {
    sectionTag: "02 • Education",
    title: "Riwayat Pendidikan.",
    subtitle:
      "Jejak langkah & lembaran perjalanan akademik yang membentuk fondasi ilmu pengetahuan, logika, dan karakter diri.",
    levels: [
      {
        id: "edu-sd",
        chapter: "CHAPTER 01",
        period: "2014 – 2020",
        institution: "Sekolah Dasar (SD)",
        level: "Pendidikan Dasar • Bandung",
        badgeImage: "/education/sd-logo.png",
        description:
          "Menyelesaikan pendidikan dasar serta membangun fondasi rasa ingin tahu, kedisiplinan, dan semangat belajar sejak dini.",
        highlights: [
          "Membangun dasar membaca, berhitung, dan logika dasar",
          "Belajar bersosialisasi, bekerja sama dengan teman, dan aktif di kegiatan sekolah",
          "Menumbuhkan kedisiplinan serta kebiasaan gemar mencoba hal baru",
        ],
        quote: "“Pendidikan adalah pintu pembuka menuju masa depan yang lebih luas.”",
      },
      {
        id: "edu-smp",
        chapter: "CHAPTER 02",
        period: "2020 – 2023",
        institution: "Sekolah Menengah Pertama (SMP / MTs)",
        level: "Pendidikan Menengah Pertama • Bandung",
        badgeImage: "/education/smp-logo.png",
        description:
          "Masa eksplorasi ilmu pengetahuan baru di mana ketertarikan terhadap dunia komputer, internet, dan teknologi digital mulai tumbuh kuat.",
        highlights: [
          "Mulai tertarik pada dunia komputer, perangkat lunak, dan cara kerja website",
          "Mengasah pola pikir analitis, pemecahan masalah, dan kerja tim",
          "Aktif mengikuti kegiatan organisasi maupun ekstrakurikuler di lingkungan sekolah",
        ],
        quote: "“Setiap langkah kecil hari ini adalah pijakan untuk lompatan besar esok hari.”",
      },
      {
        id: "edu-smk",
        chapter: "CHAPTER 03",
        period: "2023 – Sekarang",
        institution: "SMK — Rekayasa Perangkat Lunak (RPL)",
        level: "Fokus Software Engineering & Web Development • Bandung",
        badgeImage: "/education/smk-logo.png",
        description:
          "Mendalami rekayasa perangkat lunak secara intensif, mulai dari perancangan antarmuka UI/UX, pemrograman web & mobile, hingga manajemen basis data.",
        highlights: [
          "Membangun berbagai proyek aplikasi web modern, sistem informasi, dan antarmuka interaktif",
          "Mendalami React, Laravel, JavaScript, Tailwind CSS, serta arsitektur database SQL/NoSQL",
          "Terus mengasah kesiapan industri melalui proyek kolaborasi, magang/PKL, dan sertifikasi kompetensi",
        ],
        quote: "“Lampaui batasmu melalui karya nyata, baris demi baris kode!”",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 5. PROJECTS (SHOWCASE KARYA + MULTI-FOTO SLIDER & LIGHTBOX)
  // --------------------------------------------------------------------------
  projects: {
    sectionTag: "03 • Projects",
    title: "Peta Karya & Proyek Pilihan.",
    subtitle:
      "Kumpulan proyek aplikasi web dan sistem informasi yang dirancang dengan kode terstruktur, performa cepat, dan UI modern.",
    items: [
      {
        id: "proj-01",
        category: "Web App & LMS",
        year: "2026",
        accentGradient: "from-amber-500/25 via-orange-500/10 to-slate-950/80",
        title: "EduSpace — Platform Kelas Digital & Manajemen Materi",
        summary:
          "Platform Learning Management System (LMS) interaktif untuk mendukung kegiatan belajar mengajar digital, distribusi materi, pengumpulan tugas, dan kuis terpadu.",
        impact:
          "Memudahkan interaksi guru dan siswa dalam satu ruang belajar modern yang responsif di laptop maupun ponsel.",
        image:
          "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=85",
        images: [
          "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
        ],
        techStack: ["Laravel", "React", "Tailwind CSS", "MySQL"],
        demoUrl: "#projects",
        repoUrl: "https://github.com/yugaputranugraha",
      },
      {
        id: "proj-02",
        category: "E-Commerce & POS",
        year: "2025",
        accentGradient: "from-sky-500/25 via-indigo-500/10 to-slate-950/80",
        title: "NexaPOS — Sistem Kasir Digital & Manajemen Inventori",
        summary:
          "Aplikasi Point of Sale (POS) dan pengelolaan stok barang real-time yang dilengkapi fitur keranjang transaksi cepat, laporan penjualan harian, dan cetak struk instan.",
        impact:
          "Mempercepat pencatatan transaksi kasir serta meminimalkan selisih rekap stok harian secara akurat.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
        images: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
        ],
        techStack: ["Laravel", "JavaScript", "Tailwind CSS", "MySQL"],
        demoUrl: "#projects",
        repoUrl: "https://github.com/yugaputranugraha",
      },
      {
        id: "proj-03",
        category: "AI & Productivity",
        year: "2025",
        accentGradient: "from-orange-400/25 via-amber-500/10 to-slate-950/80",
        title: "SmartNote AI — Asisten Rangkuman & Catatan Belajar",
        summary:
          "Aplikasi produktivitas cerdas yang membantu pelajar merangkum catatan panjang, menyusun daftar latihan soal otomatis, dan menyimpan arsip materi di cloud.",
        impact:
          "Membantu proses review materi ujian menjadi 2x lebih terstruktur dan hemat waktu.",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
        ],
        techStack: ["React", "Vite", "Supabase", "AI API"],
        demoUrl: "#projects",
        repoUrl: "https://github.com/yugaputranugraha",
      },
      {
        id: "proj-04",
        category: "Civic & Information System",
        year: "2024",
        accentGradient: "from-emerald-500/20 via-sky-500/10 to-slate-950/80",
        title: "SiWarga — Sistem Informasi Administrasi Lingkungan Terpadu",
        summary:
          "Sistem informasi pengelolaan data warga, pencatatan kas bulanan transparan, pengajuan surat pengantar digital, dan papan pengumuman kegiatan warga.",
        impact:
          "Mendigitalkan proses pencatatan administrasi manual menjadi tertib, transparan, dan mudah diakses.",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
        ],
        techStack: ["PHP", "React", "REST API", "PostgreSQL"],
        demoUrl: "#projects",
        repoUrl: "https://github.com/yugaputranugraha",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 6. SERTIFIKAT (SERTIFIKAT ASLI MILIK YUGA PUTRA NUGRAHA)
  // --------------------------------------------------------------------------
  certificates: {
    sectionTag: "04 • Sertifikat",
    title: "Sertifikat & Akreditasi Kompetensi.",
    subtitle:
      "Official Seals of Mastery — bukti dedikasi pembelajaran, kelulusan program resmi, dan penguasaan teknologi.",
    items: [
      {
        id: "cert-ai-ready-asean",
        issuer: "ASEAN Foundation • Supported by Google.org",
        badge: "ARTIFICIAL INTELLIGENCE",
        date: "25 Agustus 2026",
        title: "AI Ready ASEAN — Certificate of Completion",
        description:
          "Sertifikat kelulusan resmi program pembelajaran Artificial Intelligence (12 jam pelatihan intensif) dari ASEAN Foundation dengan dukungan Google.org pada platform AIClassASEAN.org.",
        image: "/certificates/ai-ready-asean-page1.png",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 7. GALLERY & MOMENTS (SIAP DIISI FOTO PRIBADI / KEGIATAN YUGA!)
  // --------------------------------------------------------------------------
  gallery: {
    sectionTag: "05 • Gallery & Moments",
    title: "Gallery & Moments.",
    subtitle:
      "Tangkapan lensa di sela waktu coding, diskusi tim, kegiatan sekolah, & eksplorasi sehari-hari.",
    moments: [
      {
        id: "mom-01",
        code: "Momen 01",
        category: "Coding & Workspace",
        location: "Bandung",
        date: "2026",
        title: "Fokus Merakit Baris Kode di Malam Hari",
        description:
          "Suasana meja kerja saat merancang antarmuka interaktif dan menyelesaikan fitur aplikasi ditemani secangkir minuman hangat.",
        image: "/gallery/momen-1.jpg",
        fallbackImage:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85",
      },
      {
        id: "mom-02",
        code: "Momen 02",
        category: "Team Collaboration",
        location: "Bandung",
        date: "2025",
        title: "Diskusi & Kolaborasi Proyek Bersama Teman",
        description:
          "Bertukar ide, membedah alur database, dan saling bantu mencari solusi bug bersama rekan satu tim.",
        image: "/gallery/momen-2.jpg",
        fallbackImage:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85",
      },
      {
        id: "mom-03",
        code: "Momen 03",
        category: "UI/UX Exploration",
        location: "Creative Session",
        date: "2025",
        title: "Eksplorasi Desain Antarmuka & Animasi Web",
        description:
          "Menguji perpaduan warna futuristik, tipografi, dan transisi mikro agar pengalaman pengguna terasa hidup.",
        image: "/gallery/momen-3.jpg",
        fallbackImage:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85",
      },
      {
        id: "mom-04",
        code: "Momen 04",
        category: "Presentation & Demo",
        location: "Bandung",
        date: "2025",
        title: "Presentasi & Demo Hasil Proyek Aplikasi",
        description:
          "Momen mempresentasikan hasil karya aplikasi yang telah dibangun dari nol hingga siap diuji coba langsung.",
        image: "/gallery/momen-4.jpg",
        fallbackImage:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 8. COMMENTS / GUESTBOOK BOARD (PAPAN PESAN + 7 PERATURAN KOMENTAR)
  // --------------------------------------------------------------------------
  comments: {
    sectionTag: "06 • Comments",
    boardTitle: "SPACE STATION NOTICE BOARD",
    boardSubtitle: "Pesan, sapaan & dukungan dari para pengunjung yang singgah di portofolioku.",
    callsignRoles: [
      "Visitor",
      "Teman",
      "Developer",
      "UI/UX Enthusiast",
      "Recruiter",
    ],
    rulesTitle: "PERATURAN SEBELUM BERKOMENTAR",
    rulesSubtitle:
      "Sebelum meninggalkan komentar, yuk baca beberapa aturan berikut agar kolom komentar tetap nyaman buat semua orang!",
    rules: [
      {
        num: "01",
        title: "Gunakan Bahasa yang Sopan",
        desc: "Bebas mau pakai bahasa santai atau formal, yang penting tetap sopan dan menghargai orang lain.",
      },
      {
        num: "02",
        title: "Berikan Komentar yang Positif",
        desc: "Boleh memberikan pujian, saran, atau kritik yang membangun agar bisa jadi bahan evaluasi ke depannya.",
      },
      {
        num: "03",
        title: "Jangan Mengandung SARA atau Ujaran Kebencian",
        desc: "Hindari komentar yang menyinggung suku, agama, ras, golongan, atau menyerang orang lain.",
      },
      {
        num: "04",
        title: "Hargai Pendapat Orang Lain",
        desc: "Setiap orang punya pendapat masing-masing. Sampaikan pendapat dengan baik tanpa merendahkan orang lain.",
      },
      {
        num: "05",
        title: "Hindari Spam dan Promosi",
        desc: "Jangan mengirim komentar berulang kali atau menyisipkan iklan dan promosi yang tidak relevan.",
      },
      {
        num: "06",
        title: "Jaga Privasi",
        desc: "Jangan mencantumkan informasi pribadi seperti nomor telepon, alamat rumah, atau data sensitif lainnya.",
      },
      {
        num: "07",
        title: "Jadilah Diri Sendiri",
        desc: "Tinggalkan komentar yang jujur dan tulus. Nggak harus panjang, yang penting bermakna!",
      },
    ],
    seedComments: [
      {
        id: "seed-1",
        author: "Rekan Developer",
        role: "Developer",
        message:
          "Keren banget konsep pintu bunker luar angkasanya Yuga! Transisi pas diklik mulus dan background Gargantua-nya bikin betah eksplorasi.",
        createdAt: Date.now() - 1000 * 60 * 45,
      },
      {
        id: "seed-2",
        author: "Anonymous Guest",
        role: "Visitor",
        message:
          "Semangat terus berkarya dan ngodingnya! Tampilan portofolionya futuristik dan rapi banget.",
        createdAt: Date.now() - 1000 * 60 * 60 * 5,
      },
      {
        id: "seed-3",
        author: "Teman Seperjuangan",
        role: "Teman",
        message:
          "Mantap Yuga! Sukses terus buat project-project web sama UI/UX ke depannya 🔥✨",
        createdAt: Date.now() - 1000 * 60 * 60 * 22,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 9. CONTACT & FOOTER
  // --------------------------------------------------------------------------
  contact: {
    sectionTag: "07 • Contact Me",
    title: "Mari Terhubung & Mulai Kolaborasi.",
    subtitle:
      "Punya ide proyek menarik, tawaran kolaborasi, magang, atau sekadar ingin berdiskusi seputar web development & desain UI? Pintu komunikasi selalu terbuka!",
    responseSLA: "Respons Cepat • Bandung, Indonesia",
    directChannels: {
      location: "Bandung, Indonesia",
      email: "yugapn21@gmail.com",
      whatsappNumber: "6285861470747",
      whatsappDisplay: "+62 858 6147 0747",
      whatsappDefaultMessage:
        "Halo Yuga! Saya baru saja mengunjungi website portofolio kamu dan ingin berbincang lebih lanjut.",
      instagramUrl: "https://instagram.com/yugaputranugraha",
      instagramHandle: "@yugaputranugraha",
      linkedinUrl: "https://linkedin.com/in/yugaputranugraha",
      linkedinHandle: "linkedin.com/in/yugaputranugraha",
      githubUrl: "https://github.com/yugaputranugraha",
      githubHandle: "github.com/yugaputranugraha",
    },
    footer: {
      copyrightName: "Yuga Putra Nugraha",
      closingQuote:
        "Sebuah perjalanan kecil untuk terus belajar dan menciptakan sesuatu yang berarti. Terima kasih telah singgah di ruang portofolioku.",
    },
  },
};

export default portfolioData;
