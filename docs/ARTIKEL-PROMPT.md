# Panduan: dari Instagram Reel menjadi artikel blog SEO

## Alur kerja (sekitar 10 menit per artikel)
1. Pilih reel dan salin **caption panjangnya** (dan transkrip suara bila ada).
2. Tentukan **kata kunci utama** (1 frasa yang dicari orang, mis. "manfaat singing bowl") dan 2-3 kata kunci pendukung.
3. Tempel template prompt di bawah ke Gemini/ChatGPT. Minta versi Indonesia, lalu versi Inggris.
4. **Periksa hasilnya**: fakta, nada suara Anda, dan klaim kesehatan (hindari "menyembuhkan"; pakai "membantu", "banyak orang merasakan").
5. Isi di Airtable (tabel Posts): Title = judul SEO, Meta Description, Excerpt, Body, Tags, Instagram URL (link reel), Slug (huruf kecil, pakai tanda hubung, memuat kata kunci), Publish Date. Centang Published.
6. Situs rebuild, reel tampil otomatis sebagai video pendukung di artikel.

## Template prompt (salin, isi bagian [ ])
```
Peran: kamu editor konten SEO untuk Teman Pulih, brand pendampingan, sound healing
Nusantara, dan konseling intuitif untuk komunitas dan institusi. Nada: hangat, tenang,
membumi, tidak menggurui.

Tugas: ubah caption Instagram Reel di bawah menjadi artikel blog dalam [Bahasa Indonesia / English].

Kata kunci utama: [ ]
Kata kunci pendukung: [ ]
Target pembaca: [individu / komunitas / institusi]
Panjang: 500-800 kata

Aturan SEO:
1. Judul (H1): maksimal 60 karakter, kata kunci utama di awal, menarik tanpa clickbait.
2. Meta description: 140-155 karakter, memuat kata kunci utama dan ajakan membaca.
3. Slug: huruf kecil, pakai tanda hubung, 3-6 kata, memuat kata kunci utama.
4. Paragraf pembuka (2-3 kalimat) memuat kata kunci utama dan menjawab inti pertanyaan pembaca.
5. Gunakan subjudul ## (H2) yang jelas, sebagian memuat kata kunci pendukung. Paragraf pendek.
6. Sertakan satu daftar berpoin atau langkah praktis.
7. Kata kunci muncul alami, jangan dijejalkan.
8. Tutup dengan ajakan lembut ke layanan Teman Pulih (konseling intuitif, sound meditation,
   sound healing, atau produk singing bowl) yang paling relevan.
9. Jangan membuat klaim medis (menyembuhkan, mengobati). Gunakan "membantu", "banyak orang
   merasakan", dan tambahkan satu kalimat bahwa praktik ini komplementer dan tidak
   menggantikan perawatan profesional.
10. Jangan mengarang data, statistik, atau kutipan. Hanya gunakan isi caption dan pengetahuan umum yang aman.

Format keluaran (persis):
SEO_TITLE:
META_DESCRIPTION:
SLUG:
EXCERPT: (1-2 kalimat, maks 160 karakter)
TAGS: (3-5 tag, dipisah koma)
BODY: (Markdown; mulai dari paragraf pembuka, subjudul pakai ##, jangan ulangi judul H1)

Caption Instagram:
"""
[tempel caption di sini]
"""
```

## Cek akhir sebelum Published
- [ ] Judul tidak lebih dari 60 karakter, meta description 140-155 karakter
- [ ] Slug unik; versi Inggris diisi di kolom Slug EN
- [ ] Instagram URL berupa link post/reel (`instagram.com/reel/...` atau `/p/...`)
- [ ] Tidak ada klaim medis; fakta sudah dicek
- [ ] Tanggal terbit benar
