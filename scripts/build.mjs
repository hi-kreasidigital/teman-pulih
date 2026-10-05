// Generator situs statis (tanpa dependency). Membaca data/cms.json -> menulis dist/.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { site } from '../config/site.mjs';
import { layout, abs } from '../src/layout.mjs';
import { buildPages, notFoundPage } from '../src/pages.mjs';
import { kawungDataUri } from '../src/art.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const cmsFile = path.join(root, 'data/cms.json');
if (!fs.existsSync(cmsFile)) { console.error('data/cms.json belum ada. Jalankan: npm run sync'); process.exit(1); }
const cms = JSON.parse(fs.readFileSync(cmsFile, 'utf8'));

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// 1) aset statis
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });

// 2) CSS: variabel warna dari config + stylesheet
const c = site.colors;
const rootVars = `:root{--turq:${c.turquoise};--turq-deep:${c.turquoiseDeep};--turq-soft:${c.turquoiseSoft};--gold:${c.gold};--gold-deep:${c.goldDeep};--gold-soft:${c.goldSoft};--ink:${c.ink};--paper:${c.paper};--mist:${c.mist};--kawung:${kawungDataUri('%23B88A2E', '.32')};--kawung-light:${kawungDataUri('%23D9B55C', '.28')}}\n`;
const css = rootVars + fs.readFileSync(path.join(root, 'src/styles/main.css'), 'utf8');
const hash = crypto.createHash('md5').update(css).digest('hex').slice(0, 8);
fs.mkdirSync(path.join(dist, 'css'), { recursive: true });
fs.writeFileSync(path.join(dist, 'css', `main.${hash}.css`), css);
const cssHref = `${site.basePath}/css/main.${hash}.css`;

// 3) halaman
const pages = [...buildPages(cms), notFoundPage()];
const today = new Date().toISOString().slice(0, 10);
for (const p of pages) {
  const html = layout({ ...p, cssHref });
  const file = p.path.endsWith('.html') ? path.join(dist, p.path) : path.join(dist, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// 4) sitemap.xml (dengan hreflang), robots.txt, CNAME, .nojekyll
const indexable = pages.filter((p) => !p.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable.map((p) => `<url><loc>${abs(p.path)}</loc><lastmod>${p.lastmod || today}</lastmod>${Object.entries(p.alt || {}).map(([l, href]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(href)}"/>`).join('')}${p.alt?.id ? `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.alt.id)}"/>` : ''}</url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
if (site.customDomain) fs.writeFileSync(path.join(dist, 'CNAME'), site.host + '\n');

console.log(`[build] ${pages.length} halaman -> dist/  (sumber konten: ${cms.source}, domain: ${site.url})`);
