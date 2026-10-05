// ============================================================
//  KONFIGURASI UTAMA TEMAN PULIH
//  Domain: cukup ganti SITE_URL (lihat README bagian "Domain").
//  Cara termudah: set Repository Variable `SITE_URL` di GitHub,
//  tanpa mengubah kode. Contoh: https://temanpulih.site
// ============================================================
const env = process.env;

const rawUrl = (env.SITE_URL || 'https://temanpulih.site').trim().replace(/\/+$/, '');
const parsed = new URL(rawUrl);

export const site = {
  name: 'Teman Pulih',
  url: rawUrl,
  host: parsed.hostname,
  // Otomatis: jika SITE_URL memakai sub-path (mis. github.io/teman-pulih) maka basePath = /teman-pulih
  basePath: parsed.pathname === '/' ? '' : parsed.pathname.replace(/\/+$/, ''),
  // true jika memakai custom domain -> file CNAME dibuat otomatis untuk GitHub Pages
  customDomain: !parsed.hostname.endsWith('github.io'),

  defaultLang: 'id',
  langs: ['id', 'en'],

  whatsapp: '6285645599252',
  lynkStore: 'https://lynk.id/temanpulihmu',
  instagram: 'https://www.instagram.com/fikrarya/',
  email: 'temanpulihmu@gmail.com',

  // Warna brand (nature + nusantara: emas & turquoise di atas banyak white space)
  colors: {
    turquoise: '#12948E',      // grafis & ornamen (bukan teks kecil)
    turquoiseDeep: '#0B5F5C',  // teks, tombol, tautan (kontras AA di atas putih)
    turquoiseSoft: '#E4F4F2',
    gold: '#B88A2E',           // garis & ornamen emas
    goldDeep: '#7A5A12',       // teks emas (kontras AA)
    goldSoft: '#F6EDD6',
    ink: '#1D2B2A',
    paper: '#FFFFFF',
    mist: '#F7F9F6',
    cream: '#FBF4E6',          // latar hangat bernuansa batik
    brown: '#6B4E12',          // coklat emas (banner)
    olive: '#5A5942'           // pita gelap (CTA)
  }
};

export const waLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
