# Teman Pulih: website (bilingual ID/EN)

Situs statis, cepat, dan SEO-friendly. Tanpa dependency npm. Stack: **GitHub (repo + Pages) + domain + Airtable (CMS)**.

## Struktur
- `config/site.mjs` : domain, nomor WhatsApp, link Lynk/Instagram, warna brand
- `content/seed.json` : konten contoh (dipakai bila Airtable belum tersambung)
- `scripts/sync-cms.mjs` : tarik konten dari Airtable
- `src/` : template halaman, teks antarmuka (`i18n.mjs`), CSS
- `airtable-templates/` : CSV untuk impor tabel Airtable
- `docs/AIRTABLE-SETUP.md`, `docs/ARTIKEL-PROMPT.md` : panduan CMS dan prompt artikel

## Jalankan lokal
```bash
npm run dev      # sync + build + pratinjau di http://localhost:4321
```
Butuh Node 20+. Tanpa token Airtable, situs memakai konten contoh.

## Deploy (GitHub Pages)
1. Upload isi folder ini ke repo GitHub (branch `main`).
2. Repo > Settings > Pages > Source: **GitHub Actions**.
3. Repo > Settings > Secrets and variables > Actions:
   - Secrets: `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`
   - Variables: `SITE_URL` (mis. `https://temanpulih.site`)
4. Push ke `main`. Workflow `Deploy ke GitHub Pages` berjalan otomatis.

## Domain (belum ada? tidak masalah)
Domain hanya ada di **satu tempat**: variable `SITE_URL` di GitHub (atau default di `config/site.mjs`).
Dari satu nilai itu otomatis dibuat: canonical, hreflang, sitemap.xml, robots.txt, Open Graph, JSON-LD, dan file `CNAME`.
- Belum punya domain: kosongkan `SITE_URL` lalu isi dengan `https://USERNAME.github.io/NAMA-REPO` (sub-path otomatis ditangani).
- Sudah punya domain: set `SITE_URL=https://domainanda.com`, lalu di registrar buat DNS:
  `A` ke `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (dan `CNAME www` ke `USERNAME.github.io`), kemudian aktifkan "Enforce HTTPS" di Settings > Pages.

## Update konten
Edit di Airtable, lalu situs rebuild lewat salah satu cara: (a) tombol **Run workflow** di tab Actions, (b) otomatis tiap malam, (c) Airtable Automation (lihat `docs/AIRTABLE-SETUP.md`).

## Ganti tampilan
Warna: `config/site.mjs` > `colors`. Teks tombol/menu: `src/i18n.mjs`. Gaya: `src/styles/main.css`.
