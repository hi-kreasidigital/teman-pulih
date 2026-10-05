# Panduan: dari Instagram Reel menjadi artikel blog SEO (Indonesia + English sekaligus)

## Alur kerja (sekitar 10 menit per artikel)
1. Pilih reel dan salin **caption panjangnya** (dan transkrip suara bila ada).
2. Tentukan **kata kunci utama** (1 frasa yang dicari orang, mis. "manfaat singing bowl") dan 2-3 kata kunci pendukung.
3. Tempel template prompt di bawah ke Gemini/ChatGPT. **Satu prompt menghasilkan versi Indonesia dan English sekaligus** dalam 12 bagian bernomor urut yang sama dengan kolom di Airtable.
4. **Periksa hasilnya**: fakta, nada suara Anda, dan klaim kesehatan (hindari "menyembuhkan"; pakai "membantu", "banyak orang merasakan").
5. Di Airtable (tabel **Posts**), salin tiap bagian ke kolom yang namanya sama, dari atas ke bawah (lihat tabel pemetaan di bawah). Lalu isi **Instagram URL** (link reel/post) dan **Publish Date**, dan centang **Published**.
6. Situs akan rebuild (otomatis tiap malam, atau jalankan workflow Deploy untuk langsung tayang). Reel tampil sebagai video pendukung di artikel.

## Pemetaan output prompt ke kolom Airtable (Posts)
| Output prompt | Kolom Airtable | Catatan |
|---|---|---|
| SEO_TITLE ID | Title ID | maks 60 karakter |
| SEO_TITLE EN | Title EN | maks 60 karakter |
| META_DESCRIPTION ID | Meta Description ID | 140-155 karakter |
| META_DESCRIPTION EN | Meta Description EN | 140-155 karakter |
| SLUG ID | Slug ID | huruf kecil, tanda hubung, unik |
| SLUG EN | Slug EN | huruf kecil, tanda hubung, unik |
| EXCERPT ID | Excerpt ID | 1-2 kalimat, maks 160 karakter |
| EXCERPT EN | Excerpt EN | 1-2 kalimat, maks 160 karakter |
| TAGS ID | Tags ID | 3-5 tag, dipisah koma |
| TAGS EN | Tags EN | 3-5 tag, dipisah koma |
| BODY ID | Body ID | Markdown, tempel apa adanya |
| BODY EN | Body EN | Markdown, tempel apa adanya |

Kolom lain (tidak berasal dari prompt): **Published**, **Publish Date**, **Instagram URL**, dan **Image** (opsional: gambar sampul untuk pratinjau media sosial; kosong = gambar bawaan situs).

## Template prompt (salin, isi bagian [ ])
```
Peran: kamu editor konten SEO dwibahasa untuk Teman Pulih, brand pendampingan, sound healing
Nusantara, dan konseling intuitif untuk komunitas dan institusi. Nada: hangat, tenang,
membumi, tidak menggurui.

Tugas: ubah caption Instagram Reel di bawah menjadi DUA artikel blog yang sejajar: satu dalam
Bahasa Indonesia dan satu dalam English. Versi English ditulis ulang secara natural untuk
pembaca berbahasa Inggris dan SEO (bukan terjemahan kata per kata), dengan isi dan struktur
yang setara.

Kata kunci utama (ID): [ ]
Kata kunci utama (EN): [ ]
Kata kunci pendukung: [ ]
Target pembaca: [individu / komunitas / institusi]
Panjang tiap artikel: 500-800 kata

Aturan SEO (berlaku untuk kedua bahasa):
1. SEO_TITLE (judul H1): maksimal 60 karakter, kata kunci utama di awal, menarik tanpa clickbait.
2. META_DESCRIPTION: 140-155 karakter, memuat kata kunci utama dan ajakan membaca.
3. SLUG: huruf kecil, pakai tanda hubung, 3-6 kata, memuat kata kunci utama, tanpa karakter
   khusus. Slug ID dan slug EN berbeda sesuai bahasanya.
4. EXCERPT: 1-2 kalimat ringkas, maksimal 160 karakter, tidak mengulang meta description.
5. TAGS: 3-5 tag pendek, dipisah koma, huruf kecil.
6. Paragraf pembuka (2-3 kalimat) memuat kata kunci utama dan menjawab inti pertanyaan pembaca.
7. Gunakan subjudul ## (H2) yang jelas, sebagian memuat kata kunci pendukung. Paragraf pendek.
8. Sertakan satu daftar berpoin atau langkah praktis.
9. Kata kunci muncul alami, jangan dijejalkan.
10. Tutup dengan ajakan lembut ke layanan Teman Pulih (konseling intuitif, sound meditation,
    sound healing, atau produk singing bowl) yang paling relevan.
11. Jangan membuat klaim medis (menyembuhkan, mengobati). Gunakan "membantu", "banyak orang
    merasakan" (EN: "helps", "many people find"), dan tambahkan satu kalimat bahwa praktik ini
    komplementer dan tidak menggantikan perawatan profesional.
12. Jangan mengarang data, statistik, atau kutipan. Hanya gunakan isi caption dan pengetahuan
    umum yang aman.

Aturan format BODY (penting agar tampil benar di situs):
- Tulis dalam Markdown murni. Subjudul HARUS diawali "## " (dua tanda pagar + spasi).
- Daftar berpoin HARUS diawali "- " (tanda hubung + spasi), satu item per baris.
- Beri satu baris kosong antar paragraf, subjudul, dan daftar.
- Jangan mengulang judul H1 di dalam BODY, jangan memakai tabel atau HTML.

Format keluaran (PERSIS seperti ini, urut, satu label per baris, tanpa penjelasan tambahan,
tanpa tanda ** pada label, tanpa blok kode):

SEO_TITLE ID:
SEO_TITLE EN:
META_DESCRIPTION ID:
META_DESCRIPTION EN:
SLUG ID:
SLUG EN:
EXCERPT ID: (1-2 kalimat, maks 160 karakter)
EXCERPT EN: (1-2 kalimat, maks 160 karakter)
TAGS ID: (3-5 tag, dipisah koma)
TAGS EN: (3-5 tag, dipisah koma)
BODY ID: (Markdown; mulai dari paragraf pembuka, subjudul pakai ##)
BODY EN: (Markdown; mulai dari paragraf pembuka, subjudul pakai ##)

Caption Instagram:
"""
[tempel caption di sini]
"""
```

## Cek akhir sebelum Published
- [ ] Title maksimal 60 karakter; Meta Description 140-155 karakter (ID dan EN)
- [ ] Slug ID dan Slug EN unik (tidak sama dengan artikel lain)
- [ ] Instagram URL berupa link post/reel (`instagram.com/reel/...` atau `/p/...`)
- [ ] Body ID dan Body EN memakai `##` untuk subjudul dan `- ` untuk daftar
- [ ] Tidak ada klaim medis; fakta sudah dicek
- [ ] Publish Date benar, lalu centang Published
- [ ] Artikel hanya tampil di bahasa yang kolom Title dan Body-nya terisi

## Catatan: gambar sampul (Image)
Airtable tidak punya fitur bawaan yang mengambil gambar dari link Instagram, dan Instagram tidak mengizinkan pengambilan thumbnail tanpa akses API resmi. Karena itu kolom **Image** bersifat opsional: unggah manual (mis. tangkapan layar cover reel) bila ingin pratinjau khusus di Google/WhatsApp/Instagram. Bila kosong, situs memakai gambar bawaan, dan videonya tetap tampil lewat embed Instagram di dalam artikel.
