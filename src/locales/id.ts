import type { Locale, Passage } from '../i18n';

const ui: Locale['ui'] = {
  'app.tagline': 'Beberapa menit sehari untuk pikiran yang lebih tajam',
  'home.how': 'Berlatih setiap hari dan ukur dirimu untuk melihat kemajuanmu',
  'onboard.title': 'Selamat datang!',
  'onboard.ask': 'Siapa namamu?',
  'onboard.placeholder': 'Namamu',
  'onboard.go': 'Ayo mulai',

  'landing.heroTitle': 'Latih pikiranmu beberapa menit sehari',
  'landing.heroSub': '35 latihan kognitif berbasis neurosains untuk meningkatkan daya ingat, fokus, kecepatan berhitung, dan refleks. 100% gratis, tanpa iklan, tanpa akun atau kata sandi.',
  'landing.badgeFree': '100% Gratis',
  'landing.badgePrivacy': 'Privasi total · Data lokal',
  'landing.badgeScience': 'Berbasis sains',
  'landing.badgeOpenSource': 'Sumber terbuka',
  'landing.startCardTitle': 'Mulai latihan sekarang',
  'landing.startCardDesc': 'Tanpa perlu mendaftar. Masukkan nama untuk menyesuaikan pengalamanmu dan menyimpan kemajuan di browser.',
  'landing.guestBtn': 'Atau main sebagai Tamu',
  'landing.guestName': 'Tamu',
  'landing.guideBtn': '📖 Panduan & Instruksi',
  'landing.howItWorks': 'Cara Kerja Synapse Dojo',
  'landing.pillar1Title': 'Latihan Harian',
  'landing.pillar1Desc': '4 latihan pilihan setiap hari yang beradaptasi dengan tingkat keahlianmu. Sekitar 10 menit.',
  'landing.pillar2Title': 'Neuro Score Harian',
  'landing.pillar2Desc': 'Uji cepat 3 menit pada 4 kemampuan inti untuk mengukur kemajuan kognitif secara objektif.',
  'landing.pillar3Title': 'Gym Bebas (17 Game)',
  'landing.pillar3Desc': 'Berlatih bebas di seluruh 8 domain kognitif kapan saja untuk memecahkan rekor terbaikmu.',
  'landing.domainsTitle': '8 Domain Kognitif yang Dilatih',
  'landing.guideCtaTitle': 'Ingin tahu cara kerja dan sains di balik setiap game?',
  'landing.guideCtaDesc': 'Pelajari panduan mendalam kami tentang dasar ilmiah, manfaat, dan aturan untuk ke-35 latihan.',
  'landing.guideCtaBtn': 'Baca Panduan Lengkap',
  'landing.footerTagline': 'Synapse Dojo · Latihan kognitif gratis',

  'guide.title': 'Panduan & Petunjuk',
  'guide.subtitle': 'Cara kerja Synapse Dojo, ulasan menu aplikasi, dan penjelasan rinci 35 latihan kognitif',
  'guide.navSections': 'Bagian-bagian Aplikasi',
  'guide.introH': 'Mengapa melatih otak?',
  'guide.introP': 'Otak manusia memiliki kapasitas luar biasa untuk mengatur ulang dan membentuk koneksi sinaptik baru sepanjang hidup: ini disebut neuroplastisitas. Sama seperti olahraga menjaga kebugaran tubuh, menantang fungsi mental secara teratur membantu menjaga ketajaman berpikir, konsentrasi, dan daya ingat. Synapse Dojo dirancang sebagai latihan harian yang ringkas dan memicu semangat.',
  'guide.planH': '🏋️ Latihan Harian (Plan)',
  'guide.planP': 'Setiap hari Synapse Dojo menyusun 4 latihan seimbang dari berbagai domain (kecepatan, memori, kendali eksekutif, dan penalaran). Latihan ini adaptif: jika jawabanmu benar tingkat kesulitan akan naik, dan jika salah akan disesuaikan agar kamu selalu berada di zona stimulasi terbaik. Menyelesaikan latihan akan menambah rentetan hari dan memberimu poin XP.',
  'guide.checkH': '📏 Ukur Neuro Score (Uji Harian)',
  'guide.checkP': 'Neuro Score adalah tolok ukur harian standar sekitar 4–5 menit yang menguji seluruh 9 domain kognitif otak (Kecepatan Pemrosesan, Perhatian, Kendali Eksekutif, Memori Kerja, Memori Jangka Panjang, Spasial, Penalaran Logis, Bahasa & Berhitung, serta Koordinasi Bilateral), dengan memilih latihan yang bergilir setiap hari untuk tiap domain. Skor harianmu (0–1000) memberikan tolok ukur komprehensif untuk memantau ketajaman mentalmu dari waktu ke وقت.',
  'guide.trainingH': '🧩 Gym Bebas (35 Latihan)',
  'guide.trainingP': 'Di bagian Gym, kamu memiliki akses tanpa batas ke seluruh 35 latihan yang dikelompokkan berdasarkan kemampuan. Gunakan untuk memperkuat kelemahan tertentu atau melampaui rekor pribadimu.',
  'guide.progressH': '📈 Kemajuan & Statistik',
  'guide.progressP': 'Pantau profil kognitif radar pada 8 keahlian, grafik riwayat Neuro Score, lencana pencapaian yang terbuka, dan kalender latihan bulanan.',
  'guide.settingsH': '⚙️ Pengaturan & Privasi',
  'guide.settingsP': 'Sesuaikan kenyamananmu: tema terang, gelap, atau kontras tinggi, suara dan getaran, ukuran teks, serta pencadangan data. Synapse Dojo menyimpan semua data secara lokal di browsermu: kamu bisa mengekspor cadangan JSON atau memindahkannya ke perangkat lain kapan saja.',
  'guide.gamesH': 'Rincian Lengkap 35 Latihan Kognitif',
  'guide.gameWhy': 'Tujuan dan Manfaat Ilmiah:',
  'guide.gameHow': 'Cara Bermain dan Aturan:',
  'guide.faqH': 'Tips & Tanya Jawab Umum (FAQ)',
  'guide.faq1Q': 'Berapa lama saya harus berlatih setiap hari?',
  'guide.faq1A': 'Konsistensi adalah kuncinya. Cukup 10 hingga 15 menit sehari (latihan harian ditambah Neuro Score). Berlatih 4 hingga 5 hari seminggu jauh lebih efektif daripada satu sesi panjang yang jarang.',
  'guide.faq2Q': 'Di mana data dan nilai saya disimpan?',
  'guide.faq2A': 'Semuanya 100% tersimpan di perangkatmu sendiri. Synapse Dojo tidak menggunakan server pelacak, tidak memerlukan akun atau kata sandi, dan tidak menggunakan cookie pelacak. Semuanya aman di localStorage browsermu.',
  'guide.faq3Q': 'Apakah ada uji coba latihan sebelum game dimulai?',
  'guide.faq3A': 'Ya! Sebelum setiap latihan dimulai, ada petunjuk singkat dan sesi latihan percobaan (Trial) terpandu agar kamu terbiasa dengan kontrolnya tanpa rasa cemas.',

  'home.hello': 'Hai, {name}!',
  'home.streak': '{n} hari berturut-turut',
  'home.streak1': '1 hari berturut-turut',
  'home.streak0': 'Mulai rangkaianmu hari ini',
  'home.check': 'Ukur Neuro Score-mu',
  'home.checkSub': 'Uji seluruh 9 domain kognitif · sekitar 4 menit · pantau ketajaman mentalmu',
  'home.checkDone': 'Selesai hari ini: {score}',
  'home.training': 'Gym',
  'home.trainingSub': 'Semua latihan, dikelompokkan menurut kemampuan',
  'home.progress': 'Kemajuan',
  'home.progressSub': 'Profil kemampuan, level, dan kalender',
  'home.settings': 'Pengaturan',

  'plan.title': 'Latihan harian',
  'plan.titleN': 'Latihan harian {n}',
  'plan.again': 'Latihan lagi',
  'plan.againSub': 'Masih semangat? Ketuk untuk 4 latihan baru pada kemampuan lain',
  'plan.sub': '{n} latihan dipilih untukmu · menyesuaikan dengan levelmu · sekitar {min} menit',
  'plan.progress': '{done}/{n} selesai',
  'plan.step': 'Latihan {i} dari {n}',
  'plan.done': 'Latihan harian selesai!',
  'plan.doneSub': 'Kerja bagus! Kalau masih ingin lagi, mulai latihan lain sekarang juga, dengan latihan yang berbeda.',

  'common.back': 'Kembali',
  'common.start': 'Mulai!',
  'common.quit': 'Keluar',
  'common.retry': 'Coba lagi',
  'common.menu': 'Menu',
  'common.next': 'Berikutnya',
  'common.continue': 'Lanjut',
  'common.best': 'Rekor',
  'common.newBest': 'Rekor baru!',
  'common.level': 'Level',
  'common.levelChange': 'Level: {from} → {to}',
  'common.why': 'Mengapa ini berhasil',
  'common.timeout': 'Waktu habis',
  'common.step': 'Tes {i} dari {n}',
  'common.correct': '{ok}/{n} benar',

  'domain.speed': 'Kecepatan',
  'domain.attention': 'Perhatian',
  'domain.wm': 'Memori kerja',
  'domain.memory': 'Memori',
  'domain.executive': 'Kontrol',
  'domain.spatial': 'Spasial',
  'domain.reasoning': 'Penalaran',
  'domain.language': 'Hitung dan baca',

  'ex.glance.name': 'Sekilas',
  'ex.glance.desc': 'Sesaat muncul sebuah kendaraan di tengah dan sebuah bintang di dekat tepi. Sebutkan kendaraan apa itu dan di mana bintangnya. Waktu tampilnya makin singkat seiring kamu makin baik.',
  'ex.glance.why': 'Melatih “bidang pandang berguna”: menangkap lebih banyak dalam satu pandangan. Latihan jenis ini dipakai dalam studi ACTIVE, di mana latihan kecepatan pemrosesan dikaitkan dengan risiko demensia yang lebih rendah setelah 10 tahun.',
  'ex.glance.which': 'Kendaraan apa yang ada di tengah?',
  'ex.glance.where': 'Di mana bintangnya?',
  'ex.glance.detail': 'Ambang: {ms} md',

  'ex.reflex.name': 'Refleks pilihan',
  'ex.reflex.desc': 'Salah satu dari empat panel menyala. Jika hijau, segera ketuk; jika merah, jangan sentuh apa pun!',
  'ex.reflex.why': 'Waktu reaksi pilihan dengan sinyal yang harus diabaikan (go/no-go): menggabungkan kecepatan dengan kendali atas respons otomatis.',
  'ex.reflex.hint': 'Hijau: ketuk · Merah: diam',
  'ex.reflex.detail': 'Reaksi rata-rata: {ms} md · {ok}/{n} benar',

  'ex.path.name': 'Jejak angka',
  'ex.path.desc': 'Ketuk lingkaran secara berurutan. Di level tinggi kamu bergantian antara angka dan huruf: 1 → A → 2 → B → 3 …',
  'ex.path.why': 'Versi dari Trail Making Test, yang dipakai dalam neuropsikologi untuk mengukur pencarian visual cepat dan, dalam bentuk bergantian, fleksibilitas mental.',
  'ex.path.next': 'Berikutnya: {v}',
  'ex.path.detail': '{secs} dtk · {err} kesalahan',

  'ex.pilot.name': 'Pilot',
  'ex.pilot.desc': 'Kemudikan dengan menggeser (atau dengan tombol panah) agar tetap di jalan. Sementara itu, tekan SINYAL hanya saat lingkaran hijau lewat.',
  'ex.pilot.why': 'Terinspirasi oleh NeuroRacer (University of California, San Francisco): dalam studi yang terbit di Nature, latihan multitasking adaptif mengurangi beban melakukan dua hal sekaligus, dan efeknya bertahan 6 bulan.',
  'ex.pilot.press': 'SINYAL!',
  'ex.pilot.detail': 'Sinyal benar: {ok}/{n} · di jalan {road}%',

  'ex.radar.name': 'Radar',
  'ex.radar.desc': 'Beberapa bola menyala: itulah targetnya. Lalu semuanya jadi sama dan bergerak. Ikuti dengan matamu dan ketuk targetnya di akhir.',
  'ex.radar.why': 'Pelacakan banyak objek: mengikuti beberapa objek yang bergerak melatih perhatian yang tersebar di ruang, seperti yang kamu pakai di lalu lintas atau keramaian.',
  'ex.radar.watch': 'Ingat targetnya',
  'ex.radar.track': 'Ikuti mereka…',
  'ex.radar.pick': 'Ketuk {n} target',
  'ex.radar.detail': 'Target: hingga {n} · {ok}/{t} ronde benar',

  'ex.clash.name': 'Bentrok warna',
  'ex.clash.desc': 'Lihat aturan di atas: ketuk WARNA tinta atau ARTI kata. Waktu untuk menjawab makin singkat seiring kamu makin baik.',
  'ex.clash.why': 'Efek Stroop: menahan respons otomatis (membaca) untuk memberi jawaban yang diminta. Melatih inhibisi, salah satu fungsi eksekutif utama.',
  'ex.clash.ruleInk': '🎨 Warna tinta',
  'ex.clash.ruleWord': '📖 Arti kata',

  'ex.switch.name': 'Ganti aturan',
  'ex.switch.desc': 'Sebuah angka muncul. Jika bingkainya BIRU, katakan apakah genap atau ganjil. Jika ORANYE, apakah lebih kecil atau lebih besar dari 5. Aturannya berganti tanpa peringatan!',
  'ex.switch.why': 'Pergantian tugas: melompat cepat antar aturan. Latihan mengurangi “biaya pergantian”, bahkan pada tugas yang tidak dilatih; orang lanjut usia sering paling banyak membaik.',
  'ex.switch.parity': 'GENAP atau GANJIL?',
  'ex.switch.size': 'LEBIH KECIL atau LEBIH BESAR dari 5?',
  'ex.switch.even': 'GENAP',
  'ex.switch.odd': 'GANJIL',
  'ex.switch.detail': '{ok}/{n} · biaya pergantian {cost} md',

  'ex.echo.name': 'Gema',
  'ex.echo.desc': 'Satu kotak menyala setiap kali. Untuk setiap kotak, tanyakan: apakah di tempat yang sama dengan yang N langkah sebelumnya? Jika ya tekan POSISI, jika tidak jangan tekan apa pun. Kamu mulai dengan N = 1, yaitu kotak tepat sebelumnya; nanti ditambah huruf, yang dibandingkan dengan cara yang sama.',
  'ex.echo.why': 'n-back: membandingkan setiap item dengan yang N langkah sebelumnya. Ini tugas memori kerja yang paling banyak diteliti; peningkatannya kuat pada tugas yang mirip dan kurang pasti pada yang jauh berbeda.',
  'ex.echo.before': 'Sebelum',
  'ex.echo.now': 'Sekarang',
  'ex.echo.ago': '{n} sebelumnya',
  'ex.echo.demo1': 'Sebuah kotak menyala: belum ada pembandingnya, tunggu saja.',
  'ex.echo.demo2': 'Berbeda dari sebelumnya → jangan tekan apa pun.',
  'ex.echo.demo3': 'Sama dengan sebelumnya → tekan POSISI!',
  'ex.echo.demo4': 'Berbeda lagi → jangan tekan. Dan seterusnya.',
  'ex.echo.stripWait': 'Ingat ini: kamu akan membandingkannya dengan yang berikutnya.',
  'ex.echo.stripCompare': 'Apakah kotak yang menyala SEKARANG di tempat yang sama dengan yang disorot? Jika ya, tekan POSISI.',
  'ex.echo.stripCompareDual': 'Bandingkan SEKARANG dengan yang disorot: kotak sama → POSISI, huruf sama → HURUF.',
  'ex.echo.back1': 'yang tepat sebelumnya',
  'ex.echo.backN': 'yang {n} langkah sebelumnya',
  'ex.echo.dualTitle': 'Mulai sekarang ganda!',
  'ex.echo.dualText': 'Selain kotak, kamu akan mendengar sebuah huruf yang juga tertulis di dalam kotak. Tekan POSISI jika kotaknya cocok dengan {back} dan HURUF jika hurufnya cocok dengan {back}. Keduanya, salah satu, atau tidak ada yang bisa cocok.',
  'ex.echo.series': 'Seri {i} dari {n}',
  'ex.echo.seriesStart1': 'Seri ini punya {len} kotak. Yang pertama hanya untuk diingat: jangan tekan. Mulai dari yang kedua, bandingkan setiap kotak dengan yang tepat sebelumnya.',
  'ex.echo.seriesStartN': 'Seri ini punya {len} kotak. {k} yang pertama hanya untuk diingat: jangan tekan. Lalu bandingkan setiap kotak dengan yang {k} langkah sebelumnya.',
  'ex.echo.turnWait': 'Kotak {i} dari {len} · ingat, jangan tekan',
  'ex.echo.turnAsk': 'Kotak {i} dari {len} · sama dengan {back}?',
  'ex.echo.turnAskDual': 'Kotak {i} dari {len} · tempat sama? huruf sama? (dibanding {back})',
  'ex.echo.seriesEnd': 'Akhir seri {i} dari {n}',
  'ex.echo.seriesScore': 'Akurasi: {acc}% · kecocokan tertangkap {hit} dari {targets} · tekanan salah {fa}',
  'fb.echoNotSame': 'jangan tekan (tadi berbeda)',
  'fb.echoNotSameLetter': 'jangan tekan (hurufnya berbeda)',
  'fb.echoMissed': 'tekan {btn} (tadi sama)',
  'ex.echo.pos': 'Posisi',
  'ex.echo.letter': 'Huruf',
  'ex.echo.rule1': '1-back · bandingkan dengan yang tepat sebelumnya',
  'ex.echo.ruleDual': '{n}-back ×2 · bandingkan kotak dan huruf dengan {back}',
  'ex.echo.rule': '{n}-back · bandingkan dengan {n} langkah sebelumnya',
  'ex.echo.block': 'Blok {i}: akurasi {acc}% (tepat dikurangi alarm palsu)',

  'ex.grid.name': 'Kisi cahaya',
  'ex.grid.desc': 'Perhatikan kotak-kotak menyala lalu ulangi urutannya. Hati-hati: kadang kamu harus mengulanginya terbalik!',
  'ex.grid.why': 'Tes Corsi: mengingat urutan dalam ruang, maju dan mundur. Mengukur dan melatih memori kerja visuospasial.',
  'ex.grid.watch': 'Perhatikan…',
  'ex.grid.yours': 'Giliranmu! ({n} kotak)',
  'ex.grid.back': 'TERBALIK! ({n} kotak)',
  'ex.grid.span': 'Urutan terpanjang: {n}',
  'ex.grid.detail': 'Rentang maju {f} · mundur {b}',

  'ex.digits.name': 'Angka terakhir',
  'ex.digits.desc': 'Deretan angka dengan panjang tak terduga lewat. Saat berhenti, ketik N angka terakhir dalam urutan yang benar.',
  'ex.digits.why': 'Running span: hanya mengingat angka-angka terakhir dari deretan yang terus diperbarui. Melatih pembaruan memori kerja.',
  'ex.digits.watch': 'Ingat {n} terakhir',
  'ex.digits.recall': 'Ketik {n} angka terakhir',
  'ex.digits.detail': '{ok}/{n} benar · rentang {span}',

  'ex.rotate.name': 'Rotasi',
  'ex.rotate.desc': 'Apakah kedua bentuk itu bentuk yang sama yang diputar, atau yang satu adalah bayangan cermin yang lain?',
  'ex.rotate.why': 'Rotasi mental. Meta-analisis 217 studi menunjukkan kemampuan spasial membaik dengan latihan, secara bertahan lama dan juga pada tugas serupa yang tidak dilatih.',
  'ex.rotate.same': 'Sama',
  'ex.rotate.mirror': 'Cermin',

  'ex.towers.name': 'Menara',
  'ex.towers.desc': 'Pindahkan bola agar sama dengan target dengan langkah sesedikit mungkin. Ketuk tiang untuk mengambil bola paling atas, lalu ketuk tempat menaruhnya. Pikirkan dulu sebelum bergerak!',
  'ex.towers.why': 'Menara London: merencanakan urutan langkah sebelum bertindak. Tes klasik untuk perencanaan, salah satu fungsi eksekutif.',
  'ex.towers.goal': 'Target',
  'ex.towers.moves': 'Langkah: {m} · minimum: {min}',
  'ex.towers.too': 'Terlalu banyak langkah',
  'ex.towers.detail': 'Selesai dengan langkah minimum: {ok}/{n}',

  'ex.odd.name': 'Yang berbeda',
  'ex.odd.desc': 'Semua bentuk kecuali satu punya satu ciri yang sama (bentuk, warna, isian, atau jumlah). Temukan yang tidak.',
  'ex.odd.why': 'Penalaran induktif: menemukan aturan bersama yang tersembunyi di antara perbedaan yang tidak penting. Tugas serupa ada dalam rangkaian tes Cambridge Brain Sciences.',
  'ex.odd.ask': 'Mana yang berbeda?',

  'ex.math.name': 'Sprint hitung',
  'ex.math.desc': 'Selesaikan soal secepat mungkin. Jawabanmu terkirim begitu semua angkanya diketik.',
  'ex.math.why': 'Banyak hitungan sederhana yang dikerjakan cepat: prinsip “terapi belajar” yang diteliti kelompok Kawashima, yang menunjukkan peningkatan perhatian, inhibisi, dan kecepatan pada orang lanjut usia.',
  'ex.math.detail': '{ok}/{n} · {secs} dtk',

  'ex.reading.name': 'Membaca cepat',
  'ex.reading.desc': 'Bacalah teksnya DENGAN SUARA KERAS, secepat mungkin sambil tetap jelas. Lalu jawab satu pertanyaan.',
  'ex.reading.why': 'Membaca keras: separuh lainnya dari “terapi belajar” kelompok Kawashima. Pertanyaan terakhir memastikan kamu benar-benar membacanya.',
  'ex.reading.aloud': '🗣️ Baca keras-keras',
  'ex.reading.done': 'Selesai',
  'ex.reading.detail': '{wpm} kata/menit · pemahaman {ok}/{n}',

  'ex.vault.name': 'Brankas kata',
  'ex.vault.desc': 'Hafalkan kata-katanya. Lalu aku tunjukkan lebih banyak: katakan apakah tiap kata sudah pernah kamu lihat atau baru.',
  'ex.vault.why': 'Memori pengenalan: membedakan yang sudah dilihat dari yang baru. Melatih memori episodik.',
  'ex.vault.study': 'Hafalkan kata-kata ini',
  'ex.vault.done': 'Selesai',
  'ex.vault.seen': 'Pernah',
  'ex.vault.new': 'Baru',
  'ex.vault.result': '{n}/{t} benar',

  'ex.pairs.name': 'Pasangan',
  'ex.pairs.desc': 'Kamu akan melihat beberapa pasangan berupa simbol dan kata, misalnya 🍎 🔗 palu. Hafalkan. Lalu hanya simbolnya yang muncul dan kamu memilih kata pasangannya. Tidak ada suara: semuanya visual.',
  'ex.pairs.why': 'Asosiasi berpasangan: mengaitkan dua hal adalah salah satu tugas memori episodik yang paling peka.',
  'ex.pairs.study': 'Setiap simbol punya katanya: ingat mana dengan mana',
  'ex.pairs.tip': 'Nanti kamu hanya melihat simbolnya dan memilih katanya. Tips: bayangkan adegan yang menyatukan keduanya, misalnya {sym} + “{word}”.',
  'ex.pairs.timer': '⏱ {s} detik',
  'ex.pairs.ask': 'Dengan kata apa simbol ini berpasangan?',
  'ex.pairs.detail': '{ok}/{n} pasangan diingat',

  'color.red': 'MERAH',
  'color.blue': 'BIRU',
  'color.green': 'HIJAU',
  'color.yellow': 'KUNING',

  'result.title': 'Hasil',
  'check.title': 'Neuro Score-mu',
  'check.delta': '{d} sejak terakhir kali',
  'check.first': 'Pengukuran pertama tercatat. Kembali lagi besok!',
  'check.doneToday': 'Kamu sudah mengukur hari ini. Kembali besok untuk mengukur lagi!',

  'rank.0': 'Percikan',
  'rank.1': 'Arus',
  'rank.2': 'Sirkuit',
  'rank.3': 'Jaringan saraf',
  'rank.4': 'Master sinapsis',

  'training.title': 'Gym',
  'training.today': 'Selesai hari ini',

  'progress.title': 'Kemajuan',
  'progress.chart': 'Neuro Score',
  'progress.empty': 'Lakukan pengukuran harian pertamamu untuk melihat grafiknya.',
  'progress.calendar': '4 minggu terakhir',
  'progress.domains': 'Profil kemampuan',
  'progress.domainsHint': 'Berdasarkan level yang dicapai di setiap latihan.',
  'progress.exercises': 'Level dan rekor',
  'progress.none': '—',
  'progress.stats': 'Hari aktif: {days} · Sesi: {runs}',
  'progress.week': 'Minggu ini: {n}/4 hari latihan',

  'settings.title': 'Pengaturan',
  'settings.name': 'Nama',
  'settings.lang': 'Bahasa',
  'settings.sound': 'Efek suara',
  'settings.relaxed': 'Tempo santai (lebih banyak waktu untuk menjawab)',
  'settings.bigText': 'Teks besar',
  'settings.reset': 'Hapus semua data',
  'settings.resetConfirm': 'Yakin ingin menghapus semua kemajuan? Ini tidak bisa dibatalkan.',
  'ex.glance.example': 'Contoh: 🚗 di tengah dan bintang di kanan atas → jawab 🚗, lalu ketuk kotak kanan atas.',
  'ex.reflex.example': 'Contoh: panel hijau menyala → segera ketuk. Jika merah → jangan sentuh apa pun dan tunggu.',
  'ex.path.example': 'Contoh: ketuk 1, lalu 2, lalu 3… Dalam versi bergantian: 1 → A → 2 → B → 3 → C.',
  'ex.pilot.example': 'Contoh: geser untuk mengikuti jalan. Lingkaran hijau lewat → tekan SINYAL. Segitiga atau persegi → abaikan.',
  'ex.radar.example': 'Contoh: 2 bola menyala → ikuti dengan matamu saat bercampur dengan yang lain, lalu ketuk tepat 2 bola itu.',
  'ex.clash.example': 'Contoh: kata MERAH ditulis dengan warna biru → dengan aturan 🎨 jawab BIRU, dengan aturan 📖 jawab MERAH.',
  'ex.switch.example': 'Contoh: 7 dalam bingkai biru → GANJIL. Angka 7 yang sama dalam bingkai oranye → LEBIH BESAR dari 5.',
  'ex.echo.example': 'Contoh 1-back: kotak atas menyala dan tepat setelahnya kotak yang sama lagi → tekan POSISI. Jika kotak lain → jangan tekan.',
  'ex.grid.example': 'Contoh: 1 → 2 → 3 menyala. Ketuk 1, 2, 3. Jika tertulis TERBALIK, ketuk 3, 2, 1.',
  'ex.digits.example': 'Contoh: 4 8 1 7 2 9 lewat dan kamu harus mengingat 3 terakhir → ketik 7 2 9.',
  'ex.vault.example': 'Contoh: kamu menghafal “pohon” dan “perahu”. Muncul “pohon” → Pernah. Muncul “cangkir” → Baru.',
  'ex.pairs.example': 'Contoh: kamu melihat pasangan 🍎 – palu. Nanti muncul 🍎 → pilih “palu”.',
  'ex.rotate.example': 'Contoh: jika memutar bentuk kanan menghasilkan bentuk kiri → Sama. Jika kamu butuh cermin → Cermin.',
  'ex.towers.example': 'Contoh: target punya merah di atas tapi sekarang biru menutupinya → pindahkan biru dulu, lalu taruh merah di tempatnya.',
  'ex.odd.example': 'Contoh: tiga lingkaran merah penuh dan satu lingkaran biru penuh → yang berbeda adalah yang biru (satu-satunya warna lain).',
  'ex.math.example': 'Contoh: 7 + 8 = → ketik 15. Jawaban terkirim begitu semua angkanya diketik.',
  'ex.reading.example': 'Contoh: baca teksnya keras-keras, tekan “Selesai”, lalu jawab pertanyaan tentangnya.',
  'fb.pilotRoad': 'tetap di jalan saat tanda mendekat',
  'fb.pilotMissed': 'itu lingkaran hijau: tekan SINYAL',
  'fb.pilotNotTarget': 'tekan hanya untuk lingkaran hijau',
  'fb.pilotStray': 'tidak ada tanda terlihat: tunggu lingkaran hijau',
  'fb.oddHere': 'yang disorot hijau',
  'fb.gridOrder': 'urutan bernomor pada kotak',
  'fb.right': 'Benar!',
  'fb.wrong': 'Salah',
  'fb.was': 'Jawaban benar: {v}',
  'fb.noGo': 'tadi merah, jangan ketuk',
  'fb.tooSlow': 'terlalu lambat, ketuk lebih cepat',
  'fb.otherPad': 'panel yang menyala',
  'fb.starHere': 'bintangnya di tempat yang sekarang bersinar',
  'fb.minMoves': 'bisa diselesaikan dalam {n} langkah',
  'intro.tip': 'Permainan ini menyesuaikan denganmu: kamu akan salah sekitar satu dari lima, dan justru di situlah otak paling banyak belajar.',
  'intro.practice': 'Latihan terpandu',
  'intro.practiceFirst': 'Pertama kali? Coba latihan terpandu: singkat dan tidak dihitung.',
  'practice.tag': 'Percobaan',
  'practice.done': 'Percobaan selesai!',
  'practice.doneSub': 'Sekarang kamu tahu aturannya. Siap untuk yang sungguhan?',
  'result.accuracy': 'Akurasi: {pct}%',
  'result.combo': 'Rangkaian terbaik: ×{n}',
  'result.msgUp': 'Kamu makin baik: mulai dari sini permainan jadi sedikit lebih sulit.',
  'result.msgDown': 'Levelnya turun sedikit agar kamu berlatih di titik yang tepat. Itu normal!',
  'result.msgSame': 'Level stabil: kamu sedang memantapkan. Pertahankan.',
  'result.history': 'Levelmu dari waktu ke waktu',
  'result.sinceFirst': '{pct} sejak pertama kali',
  'result.newBadge': 'Pencapaian baru!',
  'level.player': 'Level {n}',
  'level.up': 'Kamu mencapai level {n}!',
  'home.next': 'Pencapaian berikutnya',
  'home.week': 'Target mingguan: {n}/4 hari',
  'badges.title': 'Pencapaian',
  'badges.count': '{n}/{t} diraih',
  'settings.vibration': 'Getaran (di ponsel)',
  'settings.reminder': 'Pengingat harian',
  'settings.reminderHint': 'Unduh acara berulang untuk ditambahkan ke kalender ponsel atau komputermu.',
  'settings.reminderTime': 'Jam',
  'settings.reminderBtn': 'Tambahkan ke kalender',
  'reminder.desc': 'Beberapa menit untuk melatih pikiranmu',
  'badge.first.name': 'Langkah pertama',
  'badge.first.desc': 'Selesaikan latihan pertamamu',
  'badge.check.name': 'Pengukuran pertama',
  'badge.check.desc': 'Ukur Neuro Score-mu untuk pertama kali',
  'badge.plan.name': 'Latihan lengkap',
  'badge.plan.desc': 'Selesaikan latihan harian',
  'badge.streak3.name': 'Tiga berturut-turut',
  'badge.streak3.desc': 'Berlatih 3 hari berturut-turut',
  'badge.week4.name': 'Minggu penuh',
  'badge.week4.desc': 'Berlatih 4 hari dalam minggu yang sama',
  'badge.streak7.name': 'Minggu membara',
  'badge.streak7.desc': 'Berlatih 7 hari berturut-turut',
  'badge.combo10.name': 'Kilat',
  'badge.combo10.desc': '10 jawaban benar berturut-turut',
  'badge.explorer.name': 'Penjelajah',
  'badge.explorer.desc': 'Coba ke-35 latihan',
  'badge.balanced.name': 'Pikiran utuh',
  'badge.balanced.desc': 'Latih ke-8 kemampuan dalam 7 hari',
  'badge.levelups25.name': 'Mendaki',
  'badge.levelups25.desc': 'Naik level 25 kali',
  'badge.plans10.name': 'Konsisten',
  'badge.plans10.desc': 'Selesaikan 10 latihan harian',
  'badge.combo25.name': 'Badai',
  'badge.combo25.desc': '25 jawaban benar berturut-turut',
  'badge.nback3.name': 'Gema dalam',
  'badge.nback3.desc': 'Capai 3-back di Gema',
  'badge.span7.name': 'Memori baja',
  'badge.span7.desc': 'Capai rentang 7 di Kisi cahaya',
  'badge.glance50.name': 'Mata elang',
  'badge.glance50.desc': 'Turun hingga sekitar 100 md di Sekilas',
  'badge.neuro800.name': 'Jaringan saraf',
  'badge.neuro800.desc': 'Raih setidaknya 800 di Neuro Score',
  'badge.streak30.name': 'Sebulan bersama',
  'badge.streak30.desc': 'Berlatih 30 hari berturut-turut',
  'settings.about': 'Permainan latihan otak sumber terbuka. Hanya untuk hiburan: bukan alat medis. Olahraga, tidur, dan kehidupan sosial juga baik untuk otakmu.',
  'settings.data': 'Kemajuanmu',
  'settings.dataHint': 'Simpan kemajuanmu ke sebuah file untuk menyimpan salinan atau memindahkannya ke perangkat atau alamat permainan lain: masing-masing punya simpanan sendiri.',
  'settings.export': 'Ekspor kemajuan',
  'settings.import': 'Impor kemajuan',
  'settings.importBad': 'File ini bukan simpanan Synapse Dojo yang valid.',
  'settings.importConfirm': 'Ganti data sekarang dengan data dari file ({name}, {runs} latihan dimainkan, terakhir pada {last})? Kemajuanmu saat ini akan hilang.',
  'settings.importDone': 'Kemajuan diimpor.',
  'privacy.title': 'Privasi dan informasi hukum',
  'privacy.updated': 'Terakhir diperbarui: 31 Oktober 2026',
  'privacy.dataH': 'Datamu tetap di perangkatmu',
  'privacy.data': 'Nama, kemajuan, dan pengaturanmu hanya disimpan di browser perangkat ini (localStorage). Data itu tidak pernah dikirim ke server mana pun dan tidak ada yang bisa melihatnya, termasuk pengelola permainan. Data akan hilang jika kamu menghapus data browser atau memakai “Hapus semua data”: kamu bisa menyimpan salinan dengan “Ekspor kemajuan” di Pengaturan.',
  'privacy.cookiesH': 'Tanpa akun, tanpa cookie',
  'privacy.cookies': 'Tidak perlu mendaftar, dan permainan ini tidak memakai cookie, iklan, atau alat pembuatan profil. Font dan file permainan disajikan dari situs yang sama, tanpa layanan pihak ketiga.',
  'privacy.hostingH': 'Hosting',
  'privacy.hosting': 'Versi publik di-hosting oleh Cloudflare (Cloudflare Pages). Seperti server web lainnya, untuk mengirimkan halaman dan melindunginya dari serangan, Cloudflare memproses data teknis seperti alamat IP dan jenis browsermu, sesuai kebijakan privasinya sendiri.',
  'privacy.statsH': 'Statistik kunjungan',
  'privacy.stats': 'Hanya di versi publik, kunjungan dihitung dengan Cloudflare Web Analytics, yang tidak memakai cookie, tidak menyimpan apa pun di browsermu, dan tidak melacak orang antarsitus: hanya menampilkan data gabungan seperti tampilan halaman, negara, dan jenis perangkat. Nama dan hasil latihan tidak pernah dikirim.',
  'privacy.medicalH': 'Bukan alat medis',
  'privacy.medical': 'Synapse Dojo adalah permainan untuk hiburan. Ini bukan alat medis, tidak mendiagnosis apa pun, dan tidak menjanjikan pencegahan, perlambatan, atau pengobatan demensia, penurunan kognitif, atau masalah kesehatan lainnya. Skor hanya menunjukkan bagaimana kamu mengerjakan latihannya. Untuk masalah kesehatan, bicaralah dengan dokter.',
  'privacy.contactH': 'Kontak',
  'privacy.contact': 'Pertanyaan tentang permainan atau datamu: {contact}',
  'privacy.open': 'Buka permainan',

  'license.title': 'Lisensi & Ketentuan',
  'license.subtitle': 'Lisensi perangkat lunak, izin penggunaan, dan hak cipta',
  'license.authorH': 'Penulis & Hak Kekayaan Intelektual',
  'license.authorP': 'Synapse Dojo adalah proyek orisinal dan independen yang dibuat oleh Sergio Dogliani. Seluruh hak komersial dilindungi.',
  'license.polyformH': 'Lisensi PolyForm Noncommercial 1.0.0',
  'license.polyformP': 'Perangkat lunak ini dirilis di bawah Lisensi PolyForm Noncommercial 1.0.0. Anda bebas melihat kode sumber, menjalankannya, dan menggunakannya untuk pembelajaran pribadi, pendidikan, penelitian, dan tujuan non-komersial. Penggunaan komersial tanpa izin, penjualan kembali, monetisasi, atau redistribusi sangat dilarang.',
  'license.permittedH': 'Penggunaan yang Diizinkan',
  'license.permittedP': 'Studi pribadi, pelatihan kognitif, penelitian non-komersial, pengujian, dan hiburan pribadi tanpa maksud komersial.',
  'license.restrictedH': 'Batasan Komersial',
  'license.restrictedP': 'Anda tidak boleh menggunakan, memodifikasi, atau mendistribusikan perangkat lunak ini untuk keuntungan finansial, keuntungan komersial, periklanan, atau integrasi ke dalam produk komersial berbayar tanpa lisensi komersial tertulis dari penulis.',
  'license.fontsH': 'Font dan Aset',
  'license.fontsP': 'Font Nunito didistribusikan di bawah SIL Open Font License 1.1. Paradigma latihan kognitif berada dalam domain publik.',
  'license.linksH': 'Tautan & Dokumentasi Resmi',
  'license.officialLink': 'Baca teks resmi PolyForm Noncommercial 1.0.0',
  'license.repoLink': 'Lihat file LICENSE di repositori GitHub',
  'license.open': 'Buka permainan',

  'domain.coordination': "Koordinasi",
  'shape.circle': "Lingkaran",
  'shape.square': "Persegi",
  'shape.triangle': "Segitiga",
  'shape.diamond': "Belah Ketupat",
  'ex.span.name': "Rentang Angka",
  'ex.span.desc': "Hafalkan urutan angka dan ketikkan kembali sesuai urutan yang diminta",
  'ex.span.why': "Rentang angka adalah tolak ukur kapasitas memori jangka pendek dan memori kerja verbal.",
  'ex.span.example': "4 8 1 9   Ketik angka dalam urutan maju atau mundur",
  'ex.span.forward': "Maju",
  'ex.span.backward': "Mundur",
  'ex.span.watch': "Ingat {n} angka",
  'ex.span.recallFor': "Ketik angka dalam urutan yang sama",
  'ex.span.recallBack': "Ketik angka secara terbalik!",
  'ex.span.detail': "{ok}/{n} benar · rentang {span}",
  'ex.stories.name': "Memori Cerita",
  'ex.stories.desc': "Baca adegan singkat dan ingat detail ceritanya",
  'ex.stories.why': "Memori episodik mengikat tokoh, tempat, dan waktu, melatih penarikan kembali narasi di hipokampus.",
  'ex.stories.example': "Baca cerita dengan saksama dan jawab pertanyaan detailnya",
  'ex.stories.title': "Adegan {n}",
  'ex.stories.ready': "Sudah baca, siap!",
  'ex.stories.qItem': "Apa yang dibawa oleh {name}?",
  'ex.stories.qPlace': "Di mana lokasi {name}?",
  'ex.stories.qTime': "Kapan adegan tersebut terjadi?",
  'ex.stories.detail': "{ok}/{n} detail benar",
  'ex.stories.text': '{name} membawa {item}. Mereka berada {place} {time}, di mana tugas diselesaikan.',
  'ex.anagrams.letters': 'huruf',
  'ex.resources.task8': 'Cadangan',
  'ex.resources.task7': 'Analisis',
  'ex.resources.task6': 'Antarmuka',
  'ex.resources.task5': 'Jaringan',
  'ex.resources.task4': 'Inti AI',
  'ex.resources.task3': 'Keamanan',
  'ex.resources.task2': 'Basis Data',
  'ex.resources.task1': 'Server',
  'ex.resources.confirm': 'Konfirmasi pilihan',
  'ex.resources.value': '⭐ Nilai: {val} (Target: {target})',
  'ex.resources.budget': '⚡ Anggaran: {cost}/{budget}',
  'ex.reaction.target': 'Target: < {ms} ms',
  'result.timeBonusPts': 'poin waktu',
  'result.speedBonus': 'Bonus kecepatan (+10 XP)',
  'ex.flanker.name': "Tes Flanker",
  'ex.flanker.desc': "Fokus pada panah tengah dan abaikan panah pengalih di sampingnya",
  'ex.flanker.why': "Tes Eriksen Flanker mengukur atensi visual selektif dan kemampuan menyaring pengalih.",
  'ex.flanker.example': "← ← → ← ←   Targetnya adalah panah tengah (→)",
  'ex.flanker.instruction': "Ketuk arah panah tengah",
  'ex.flanker.detail': "{ok}/{n} benar · {ms} ms",
  'ex.gonogo.name': "Go / No-Go",
  'ex.gonogo.desc': "Ketuk cepat pada tanda hijau; tahan diri pada tanda stop merah",
  'ex.gonogo.why': "Melatih kendali inhibisi motorik dan penekanan impulsif di korteks prefrontal.",
  'ex.gonogo.example': "● = Ketuk cepat!   ✕ = Jangan ketuk!",
  'ex.gonogo.hint': "Ketuk pada ●, tahan pada ✕",
  'ex.gonogo.detail': "{ok}/{n} benar · {ms} ms",
  'ex.msit.name': "Interferensi Majemuk (MSIT)",
  'ex.msit.desc': "Tentukan angka mana yang berbeda tanpa terpengaruh posisinya",
  'ex.msit.why': "MSIT merangsang korteks cingulate anterior melalui konflik antara nilai angka dan posisi spasial.",
  'ex.msit.example': "1 2 1   Angka yang berbeda adalah 2",
  'ex.msit.hint': "Angka mana yang berbeda?",
  'ex.msit.detail': "{ok}/{n} benar · {ms} ms",
  'ex.binding.name': "Warna & Bentuk",
  'ex.binding.desc': "Temukan objek yang menggabungkan bentuk dan warna yang tepat",
  'ex.binding.why': "Pengikatan fitur (feature binding) melatih korteks visual memadukan informasi warna dan bentuk.",
  'ex.binding.example': "Temukan Lingkaran Biru di antara Persegi Biru dan Lingkaran Merah",
  'ex.binding.find': "Temukan",
  'ex.binding.detail': "{ok}/{n} benar",// sorting
  'ex.sorting.name': 'Penyortiran Kartu',
  'ex.sorting.desc': 'Tebak aturan pengurutan rahasia (Warna, Bentuk, atau Jumlah) dari umpan balik dan beradaptasilah saat aturan berubah',
  'ex.sorting.why': 'Terinspirasi dari Wisconsin Card Sorting Test (WCST), melatih fleksibilitas kognitif, induksi aturan, dan set-shifting.',
  'ex.sorting.example': 'Kartu dengan 3 segitiga merah: cocokkan berdasarkan bentuk, warna, atau jumlah. Temukan aturannya dengan mencoba!',
  'ex.sorting.hint': 'Cocokkan berdasarkan Warna, Bentuk, atau Jumlah. Aturan rahasia berubah secara berkala!',
  'ex.sorting.detail': '{ok}/{n} benar · {cats} aturan',
  'ex.sorting.secretRule': 'Temukan aturan rahasia',
  'ex.sorting.dimColor': 'Warna',
  'ex.sorting.dimShape': 'Bentuk',
  'ex.sorting.dimCount': 'Jumlah',
  'ex.sorting.refLabel': 'Kartu referensi (ketuk untuk mencocokkan)',
  'ex.sorting.targetLabel': 'Kartu yang dicocokkan',
  'ex.sorting.feedbackStart': 'Buat tebakan: ketuk kartu untuk menguji Warna, Bentuk, atau Jumlah',
  'ex.sorting.correct': 'Benar! Aturan terkonfirmasi',
  'ex.sorting.wrong': 'Salah! Itu bukan aturan yang aktif',
  'ex.sorting.ruleShifted': 'Aturan telah berubah! Temukan kriteria baru',
  'ex.sorting.lostRule': 'Aturan hilang! Pertahankan kriteria yang ditemukan',
  'ex.sorting.perseveration': 'Perhatian: Anda sudah mengeliminasi aturan ini!',
  'ex.sorting.eliminated': 'Dieliminasi: {dim} bukan aturannya',

  
  'ex.resources.name': "Manajemen Sumber Daya",
  'ex.resources.desc': "Alokasikan anggaran energi untuk memaksimalkan nilai total",
  'ex.resources.why': "Perencanaan dengan batasan melatih optimasi prefrontal dan pemikiran strategis.",
  'ex.resources.example': "Pilih proyek untuk skor maksimal tanpa melebihi batas energi",
  'ex.resources.detail': "{ok}/{n} selesai",
  'ex.reaction.name': "Waktu Reaksi",
  'ex.reaction.desc': "Ketuk secepat mungkin begitu layar berubah menjadi hijau",
  'ex.reaction.why': "Mengukur kecepatan konduksi visuomotor murni dan kesiapsiagaan tanpa hambatan keputusan.",
  'ex.reaction.example': "Tunggu warna hijau, lalu ketuk segera",
  'ex.reaction.ready': "Bersiap",
  'ex.reaction.wait': "Tunggu warna hijau...",
  'ex.reaction.tapNow': "KETUK SEKARANG!",
  'ex.reaction.early': "Terlalu cepat (curi start)!",
  'ex.reaction.penalty': "Selalu tunggu sinyal hijau muncul",
  'ex.reaction.detail': "Rata-rata: {ms} ms · Terbaik: {best} ms ({ok}/{n})",
  'ex.dots.name': "Estimasi Titik",
  'ex.dots.desc': "Taksir seketika sisi mana yang memiliki lebih banyak titik tanpa menghitung",
  'ex.dots.why': "Melatih sistem angka perkiraan (ANS): menilai sekilas kelompok mana yang lebih banyak tanpa menghitung, berkat representasi jumlah di lobus parietal.",
  'ex.dots.example': "Ketuk cepat kotak dengan titik terbanyak",
  'ex.dots.hint': "Sisi mana yang memiliki titik lebih banyak?",
  'ex.dots.left': "Kiri",
  'ex.dots.right': "Kanan",
  'ex.dots.detail': "{ok}/{n} benar",
  'ex.anagrams.name': "Anagram Kata",
  'ex.anagrams.desc': "Susun kembali huruf acak untuk membentuk kata yang benar",
  'ex.anagrams.why': "Mengaktifkan memori kerja ortografis dan pencarian leksikal cepat.",
  'ex.anagrams.example': "Ketuk huruf sesuai urutan untuk menyusun kata",
  'ex.anagrams.hint': "Ketuk huruf untuk merekonstruksi kata",
  'ex.anagrams.detail': "{ok}/{n} terpecahkan",
  'ex.fluency.name': "Sprint Kata",
  'ex.fluency.desc': "Konfirmasi cepat kata-kata yang diawali huruf target",
  'ex.fluency.why': "Keputusan ortografis cepat: membaca kata dan memeriksa huruf awalnya di bawah tekanan waktu melatih pengenalan kata yang cepat dan pemilihan jawaban. (Ini tugas klasifikasi cepat, bukan tes kelancaran verbal yang mengharuskan Anda menghasilkan kata sendiri.)",
  'ex.fluency.example': "Ketuk jika kata dimulai dengan huruf yang ditentukan",
  'ex.fluency.targetLetter': "Huruf Target:",
  'ex.fluency.detail': "{ok}/{n} benar",// matrix
  'ex.matrix.name': 'Matriks Spasial',
  'ex.matrix.desc': 'Ingat posisi balok biru dan letakkan kembali setelah rotasi mental',
  'ex.matrix.why': 'Melatih rotasi mental dan transformasi koordinat spasial pada sirkuit parieto-frontal.',
  'ex.matrix.example': 'Ingat pola dan tempatkan elemen setelah rotasi mental',
  'ex.matrix.memorize': 'Ingat balok-balok biru',
  'ex.matrix.itemsToRemember': 'balok untuk diingat',
  'ex.matrix.same': 'Ketuk kotak yang sebelumnya menyala',
  'ex.matrix.noRot': 'Posisi sama (tanpa rotasi)',
  'ex.matrix.rot90': 'Putar 90° searah jarum jam: ketuk posisi balok sekarang',
  'ex.matrix.rot90Badge': '90° searah jarum jam',
  'ex.matrix.rot180': 'Putar 180°: ketuk posisi balok sekarang',
  'ex.matrix.rot180Badge': '180° terbalik',
  'ex.matrix.rot270': 'Putar 90° berlawanan jarum jam: ketuk posisi balok sekarang',
  'ex.matrix.rot270Badge': '90° berlawanan arah jarum jam',
  'ex.matrix.detail': '{ok}/{n} benar',
  'ex.matrix.confirm': 'Konfirmasi ({sel}/{n})',

  
  'ex.tapSeq.name': "Ketukan Bilateral",
  'ex.tapSeq.desc': "Koordinasikan kedua ibu jari untuk meniru ritme bergantian",
  'ex.tapSeq.why': "Ketukan bimanual bergantian mengaktifkan korteks motorik kedua belahan otak melalui korpus kalosum.",
  'ex.tapSeq.example': "◀ ▶ ◀ ▶   Ikuti ritme dengan kedua jempol",
  'ex.tapSeq.hint': "Ketuk kiri dan kanan sesuai urutan yang ditentukan",
  'ex.tapSeq.detail': "{ok}/{n} sekuens selesai",
  'ex.swipePattern.name': "Geseran Bilateral",
  'ex.swipePattern.desc': "Lakukan usapan terarah secara serentak dengan kedua tangan",
  'ex.swipePattern.why': "Gerakan bimanual simultan melatih disosiasi spasial dan koordinasi motorik asimetris.",
  'ex.swipePattern.example': "Usap jempol kiri ke atas ↑ dan jempol kanan ke bawah ↓",
  'ex.swipePattern.hint': "Lakukan kedua gestur arah secara bersamaan",
  'ex.swipePattern.detail': "{ok}/{n} pola benar",
  'ex.rhythm.name': "Ritme Bilateral",
  'ex.rhythm.desc': "Sinkronkan ketukan kiri dan kanan dengan ketukan metronom",
  'ex.rhythm.why': "Koordinasi ritmis bilateral melibatkan otak kecil untuk presisi waktu tingkat milidetik.",
  'ex.rhythm.example': "Ketuk kiri dan kanan bergantian tepat pada ketukan tempo",
  'ex.rhythm.hint': "Ketuk tepat tempo dengan tangan yang diminta",
  'ex.rhythm.detail': "{ok}/{n} tepat tempo · deviasi {ms} ms",
  'ex.crossMove.name': "Gerakan Menyilang",
  'ex.crossMove.desc': "Lewati garis tengah tubuh: tanggapi di sisi yang berlawanan",
  'ex.crossMove.why': "Menyeberangi garis tengah memaksa transfer informasi antarbelahan otak melalui korpus kalosum.",
  'ex.crossMove.example': "Target di kiri + \"Silang\" -> Tekan tombol KANAN",
  'ex.crossMove.same': "Sisi sama: Tekan tombol yang sepihak",
  'ex.crossMove.cross': "SILANG: Tekan tombol di sisi BERLAWANAN!",
  'ex.crossMove.detail': "{ok}/{n} benar · {ms} ms",
  'ex.dualTask.name': "Tugas Ganda Bilateral",
  'ex.dualTask.desc': "Tahan tombol di kiri sambil menjawab kuis kognitif di kanan",
  'ex.dualTask.why': "Paradigma tugas ganda melatih atensi terbagi dan kendali motorik-kognitif asimetris.",
  'ex.dualTask.example': "Tahan tombol kiri sambil jempol kanan memilih Genap/Ganjil",
  'ex.dualTask.hint': "Tetap tahan tombol kiri sambil memilih Genap / Ganjil",
  'ex.dualTask.hold': "Tahan tombol (KIRI)",
  'ex.dualTask.even': "Genap",
  'ex.dualTask.odd': "Ganjil",
  'ex.dualTask.notHolding': "Tombol kiri tidak ditahan!",
  'ex.dualTask.detail': "{ok}/{n} benar",
};

const words: string[] = [
  "pohon", "perahu", "lilin", "lumba-lumba", "gajah", "kupu-kupu", "es krim", "pulau", "lampu", "gunung",
  "awan", "payung", "piano", "buku tulis", "roket", "kursi", "gendang", "telur", "gunung api", "ransel",
  "cincin", "sepeda", "bantal", "naga", "gunting", "jerapah", "kunci", "lemon", "palu", "kapal",
  "jam", "penguin", "laba-laba", "cermin", "cangkir", "biola", "istana", "stroberi", "camar", "serigala",
  "medali", "sarang", "panci", "sepatu", "kereta", "koper", "komet", "mercusuar", "kelapa", "roti",
  "batu bata", "kuda", "tenda", "spons", "pir", "botol", "mahkota", "layang-layang", "sungai", "bintang",
  "buku", "meja", "sapi", "rusa", "kera", "ikan", "daun", "atap", "tali", "kaca",
  "kain", "roda", "paku", "peti", "gula", "madu", "susu", "kopi", "padi", "jahe",
  "kayu", "emas", "besi", "baja", "asap", "kaki", "mata", "pipi", "dada", "kuas",
  "pantai", "hutan", "danau", "rumah", "jalan", "tanah", "pasir", "batu", "bunga", "surga",
  "senja", "fajar", "kabut", "hujan", "angin", "badai", "ombak", "perak", "panah", "busur",
  "tombak", "sendok", "wajan", "dapur", "kamar", "pagar", "kolam", "kebun", "sawah", "ladang",
  "bukit", "lembah", "jurang", "singa", "bebek", "lebah", "semut", "taman", "garam", "timun",
  "burung", "harimau", "badak", "monyet", "domba", "kelinci", "lautan", "pelangi", "gerimis", "jendela",
  "tangga", "lantai", "plafon", "lemari", "bangku", "karpet", "kalung", "gelang", "anting", "seragam",
  "kemeja", "celana", "kasur", "dompet", "naskah", "kantor", "patung", "lukisan", "gerbang", "gudang",
  "menara", "istora", "tameng", "dinding", "genteng", "cerek", "parang", "capung", "jembatan", "stasiun",
  "bandara", "lapangan", "benteng", "gerobak", "samudera", "matahari", "rembulan", "mutiara", "permata", "berlian",
  "kencana", "lonceng", "rebana", "gamelan", "padukan", "selokan", "peluit", "merpati", "banteng", "komando",
  "antariksa", "semesta", "piramida", "pahlawan", "teropong", "teleskop", "mikroskop", "belantara", "gelombang", "kembangs",
  "pesawat", "kelelawar", "tenggiri", "kakatua", "bunglons", "gergajis", "keretaap", "kendaraan", "pelabuhan", "kastilku",
];

const passages: Passage[] = [
  {
    text: "Mercusuar di Pulau Batu Putih pertama kali dinyalakan pada suatu malam berkabut tahun 1891. Penjaganya, mantan nelayan bernama Arthur, menaiki seratus tiga puluh anak tangga menara dua kali sehari untuk membersihkan lensa dan memutar mekanisme yang membuat cahayanya berputar. Pada malam badai ia tidak tidur: ia tetap di atas mengawasi laut, ditemani termos kopi dan radio tua. Selama empat puluh tahun ia bertugas, tidak ada satu kapal pun yang karam di dekat pulau itu.",
    question: "Berapa anak tangga yang dimiliki menara itu?",
    answers: [
      "Seratus tiga puluh",
      "Tiga ratus",
      "Sembilan puluh satu",
    ],
  },
  {
    text: "Lebah yang menemukan ladang bunga yang bagus kembali ke sarang dan melakukan tarian khusus. Sudut tarian terhadap garis tegak menunjukkan arah makanan dibandingkan dengan matahari, sedangkan lamanya tarian menunjukkan jaraknya. Lebah lain mengikuti gerakannya dengan antena, lalu terbang langsung ke tempat yang ditunjukkan. Dengan begitu satu lebah penjelajah bisa memandu ratusan temannya.",
    question: "Apa yang ditunjukkan oleh lamanya tarian?",
    answers: [
      "Jarak makanan",
      "Jenis bunga",
      "Waktu dalam sehari",
    ],
  },
  {
    text: "Marta memutuskan untuk belajar membuat roti. Roti pertamanya keluar dari oven sekeras batu, yang kedua masih mentah di tengah. Pada percobaan ketiga ia memahami masalahnya: dapurnya terlalu dingin sehingga adonan tidak mengembang dengan baik. Sejak itu ia membiarkan adonan beristirahat di dekat pemanas, ditutup kain, dan setiap hari Minggu tetangganya mengetuk pintu karena tergoda aromanya.",
    question: "Mengapa roti Marta tidak berhasil?",
    answers: [
      "Dapurnya terlalu dingin",
      "Ia memakai terlalu banyak garam",
      "Ovennya rusak",
    ],
  },
  {
    text: "Di pegunungan, suhu rata-rata turun sekitar enam setengah derajat setiap seribu meter ketinggian. Karena itu, bahkan di puncak musim panas, ada salju di puncak-puncak tertinggi. Pendaki berpengalaman selalu membawa jaket di ransel, meskipun di lembah udaranya panas. Angin juga bisa membuat dingin terasa jauh lebih menusuk daripada yang ditunjukkan termometer.",
    question: "Berapa banyak suhu turun setiap seribu meter?",
    answers: [
      "Sekitar enam setengah derajat",
      "Sekitar dua derajat",
      "Sekitar lima belas derajat",
    ],
  },
  {
    text: "Di desa kecil Lembah Sari, pasar diadakan setiap Kamis di alun-alun. Lapak yang paling ramai bukan lapak buah atau lapak keju, melainkan lapak Eli, yang sudah empat puluh tahun memperbaiki jam dan radio. Orang-orang membawa alat yang tak bisa lagi diperbaiki orang lain, dan dengan kaca pembesar serta pinset ia hampir selalu berhasil membuatnya bekerja lagi.",
    question: "Apa pekerjaan Eli?",
    answers: [
      "Memperbaiki jam dan radio",
      "Menjual keju",
      "Menanam buah",
    ],
  },
  {
    text: "Gurita punya tiga jantung dan darah biru. Dua jantung memompa darah ke insang, sedangkan yang ketiga mengalirkannya ke seluruh tubuh. Gurita juga ahli menyamar: berkat sel-sel khusus di kulitnya, ia bisa berganti warna dalam sepersekian detik untuk bersembunyi atau berkomunikasi. Beberapa gurita bahkan membawa batok kelapa sebagai tempat berlindung yang bisa dibawa-bawa.",
    question: "Berapa jantung yang dimiliki gurita?",
    answers: [
      "Tiga",
      "Satu",
      "Delapan",
    ],
  },
  {
    text: "Para pengemudi taksi London harus menghafal lebih dari dua puluh lima ribu jalan dan ribuan lokasi penting untuk lulus ujian legendaris bernama \"The Knowledge\". Pemeriksaan pemindaian otak membuktikan bahwa tuntutan navigasi yang luar biasa ini memperbesar hipokampus posterior secara fisik, yaitu bagian otak yang mengatur ingatan spasial.",
    question: "Bagian otak manakah yang membesar secara nyata pada pengemudi taksi di London?",
    answers: [
      "Hipokampus posterior",
      "Korteks motorik utama",
      "Lobus frontal kiri",
    ],
  },
  {
    text: "Tokek dapat memanjat dinding kaca yang sangat licin dan berlari terbalik di langit-langit menggunakan satu kaki saja. Kemampuan menakjubkan ini bukan karena lem atau mangkuk penghisap, melainkan jutaan rambut mikroskopis di jari kakinya yang disebut spatulae. Rambut halus ini menempel berkat gaya tarik molekuler bernama gaya van der Waals.",
    question: "Gaya fisika apakah yang membuat tokek mampu menempel kuat pada kaca licin?",
    answers: [
      "Gaya molekuler mikroskopis van der Waals",
      "Daya hisap mangkuk vakum mini",
      "Cairan perekat alami dari kulit",
    ],
  },
  {
    text: "Pada tahun 1901, para penyelam spons menemukan artefak perunggu berkarat di bangkai kapal kuno dekat pulau Antikythera, Yunani. Dibuat pada abad ke-2 SM, mesin ini memiliki puluhan roda gigi presisi dan diakui sebagai komputer astronomi mekanik tertua di dunia untuk menghitung siklus bulan dan gerhana.",
    question: "Apakah fungsi utama dari mekanisme kuno Antikythera yang ditemukan di bangkai kapal?",
    answers: [
      "Menghitung siklus astronomi dan meramal gerhana",
      "Mengukur kedalaman samudra lepas",
      "Mencatat kecepatan dan arah angin laut",
    ],
  },
  {
    text: "Selama Perang Dunia Kedua di Bletchley Park, tim pemecah kode rahasia yang dipimpin oleh Alan Turing bekerja keras menembus sandi mesin Enigma Jerman. Mereka membangun mesin elektromekanik besar bernama \"Bombes\" yang menyaring jutaan kemungkinan susunan huruf setiap hari untuk memecahkan kunci harian.",
    question: "Apakah nama mesin elektromekanik yang dirancang tim Alan Turing untuk memecahkan kode?",
    answers: [
      "Bombes",
      "Colossus",
      "Enigma Decoders",
    ],
  },
  {
    text: "Teleskop Luar Angkasa James Webb mengorbit Matahari pada jarak satu setengah juta kilometer dari Bumi, di titik keseimbangan gravitasi Lagrange L2. Dilindungi oleh pelindung panas sebesar lapangan tenis, cermin berilium berlapis emasnya menangkap cahaya inframerah dari galaksi-galaksi purba yang pertama kali terbentuk.",
    question: "Berapakah jarak perkiraan antara Teleskop James Webb dan planet Bumi?",
    answers: [
      "Satu setengah juta kilometer",
      "Tiga ratus delapan puluh ribu kilometer",
      "Seratus ribu kilometer",
    ],
  },
  {
    text: "Di Palung Mariana pada kedalaman hampir delapan ribu meter, ikan siput Mariana hidup bebas di tengah kegelapan abadi. Tubuhnya yang bening tidak memiliki kantung renang, dan protein sel tubuhnya distabilkan oleh molekul khusus bernama TMAO, memungkinkannya bertahan di bawah tekanan ribuan kali atmosfer daratan.",
    question: "Zat kimia pelindung apakah yang membantu ikan laut dalam bertahan dari tekanan air dahsyat?",
    answers: [
      "Molekul penstabil TMAO",
      "Lapisan lemak padat yang tebal",
      "Struktur rangka bertulang titanium",
    ],
  },
  {
    text: "Di ngarai curam Pegunungan Andes, bangsa Inka membangun jembatan gantung melintasi sungai berarus deras tanpa kayu ataupun kabel besi. Penduduk desa mengumpulkan rumput gunung liar dan memintalnya menjadi tali tebal seukuran batang pohon. Setiap tahun, jembatan tua dipotong dan dibangun kembali dalam perayaan tiga hari.",
    question: "Bahan alami apakah yang dipintal bangsa Inka untuk merajut jembatan gantung mereka?",
    answers: [
      "Anyaman rumput gunung liar",
      "Untaian kulit hewan llama",
      "Ranting pohon aras yang diikat rami",
    ],
  },
  {
    text: "Pada tahun 1610, Galileo Galilei mengarahkan teropong buatannya ke planet Yupiter dan melihat empat titik bercahaya berderet di dekat planet tersebut. Selama beberapa malam pengamatan, ia melihat bintang-bintang kecil itu mengitari Yupiter. Temuan ini menjadi bukti pertama bahwa tidak semua benda langit berputar mengelilingi Bumi.",
    question: "Berapa banyakkah bulan Yupiter yang pertama kali ditemukan oleh Galileo pada tahun 1610?",
    answers: [
      "Empat bulan",
      "Dua bulan",
      "Tujuh bulan",
    ],
  },
  {
    text: "Di hutan hujan Mesoamerika, suku Maya kuno menganggap biji kakao sebagai mata uang suci dan berkah para dewa. Selain sebagai alat tukar, biji fermentasi ditumbuk untuk membuat minuman ritual yang pahit dan berbusa. Mereka menuangkannya dari ketinggian untuk membuat busa tebal dan membumbuinya dengan bubuk cabai.",
    question: "Rempah pedas apakah yang biasa dicampurkan suku Maya ke dalam minuman kakao ritual mereka?",
    answers: [
      "Bubuk cabai pedas",
      "Jahe liar",
      "Cengkih kering",
    ],
  },
  {
    text: "Di teluk tropis Karibia dan Pasifik, air laut malam hari bersinar terang dengan warna biru elektrik saat terhempas ombak atau dayung perahu. Keajaiban ini diciptakan oleh miliaran mikroorganisme bersel tunggal bernama dinoflagellata. Saat membran selnya terguncang, reaksi kimia bercahaya menyala untuk mengusir pemangsa.",
    question: "Warna apakah yang dipancarkan oleh mikroorganisme laut berbioluminesensi saat air terguncang?",
    answers: [
      "Biru elektrik cerah",
      "Hijau zamrud pekat",
      "Kuning keemasan",
    ],
  },
  {
    text: "Bunglon tidak mengubah warna kulitnya dengan mencampurkan pigmen cair di dalam selnya. Di balik lapisan kulit luar mereka terdapat lapisan sel iridofor yang berisi kisi kristal nano guanin. Dengan meregangkan atau mengendurkan kulitnya, bunglon mengatur jarak antar kristal sehingga memantulkan spektrum warna cahaya tertentu.",
    question: "Bagaimanakah cara bunglon mengubah warna permukaan kulitnya?",
    answers: [
      "Mengatur jarak kisi kristal nano di dalam lapisan kulit",
      "Memeras kantung tinta mikro di bawah sisik",
      "Mengubah suhu permukaan tubuh dengan cepat",
    ],
  },
  {
    text: "Menurut legenda tua dari dataran tinggi Ethiopia, khasiat kopi pertama kali disadari oleh seorang penggembala kambing muda bernama Kaldi. Ia melihat kawanan kambingnya melompat-lompat penuh semangat sepanjang malam setelah memakan buah beri merah liar. Kaldi memetik buah tersebut dan membawanya ke biara terdekat.",
    question: "Siapakah yang menurut legenda pertama kali menemukan efek penyegar dari buah kopi?",
    answers: [
      "Seorang penggembala kambing bernama Kaldi",
      "Pedagang rempah dari Laut Merah",
      "Seorang biksu musafir",
    ],
  },
  {
    text: "Di bawah lapisan es raksasa Antartika, salju ratusan ribu tahun memadat menjadi gletser es biru yang murni. Di dalam kisi kristalnya terperangkap miliaran gelembung udara mikroskopis dari zaman purba. Melalui pengeboran inti es sedalam lebih dari tiga kilometer, para ilmuwan dapat meneliti sampel asli atmosfer Bumi masa lalu.",
    question: "Apakah yang diambil dan diteliti para ilmuwan dari sampel inti es Antartika?",
    answers: [
      "Gelembung udara purba yang terperangkap ratusan ribu tahun",
      "Tetesan air laut prasejarah yang membeku",
      "Fosil serbuk sari pohon purba",
    ],
  },
  {
    text: "Di gurun pasir tertentu di seluruh dunia, para pengelana dapat menyaksikan keajaiban bukit pasir yang bersenandung. Saat pasir kering longsor di lereng yang curam, miliaran butir pasir kuarsa berukuran seragam saling bergesekan pada frekuensi yang sama. Gesekan serempak ini menghasilkan dengungan rendah mirip alunan selo.",
    question: "Apakah yang menyebabkan suara dengungan rendah pada bukit pasir yang bersenandung?",
    answers: [
      "Gesekan serempak butiran pasir kuarsa yang seragam saat meluncur",
      "Angin kencang yang meniup celah tebing batu tajam",
      "Gema dari rongga gua bawah tanah yang dalam",
    ],
  },
];

import type { StoryScenario } from '../i18n';

export const stories: StoryScenario[] = [
  {
    "name": "Elena",
    "item": "sebuah tas biru",
    "itemDistractors": [
      "ransel merah",
      "koper hijau"
    ],
    "place": "di bawah bangku taman",
    "placeDistractors": [
      "di depan kafe",
      "di dalam kereta"
    ],
    "time": "pukul 15:30",
    "timeDistractors": [
      "pukul 18:00",
      "pukul 12:15"
    ]
  },
  {
    "name": "Marco",
    "item": "sebuah buku catatan kulit",
    "itemDistractors": [
      "buku bergambar",
      "tablet hitam"
    ],
    "place": "di atas meja perpustakaan",
    "placeDistractors": [
      "di teras",
      "di ruang tunggu"
    ],
    "time": "Kamis pagi",
    "timeDistractors": [
      "Jumat sore",
      "Selasa malam"
    ]
  },
  {
    "name": "Sara",
    "item": "sebuah sepeda kuning",
    "itemDistractors": [
      "skuter perak",
      "motor moped putih"
    ],
    "place": "di sebelah air mancur pusat",
    "placeDistractors": [
      "di depan balai kota",
      "di belakang kios koran"
    ],
    "time": "pukul 09:00",
    "timeDistractors": [
      "pukul 11:30",
      "pukul 14:00"
    ]
  },
  {
    "name": "David",
    "item": "sebuah syal wol merah",
    "itemDistractors": [
      "kupluk biru",
      "jaket cokelat"
    ],
    "place": "di kursi kedai kopi",
    "placeDistractors": [
      "di dinding dermaga",
      "di lorong kantor"
    ],
    "time": "Sabtu malam",
    "timeDistractors": [
      "Minggu pagi",
      "Rabu pukul 16:00"
    ]
  },
  {
    "name": "Julia",
    "item": "sebuah vas keramik putih",
    "itemDistractors": [
      "lampu emas",
      "lukisan kayu"
    ],
    "place": "di ambang jendela dapur",
    "placeDistractors": [
      "di meja resepsionis",
      "di rak ruang tamu"
    ],
    "time": "pukul 17:45",
    "timeDistractors": [
      "pukul 20:00",
      "pukul 10:15"
    ]
  },
  {
    "name": "Lucas",
    "item": "sebuah teropong pelaut",
    "itemDistractors": [
      "kompas kuningan",
      "peta laut kuno"
    ],
    "place": "di atas batu karang mercusuar",
    "placeDistractors": [
      "di haluan kapal",
      "di gubuk dermaga"
    ],
    "time": "saat fajar menyingsing",
    "timeDistractors": [
      "saat matahari terbenam",
      "tepat tengah hari"
    ]
  },
  {
    "name": "Claire",
    "item": "sebuah kamera antik",
    "itemDistractors": [
      "tas lensa",
      "tripod aluminium"
    ],
    "place": "di teras dengan pemandangan luas",
    "placeDistractors": [
      "di sepanjang jalan pohon rindang",
      "di atas jembatan penyeberangan"
    ],
    "time": "Jumat saat senja",
    "timeDistractors": [
      "Sabtu saat fajar",
      "Kamis sore"
    ]
  },
  {
    "name": "Matthew",
    "item": "sebuah jam saku emas",
    "itemDistractors": [
      "gelang perak",
      "cincin antik"
    ],
    "place": "di meja pedagang barang antik",
    "placeDistractors": [
      "di brankas hotel",
      "di etalase kaca tengah"
    ],
    "time": "Senin pukul 11:00",
    "timeDistractors": [
      "Rabu pukul 15:30",
      "Jumat pukul 09:15"
    ]
  },
  {
    "name": "Valerie",
    "item": "sebuah payung kuning bermotif polkadot",
    "itemDistractors": [
      "jas hujan hijau",
      "selendang sutra"
    ],
    "place": "di halte trem",
    "placeDistractors": [
      "di pintu masuk stasiun kereta",
      "di bawah deretan pilar alun-alun"
    ],
    "time": "Rabu saat hujan turun",
    "timeDistractors": [
      "Selasa sepulang kerja",
      "Kamis malam"
    ]
  },
  {
    "name": "Simon",
    "item": "sebuah kotak kaleng bergambar",
    "itemDistractors": [
      "kotak kayu kecil",
      "stoples kaca"
    ],
    "place": "di anak tangga gedung teater",
    "placeDistractors": [
      "di lorong bioskop",
      "di dekat loket karcis"
    ],
    "time": "Minggu pukul 14:30",
    "timeDistractors": [
      "Sabtu pukul 21:00",
      "Senin pukul 18:00"
    ]
  },
  {
    "name": "Fiona",
    "item": "sebuah gulungan peta rasi bintang",
    "itemDistractors": [
      "globe meja",
      "astrolab perunggu"
    ],
    "place": "di observatorium puncak bukit",
    "placeDistractors": [
      "di menara benteng",
      "di halaman rumput planetarium"
    ],
    "time": "tengah malam yang cerah",
    "timeDistractors": [
      "pukul sepuluh malam",
      "pukul dua dini hari"
    ]
  },
  {
    "name": "Andrew",
    "item": "sebuah kunci besi berukir",
    "itemDistractors": [
      "gembok berat",
      "liontin berukir"
    ],
    "place": "di peti loteng",
    "placeDistractors": [
      "di balik lukisan ruang tamu",
      "di laci meja tulis"
    ],
    "time": "Selasa pukul 16:15",
    "timeDistractors": [
      "Kamis pukul 10:30",
      "Minggu sore"
    ]
  },
  {
    "name": "Sylvia",
    "item": "sebuah teko besi cor berlapis email",
    "itemDistractors": [
      "teko kristal",
      "cangkir porselen"
    ],
    "place": "di meja rumah kaca",
    "placeDistractors": [
      "di gazebo taman",
      "di meja kerja laboratorium"
    ],
    "time": "Sabtu pukul 10:00",
    "timeDistractors": [
      "Minggu pukul 17:00",
      "Jumat saat sarapan"
    ]
  },
  {
    "name": "Lawrence",
    "item": "sebuah seruling kayu kenari",
    "itemDistractors": [
      "mandolin antik",
      "busur biola eboni"
    ],
    "place": "di atas jembatan lengkung batu",
    "placeDistractors": [
      "di tepi aliran sungai kecil",
      "di bawah pohon ek tua yang teduh"
    ],
    "time": "Rabu pagi-pagi sekali",
    "timeDistractors": [
      "Kamis menjelang malam",
      "Sabtu sore"
    ]
  },
  {
    "name": "Alice",
    "item": "sekotak krayon lilin aneka warna",
    "itemDistractors": [
      "buku sketsa",
      "palet cat minyak"
    ],
    "place": "di tangga megah museum",
    "placeDistractors": [
      "di serambi biara abad pertengahan",
      "di depan pintu galeri seni"
    ],
    "time": "Minggu pukul 16:45",
    "timeDistractors": [
      "Sabtu tengah hari",
      "Selasa pukul 14:00"
    ]
  },
  {
    "name": "Fabian",
    "item": "sebuah topi anyaman jerami",
    "itemDistractors": [
      "kacamata hitam",
      "bandana motif kotak"
    ],
    "place": "di dermaga kayu nelayan",
    "placeDistractors": [
      "di pantai penuh kerang",
      "di tempat tambatan perahu layar"
    ],
    "time": "Jumat tengah hari",
    "timeDistractors": [
      "Minggu pukul 11:00",
      "Rabu pukul 15:00"
    ]
  },
  {
    "name": "Beatrice",
    "item": "sebuah lentera kuningan yang mengilap",
    "itemDistractors": [
      "tempat lilin bercabang tiga",
      "senter saku"
    ],
    "place": "di beranda halaman dalam kuno",
    "placeDistractors": [
      "di sepanjang lorong lukisan dinding",
      "di depan gerbang monumen besar"
    ],
    "time": "Kamis malam pukul 20:30",
    "timeDistractors": [
      "Jumat saat temaram senja",
      "Sabtu larut malam"
    ]
  },
  {
    "name": "Robert",
    "item": "sebuah radio jinjing bertenaga baterai",
    "itemDistractors": [
      "pemutar piringan hitam mini",
      "pelantang suara saku"
    ],
    "place": "di meja kerja bengkel kayu",
    "placeDistractors": [
      "di gudang perkakas kebun",
      "di bengkel montir mesin"
    ],
    "time": "Senin pukul 08:30 pagi",
    "timeDistractors": [
      "Rabu pukul 13:00",
      "Jumat pukul 17:15"
    ]
  },
  {
    "name": "Camilla",
    "item": "sebuah kipas sutra bersulam",
    "itemDistractors": [
      "selendang renda hitam",
      "penutup kepala beludru"
    ],
    "place": "di balkon beratap istana",
    "placeDistractors": [
      "di serambi menara tinggi",
      "di aula cermin megah"
    ],
    "time": "Selasa saat matahari terbenam",
    "timeDistractors": [
      "Kamis sore",
      "Minggu malam hari"
    ]
  },
  {
    "name": "Gabriel",
    "item": "sebuah buku log kapal yang menguning",
    "itemDistractors": [
      "atlas navigasi laut berjilid",
      "gulungan perkamen bersegel lilin"
    ],
    "place": "di gudang bawah tanah pemerasan anggur",
    "placeDistractors": [
      "di ruang kargo palka kapal layar",
      "di bangsal kereta kuda"
    ],
    "time": "Sabtu sore pukul 15:00",
    "timeDistractors": [
      "Senin pukul 11:30",
      "Rabu malam"
    ]
  },
  {
    "name": "Martina",
    "item": "sekotak cokelat hitam istimewa",
    "itemDistractors": [
      "sekeranjang kue kering berempah",
      "kue tar almon lezat"
    ],
    "place": "di etalase kaca toko kue",
    "placeDistractors": [
      "di meja bundar kedai teh",
      "di pintu masuk toko bahan makanan"
    ],
    "time": "Kamis pukul 17:00 sore",
    "timeDistractors": [
      "Sabtu pukul 10:30 pagi",
      "Minggu pukul 16:15"
    ]
  },
  {
    "name": "George",
    "item": "sebuah kaca pembesar bundar",
    "itemDistractors": [
      "mikroskop jinjing mini",
      "pinset berujung runcing"
    ],
    "place": "di meja kerja ruang belajar",
    "placeDistractors": [
      "di ruang arsip bersejarah keluarga",
      "di atas meja gambar arsitek"
    ],
    "time": "Rabu malam pukul 19:30",
    "timeDistractors": [
      "Selasa tengah hari",
      "Jumat pukul 18:45"
    ]
  },
  {
    "name": "Serena",
    "item": "sebuah tas jinjing kanvas ramah lingkungan",
    "itemDistractors": [
      "keranjang anyaman rotan terang",
      "ransel mendaki gunung"
    ],
    "place": "di lapak penjualan buku bekas",
    "placeDistractors": [
      "di tengah pasar bunga segar",
      "di depan toko bahan organik"
    ],
    "time": "Minggu pagi pukul 10:15",
    "timeDistractors": [
      "Sabtu sore pukul 16:00",
      "Kamis pukul 11:45"
    ]
  },
  {
    "name": "Peter",
    "item": "sebuah kotak pelindung keras untuk selo",
    "itemDistractors": [
      "tas jinjing lembaran partitur musik",
      "sarung pelindung gitar klasik"
    ],
    "place": "di panggung taman musim dingin",
    "placeDistractors": [
      "di lobi megah auditorium",
      "di depan pintu utama gedung konser"
    ],
    "time": "Jumat malam pukul 21:15",
    "timeDistractors": [
      "Sabtu sore",
      "Minggu pukul 18:30"
    ]
  }
];

export default { ui, words, passages, stories };
