# Setup Airtable CMS

## 1. Buat base dan tabel
Buat base baru (mis. "Teman Pulih CMS"), lalu **impor CSV** dari folder `airtable-templates/` (Add or import > CSV file), satu CSV per tabel. Nama tabel harus persis:
`Services`, `Events`, `Products`, `Posts`, `Site Settings`.

Setelah impor, ubah tipe kolom agar nyaman diedit:
| Kolom | Tipe yang disarankan |
|---|---|
| Published | Checkbox (hanya baris tercentang yang tayang) |
| Order | Number |
| Date / Publish Date | Date (format ISO) |
| Mode (Events) | Single select: Online, Offline, Hybrid |
| Category (Products) | Single select: singing-bowl, engraving |
| Description / Body / Summary | Long text |
| Image | **Attachment** (tambahkan sendiri) |
| Gallery | **Attachment** (Services saja; foto tambahan, tampil di halaman layanan dan bagian "Momen sesi" beranda. Kosong = pakai foto bawaan situs) |
| Image Alt ID / Image Alt EN | Single line text (opsional, untuk SEO) |

## 2. Kolom per tabel
- **Services**: Slug, Order, Published, Title/Summary/Description (ID & EN), Lynk URL, Icon (`leaf`, `wave`, `stone`, `bowl`), Image, Gallery
- **Events**: Slug, Published, Title/Description (ID & EN), Date, Time, Mode, Location, Service Slug (isi slug layanan), Registration URL (opsional; kosong = tombol WhatsApp), Image
- **Products**: Slug, Order, Published, Category, Title/Summary/Description/Price (ID & EN), Order URL (opsional), Reference URL + Reference Label (ID & EN), Image
- **Posts**: Slug, Slug EN (slug versi Inggris, penting untuk SEO), Published, Publish Date, Instagram URL, Tags (pisahkan koma), Title (= judul SEO), Meta Description, Excerpt, Body (Markdown) dalam ID & EN, Image
- **Site Settings**: Key, ID, EN (teks hero, tentang, disclaimer). Jangan ubah nilai Key.

Aturan: kolom bahasa yang kosong otomatis memakai bahasa lainnya, **kecuali artikel blog**: halaman artikel hanya dibuat untuk bahasa yang Title dan Body-nya terisi.
Body mendukung Markdown: `## Judul`, `- daftar`, `**tebal**`, `*miring*`, `[teks](url)`.
Daftar nilai di Site Settings `about_values`: pisahkan butir dengan `;` dan judul/isi dengan `|`.

## 3. Token API
1. airtable.com/create/tokens > **Create token**
2. Scope: `data.records:read`. Access: pilih base ini saja.
3. Salin token ke GitHub Secret `AIRTABLE_TOKEN`.
4. Base ID (diawali `app...`, ada di URL base atau airtable.com/api) ke Secret `AIRTABLE_BASE_ID`.

Catatan: gambar dari kolom Attachment diunduh ke situs saat build (link Airtable kedaluwarsa), jadi aman.

## 4. Rebuild otomatis saat konten berubah (opsional)
Airtable Automation: trigger "When record updated/created" > action **Run script** / **Send request** ke
`POST https://api.github.com/repos/USERNAME/REPO/dispatches`
Header: `Authorization: Bearer <GitHub fine-grained token, izin Contents: read & write>`, `Accept: application/vnd.github+json`
Body: `{"event_type":"airtable-update"}`
Tanpa ini, situs tetap rebuild tiap malam atau lewat tombol **Run workflow**.

## 5. Bila build gagal
Jika token/nama kolom salah, build sengaja berhenti dan situs yang sedang live tidak berubah. Lihat log di tab Actions (pesan `[cms] ERROR`).


## Banner beranda
Kunci **Site Settings** `hero_kicker`, `hero_title`, `hero_byline`, `hero_subtitle` mengatur teks banner. Foto potret banner ada di `public/images/hero-fikri.jpg`; logo di `public/images/logo-*.png`.

## Testimoni & foto produk (revisi 2)
- Tabel baru **Testimonials**: Slug, Published, Order, Heading ID/EN, Image (attachment, opsional), Quote ID/EN, Name, Role ID/EN. Bila tabel kosong/tidak ada, situs memakai testimoni bawaan. Judul seksi diatur lewat Site Settings `testimonial_title`.
- Tabel **Products** punya field baru **Gallery** (attachment, maks. 4 foto tampil). Kosong = foto bawaan di `public/images/produk/`. Singing bowl dan jasa grafir tampil sebagai dua seksi terpisah di beranda dan halaman produk.
- Token Airtable perlu akses baca ke tabel Testimonials.
