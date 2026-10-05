// Sinkronisasi konten dari Airtable -> data/cms.json (+ unduh gambar ke public/images/cms).
// Tanpa AIRTABLE_TOKEN / AIRTABLE_BASE_ID: memakai content/seed.json (konten contoh).
// Dengan kredensial: jika gagal, build DIHENTIKAN agar situs live tidak tertimpa konten contoh.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { slugify } from '../src/lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seed = JSON.parse(fs.readFileSync(path.join(root, 'content/seed.json'), 'utf8'));
const outFile = path.join(root, 'data/cms.json');
const imgDir = path.join(root, 'public/images/cms');
fs.mkdirSync(path.dirname(outFile), { recursive: true });

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID;

// Nama tabel di Airtable (bisa diganti lewat env jika Anda memakai nama lain)
const TABLES = {
  settings: process.env.AIRTABLE_TABLE_SETTINGS || 'Site Settings',
  services: process.env.AIRTABLE_TABLE_SERVICES || 'Services',
  events: process.env.AIRTABLE_TABLE_EVENTS || 'Events',
  products: process.env.AIRTABLE_TABLE_PRODUCTS || 'Products',
  posts: process.env.AIRTABLE_TABLE_POSTS || 'Posts',
  testimonials: process.env.AIRTABLE_TABLE_TESTIMONIALS || 'Testimonials'
};

if (!TOKEN || !BASE) {
  fs.writeFileSync(outFile, JSON.stringify({ source: 'seed', ...seed }, null, 2));
  console.log('[cms] AIRTABLE_TOKEN / AIRTABLE_BASE_ID belum diset -> memakai konten contoh (content/seed.json).');
  process.exit(0);
}

async function fetchAll(table, { optional = false } = {}) {
  const records = [];
  let offset;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}`);
    url.searchParams.set('pageSize', '100');
    if (offset) url.searchParams.set('offset', offset);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (res.status === 404 && optional) return [];
    if (!res.ok) {
      throw new Error(`Airtable "${table}" gagal (${res.status}): ${(await res.text()).slice(0, 300)}`);
    }
    const json = await res.json();
    records.push(...json.records);
    offset = json.offset;
  } while (offset);
  return records;
}

const txt = (v) => (v == null ? '' : String(v).trim());
const bi = (f, name) => ({ id: txt(f[`${name} ID`]), en: txt(f[`${name} EN`]) });
const isPublished = (f) => f.Published === true;
const num = (v, d = 999) => (Number.isFinite(Number(v)) && v !== '' && v != null ? Number(v) : d);

async function localImages(att) {
  if (!Array.isArray(att)) return [];
  const out = [];
  for (const a of att) {
    if (!a?.url) continue;
    const ext = (path.extname(a.filename || '') || '.jpg').toLowerCase();
    const name = crypto.createHash('md5').update(a.id || a.url).digest('hex').slice(0, 12) + ext;
    const dest = path.join(imgDir, name);
    if (!fs.existsSync(dest)) {
      const res = await fetch(a.url);
      if (!res.ok) throw new Error(`Gagal mengunduh gambar ${a.filename} (${res.status})`);
      fs.mkdirSync(imgDir, { recursive: true });
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    }
    out.push(`/images/cms/${name}`);
  }
  return out;
}
const localImage = async (att) => (await localImages(Array.isArray(att) ? att.slice(0, 1) : att))[0] || '';

try {
  const [rs, rv, re, rp, rb, rt] = await Promise.all([
    fetchAll(TABLES.settings, { optional: true }),
    fetchAll(TABLES.services),
    fetchAll(TABLES.events),
    fetchAll(TABLES.products),
    fetchAll(TABLES.posts),
    fetchAll(TABLES.testimonials, { optional: true })
  ]);

  // Site Settings: Key | ID | EN  (menimpa nilai bawaan)
  const settings = { ...seed.settings };
  for (const r of rs) {
    const key = txt(r.fields.Key);
    if (!key) continue;
    settings[key] = { id: txt(r.fields.ID), en: txt(r.fields.EN) };
  }

  const services = [];
  for (const r of rv.filter((r) => isPublished(r.fields))) {
    const f = r.fields; const title = bi(f, 'Title');
    const slug = txt(f.Slug) || slugify(title.id || title.en);
    const fallback = seed.services.find((x) => x.slug === slug) || {};
    // Foto dari Airtable (kolom Image & Gallery); bila kosong, pakai foto bawaan di repo
    const image = (await localImage(f.Image)) || fallback.image || '';
    const alt = bi(f, 'Image Alt');
    const gal = await localImages(f.Gallery);
    const gallery = gal.length
      ? gal.map((src, i) => ({ src, alt: { id: `${title.id} ${i + 1}`, en: `${title.en || title.id} ${i + 1}` }, caption: { id: title.id, en: title.en || title.id } }))
      : fallback.gallery || [];
    services.push({
      slug, order: num(f.Order),
      title, summary: bi(f, 'Summary'), description: bi(f, 'Description'),
      lynkUrl: txt(f['Lynk URL']), icon: txt(f.Icon) || 'leaf',
      image, imageAlt: alt.id || alt.en ? alt : fallback.imageAlt || alt, gallery
    });
  }

  const events = [];
  for (const r of re.filter((r) => isPublished(r.fields))) {
    const f = r.fields; const title = bi(f, 'Title');
    events.push({
      slug: txt(f.Slug) || slugify(title.id || title.en), serviceSlug: txt(f['Service Slug']),
      title, description: bi(f, 'Description'),
      date: txt(f.Date).slice(0, 10), time: txt(f.Time), mode: txt(f.Mode) || 'Online', location: txt(f.Location),
      registrationUrl: txt(f['Registration URL']),
      image: await localImage(f.Image), imageAlt: bi(f, 'Image Alt')
    });
  }

  const products = [];
  for (const r of rb.filter((r) => isPublished(r.fields))) {
    const f = r.fields; const title = bi(f, 'Title');
    const pslug = txt(f.Slug) || slugify(title.id || title.en);
    const pfb = seed.products.find((x) => x.slug === pslug) || {};
    const pgal = await localImages(f.Gallery);
    // Foto dari Airtable (kolom Image lalu Gallery) selalu menggantikan foto bawaan
    const pmain = await localImage(f.Image);
    const psrcs = [...(pmain ? [pmain] : []), ...pgal];
    const pgallery = psrcs.length
      ? psrcs.map((src, i) => ({ src, alt: { id: `${title.id} ${i + 1}`, en: `${title.en || title.id} ${i + 1}` }, caption: { id: title.id, en: title.en || title.id } }))
      : pfb.gallery || [];
    products.push({
      gallery: pgallery,
      slug: pslug, order: num(f.Order),
      category: txt(f.Category) || 'singing-bowl',
      title, summary: bi(f, 'Summary'), description: bi(f, 'Description'),
      price: bi(f, 'Price'), orderUrl: txt(f['Order URL']),
      referenceUrl: txt(f['Reference URL']), referenceLabel: bi(f, 'Reference Label'),
      image: await localImage(f.Image), imageAlt: bi(f, 'Image Alt')
    });
  }

  const posts = [];
  for (const r of rp.filter((r) => isPublished(r.fields))) {
    const f = r.fields; const title = bi(f, 'Title');
    posts.push({
      slug: txt(f.Slug) || slugify(title.id || title.en), slugEn: txt(f['Slug EN']),
      date: txt(f['Publish Date']).slice(0, 10), instagramUrl: txt(f['Instagram URL']),
      tags: txt(f.Tags).split(',').map((t) => t.trim()).filter(Boolean),
      title, metaDescription: bi(f, 'Meta Description'), excerpt: bi(f, 'Excerpt'), body: bi(f, 'Body'),
      image: await localImage(f.Image), imageAlt: bi(f, 'Image Alt')
    });
  }

  // Testimoni: bila tabel belum ada / kosong, pakai testimoni bawaan
  const testimonials = [];
  for (const r of rt.filter((r) => isPublished(r.fields))) {
    const f = r.fields; const heading = bi(f, 'Heading');
    const slug = txt(f.Slug) || slugify(heading.id || heading.en || txt(f.Name));
    const fb = (seed.testimonials || []).find((x) => x.slug === slug) || {};
    testimonials.push({
      slug, order: num(f.Order), heading, quote: bi(f, 'Quote'), name: txt(f.Name), role: bi(f, 'Role'),
      image: (await localImage(f.Image)) || fb.image || ''
    });
  }
  const finalTestimonials = testimonials.length ? testimonials : seed.testimonials || [];

  fs.writeFileSync(outFile, JSON.stringify({ source: 'airtable', settings, services, events, products, posts, testimonials: finalTestimonials }, null, 2));
  console.log(`[cms] Airtable OK: ${services.length} layanan, ${events.length} acara, ${products.length} produk, ${posts.length} artikel.`);
} catch (err) {
  console.error(`[cms] ERROR: ${err.message}`);
  console.error('[cms] Build dihentikan agar situs yang sedang live tidak berubah. Periksa token, Base ID, dan nama tabel/kolom (docs/AIRTABLE-SETUP.md).');
  process.exit(1);
}
