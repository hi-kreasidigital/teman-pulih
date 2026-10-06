// Kerangka halaman: <head> SEO lengkap, header, footer, tombol WhatsApp.
import { site, waLink } from '../config/site.mjs';
import { t, routes, other } from './i18n.mjs';
import { esc } from './lib.mjs';
import { icons } from './art.mjs';

// href internal (memperhitungkan basePath bila situs di sub-path)
export const u = (p = '/') => site.basePath + p;
// URL absolut untuk canonical / OG / sitemap
export const abs = (p = '/') => site.url + p;

const logoImg = () => `<img class="logo-mark" src="${u('/images/logo-mark.png')}" alt="" width="44" height="44">`;

const navKeys = ['home', 'about', 'services', 'events', 'products', 'blog'];

function navHtml(lang, current) {
  return navKeys
    .map((k) => {
      const href = routes[k][lang];
      const active = current === k || (k !== 'home' && current?.startsWith?.(k)) ? ' aria-current="page"' : '';
      return `<a href="${u(href)}"${active}>${esc(t[lang].nav[k])}</a>`;
    })
    .join('');
}

export function layout(ctx) {
  const { lang, path, alt = {}, title, description, body, jsonld = [], ogImage, ogType = 'website', noindex = false, section = '', cssHref, preload = '' } = ctx;
  const T = t[lang];
  const canonical = abs(path);
  const image = ogImage || abs('/images/og-default.png');
  const absImage = /^https?:/.test(image) ? image : abs(image);

  // hreflang hanya untuk versi bahasa yang benar-benar ada
  const altLinks = [];
  for (const l of ['id', 'en']) if (alt[l]) altLinks.push(`<link rel="alternate" hreflang="${l}" href="${abs(alt[l])}">`);
  if (alt.id) altLinks.push(`<link rel="alternate" hreflang="x-default" href="${abs(alt.id)}">`);

  const otherLang = other(lang);
  const switchHref = alt[otherLang] || routes.home[otherLang];

  const ld = jsonld.length ? `<script type="application/ld+json">${JSON.stringify(jsonld.length === 1 ? jsonld[0] : jsonld).replace(/</g, '\\u003c')}</script>` : '';

  return `<!doctype html>
<html lang="${T.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="${site.colors.turquoiseDeep}">
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
${noindex ? '' : `<link rel="canonical" href="${canonical}">`}
${noindex ? '' : altLinks.join('\n')}
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${esc(absImage)}">
<meta property="og:locale" content="${T.ogLocale}">
${alt[otherLang] ? `<meta property="og:locale:alternate" content="${t[otherLang].ogLocale}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(absImage)}">
<link rel="icon" href="${u('/favicon.png')}" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="${u('/apple-touch-icon.png')}">
${preload}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Marcellus&family=Bree+Serif&display=swap">
<link rel="stylesheet" href="${cssHref}">
${ld}
</head>
<body>
<a class="skip" href="#main">${esc(T.skip)}</a>
<header class="site-header">
  <div class="wrap header-in">
    <a class="brand" href="${u(routes.home[lang])}" aria-label="${esc(site.name)}">${logoImg()}<span>${esc(site.name)}</span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${esc(T.menu)}"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      ${navHtml(lang, section)}
      <div class="nav-tools">
        <span class="lang" role="group" aria-label="${esc(T.langName)}">
          <a href="${u(alt.id || routes.home.id)}" hreflang="id" lang="id"${lang === 'id' ? ' aria-current="true"' : ''}>ID</a>
          <a href="${u(alt.en || routes.home.en)}" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="true"' : ''}>EN</a>
        </span>
        <a class="btn btn-sm" href="${waLink(T.wa.general)}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(T.waShort)}</span></a>
      </div>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <a class="footer-logo" href="${u(routes.home[lang])}" aria-label="${esc(site.name)}"><img src="${u('/images/logo-full.png')}" alt="${esc(site.name)} healing space" width="150" height="150" loading="lazy"></a>
      <p class="footer-tag">${esc(T.footer.tagline)}</p>
    </div>
    <div>
      <h2 class="footer-h">${esc(T.footer.explore)}</h2>
      <ul class="footer-list">${navKeys.slice(1).map((k) => `<li><a href="${u(routes[k][lang])}">${esc(T.nav[k])}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="footer-h">${esc(T.footer.contact)}</h2>
      <ul class="footer-list">
        <li><a class="with-icon" href="${waLink(T.wa.general)}" target="_blank" rel="noopener">${icons.whatsapp}<span>+${site.whatsapp.replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, '$1 $2-$3-$4')}</span></a></li>
        ${site.email ? `<li><a class="with-icon" href="mailto:${site.email}">${icons.mail}<span>${esc(site.email)}</span></a></li>` : ''}
        <li><a class="with-icon" href="${site.instagram}" target="_blank" rel="noopener me">${icons.instagram}<span>${esc(T.footer.instagram)}</span></a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-base"><p>&copy; ${new Date().getFullYear()} ${esc(site.name)}. ${esc(T.footer.rights)}</p><p class="credit"><a href="https://hi-kreasidigital.github.io/kreasi-digital-site/" target="_blank" rel="noopener">${esc(T.footer.credit)}</a></p></div>
</footer>
<a class="wa-float" href="${waLink(T.wa.general)}" target="_blank" rel="noopener" aria-label="${esc(T.chatWA)}">${icons.whatsapp}<span>${esc(T.waShort)}</span></a>
<script>
(function(){var b=document.querySelector('.menu-btn'),n=document.getElementById('site-nav');if(!b||!n)return;
function set(o){b.setAttribute('aria-expanded',String(o));n.classList.toggle('open',o);document.body.classList.toggle('nav-open',o);}
b.addEventListener('click',function(){set(b.getAttribute('aria-expanded')!=='true');});
n.addEventListener('click',function(e){if(e.target.closest('a'))set(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
document.addEventListener('click',function(e){if(!e.target.closest('.site-header'))set(false);});
window.addEventListener('resize',function(){if(window.innerWidth>980)set(false);});})();
</script>
</body>
</html>`;
}

// ---- JSON-LD ----
export const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#org`,
  name: site.name,
  url: site.url,
  logo: abs('/images/logo.png'),
  sameAs: [site.instagram, site.lynkStore],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: `+${site.whatsapp}`, ...(site.email ? { email: site.email } : {}), availableLanguage: ['id', 'en'] }]
});

export const websiteLd = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: lang,
  publisher: { '@id': `${site.url}/#org` }
});

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) }))
});

export const crumbs = (lang, trail) => {
  // trail: [{name, path}] setelah beranda
  const T = t[lang];
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${[{ name: T.breadcrumbHome, path: routes.home[lang] }, ...trail]
    .map((c, i, a) => (i === a.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${u(c.path)}">${esc(c.name)}</a></li>`))
    .join('')}</ol></nav>`;
};
