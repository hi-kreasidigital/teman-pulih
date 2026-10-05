// Template halaman. Menerima data CMS, mengembalikan daftar halaman siap-render.
import { site, waLink } from '../config/site.mjs';
import { t, routes, L, other } from './i18n.mjs';
import { esc, md, stripMd, truncate, fmtDate, instagramEmbed, todayISO } from './lib.mjs';
import { icons, hero, panelArt } from './art.mjs';
import { u, abs, crumbs, breadcrumbLd, orgLd, websiteLd } from './layout.mjs';

const LANGS = ['id', 'en'];
const svcPath = (lang, slug) => `${routes.services[lang]}${slug}/`;
const postPath = (lang, p) => `${routes.blog[lang]}${(lang === 'en' && p.slugEn) || p.slug}/`;
const withName = (title) => (title.length + site.name.length + 3 <= 66 ? `${title} | ${site.name}` : title);
const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999);
const hasPost = (p, lang) => Boolean(p.title?.[lang] && p.body?.[lang]);

export function buildPages(cms) {
  const pages = [];
  const today = todayISO();
  const settings = cms.settings || {};
  const S = (key, lang) => L(settings[key], lang);

  const services = [...cms.services].sort(byOrder);
  const products = [...cms.products].sort(byOrder);
  const testimonials = [...(cms.testimonials || [])].sort(byOrder);
  const events = [...cms.events].sort((a, b) => a.date.localeCompare(b.date));
  const posts = [...cms.posts].sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today).reverse();

  const wa = (lang, key, name) => waLink(name ? t[lang].wa[key](name) : t[lang].wa[key]);
  const imgUrl = (p) => (p ? u(p) : '');
  const sectionHead = (title, lead, link = '') =>
    `<div class="sec-head"><div><h2>${esc(title)}</h2>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div>${link}</div>`;
  const note = (lang) => (S('disclaimer', lang) ? `<p class="note">${esc(S('disclaimer', lang))}</p>` : '');
  const ctaBand = (lang, title, body, key = 'group') => `<section class="cta-band"><div class="wrap cta-in"><div><h2>${esc(title)}</h2><p>${esc(body)}</p></div>
    <a class="btn btn-gold" href="${wa(lang, key)}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(t[lang].chatWA)}</span></a></div></section>`;


  // Galeri foto produk (singing bowl / grafir)
  const prodGallery = (p, lang) => {
    const g = (p.gallery && p.gallery.length ? p.gallery : p.image ? [{ src: p.image, alt: p.imageAlt }] : []).slice(0, 4);
    if (!g.length) return panelArt(p.category === 'engraving' ? 'stone' : 'bowl', p.category === 'engraving' ? 'turquoise' : 'gold');
    return `<div class="prod-gallery n${g.length}">${g.map((x) => `<figure><img src="${imgUrl(x.src)}" alt="${esc(L(x.alt, lang) || L(p.title, lang))}" width="600" height="600" loading="lazy" decoding="async"></figure>`).join('')}</div>`;
  };

  // Satu seksi per produk (beranda: ringkas, halaman produk: lengkap)
  const productSection = (p, lang, i, full) => {
    const T = t[lang];
    const name = L(p.title, lang);
    const orderHref = p.orderUrl || wa(lang, 'product', name);
    const tone = i % 2 ? '' : ' section-mist';
    return `<section class="section prod-sec${tone}${i % 2 ? ' flip' : ''}" id="${esc(p.slug)}"><div class="wrap prod-sec-in">
      <div class="prod-copy"><h2>${esc(name)}</h2><p class="lead">${esc(L(p.summary, lang))}</p>
        ${full ? `<div class="prose">${md(L(p.description, lang))}</div>` : ''}
        ${full && L(p.price, lang) ? `<p class="price">${esc(T.products.price)}: ${esc(L(p.price, lang))}</p>` : ''}
        <div class="actions"><a class="btn" href="${orderHref}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(T.products.orderWA)}</span></a>
        ${full ? (p.referenceUrl ? `<a class="btn btn-ghost" href="${esc(p.referenceUrl)}" target="_blank" rel="noopener">${esc(L(p.referenceLabel, lang) || p.referenceUrl)}</a>` : '') : `<a class="btn btn-ghost" href="${u(routes.products[lang])}#${esc(p.slug)}">${esc(T.detail)}</a>`}</div></div>
      <div class="prod-visual">${prodGallery(p, lang)}</div></div></section>`;
  };

  // Testimoni (di atas footer)
  const testiSection = (lang) => !testimonials.length ? '' : `<section class="testi" aria-labelledby="testi-h"><div class="wrap">
    <h2 id="testi-h">${esc(S('testimonial_title', lang) || t[lang].home.testimonialsTitle)}</h2>
    <div class="testi-grid">${testimonials.map((x) => `<article class="testi-card">
      <h3>${esc(L(x.heading, lang))}</h3>
      ${x.image ? `<div class="testi-img"><img src="${imgUrl(x.image)}" alt="${esc(L(x.heading, lang))}" width="640" height="256" loading="lazy" decoding="async"></div>` : ''}
      <blockquote class="testi-quote"><p lang="id">${esc(x.quote.id)}</p>${x.quote.en ? `<p class="testi-en" lang="en">${esc(x.quote.en)}</p>` : ''}
        <footer><strong>${esc(x.name)}</strong>${L(x.role, lang) ? `<span>${esc(L(x.role, lang))}</span>` : ''}</footer></blockquote></article>`).join('')}</div></div></section>`;

  // ---------- komponen ----------
  const serviceRow = (s, lang) => `<article class="svc-row${s.image ? ' has-photo' : ''}">
    ${s.image ? `<a class="svc-thumb" href="${u(svcPath(lang, s.slug))}" tabindex="-1" aria-hidden="true"><img src="${imgUrl(s.image)}" alt="" width="360" height="270" loading="lazy" decoding="async"></a>` : `<span class="svc-icon">${icons[s.icon] || icons.leaf}</span>`}
    <div class="svc-main"><h3><a href="${u(svcPath(lang, s.slug))}">${esc(L(s.title, lang))}</a></h3><p>${esc(L(s.summary, lang))}</p></div>
    <a class="link" href="${u(svcPath(lang, s.slug))}">${esc(t[lang].detail)}<span class="sr"> ${esc(L(s.title, lang))}</span></a></article>`;

  const momentTile = (m, lang) => `<figure class="moment"><a href="${u(svcPath(lang, m.svc.slug))}"><span class="moment-img"><img src="${imgUrl(m.src)}" alt="${esc(L(m.alt, lang))}" width="700" height="580" loading="lazy" decoding="async"></span>
    <figcaption><span class="moment-cap">${esc(L(m.caption, lang))}</span><span class="moment-link">${esc(t[lang].home.viewService)}</span></figcaption></a></figure>`;

  const eventRow = (ev, lang, isPast = false) => {
    const T = t[lang];
    const svc = services.find((s) => s.slug === ev.serviceSlug);
    const registerHref = ev.registrationUrl || wa(lang, 'event', L(ev.title, lang));
    return `<article class="event-row${isPast ? ' is-past' : ''}" id="${esc(ev.slug)}">
      <time class="date-block" datetime="${esc(ev.date)}"><span class="d-day">${fmtDate(ev.date, lang, { day: 'numeric' })}</span><span class="d-mon">${fmtDate(ev.date, lang, { month: 'short' })}</span><span class="d-year">${fmtDate(ev.date, lang, { year: 'numeric' })}</span></time>
      <div class="event-main">
        <h3>${esc(L(ev.title, lang))}</h3>
        <p>${esc(L(ev.description, lang))}</p>
        <ul class="meta">
          ${ev.time ? `<li>${icons.clock}<span>${esc(ev.time)}</span></li>` : ''}
          <li>${icons.pin}<span>${esc(T.events.modes[ev.mode] || ev.mode)}${ev.location ? `: ${esc(ev.location)}` : ''}</span></li>
          ${svc ? `<li>${icons[svc.icon] || icons.leaf}<span>${esc(T.events.service)}: <a href="${u(svcPath(lang, svc.slug))}">${esc(L(svc.title, lang))}</a></span></li>` : ''}
        </ul>
      </div>
      ${isPast ? '' : `<a class="btn btn-sm btn-ghost" href="${registerHref}" target="_blank" rel="noopener">${esc(ev.registrationUrl ? T.events.registerLink : T.events.register)}</a>`}
    </article>`;
  };

  const postItem = (p, lang) => `<article class="post-item">
    <time datetime="${esc(p.date)}">${fmtDate(p.date, lang)}</time>
    <h3><a href="${u(postPath(lang, p))}">${esc(p.title[lang])}</a></h3>
    <p>${esc(L(p.excerpt, lang) || truncate(stripMd(p.body[lang]), 150))}</p>
    ${p.tags?.length ? `<ul class="tags">${p.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</article>`;

  const eventLd = (ev, lang) => {
    const mode = { Online: 'OnlineEventAttendanceMode', Offline: 'OfflineEventAttendanceMode', Hybrid: 'MixedEventAttendanceMode' }[ev.mode] || 'OnlineEventAttendanceMode';
    const virtual = { '@type': 'VirtualLocation', url: abs(routes.events[lang]) };
    const place = { '@type': 'Place', name: ev.location || site.name, address: ev.location || site.name };
    return {
      '@context': 'https://schema.org', '@type': 'Event', name: L(ev.title, lang), description: L(ev.description, lang),
      startDate: ev.date, eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: `https://schema.org/${mode}`,
      location: ev.mode === 'Online' ? virtual : ev.mode === 'Hybrid' ? [virtual, place] : place,
      organizer: { '@id': `${site.url}/#org` }, url: `${abs(routes.events[lang])}#${ev.slug}`,
      ...(ev.image ? { image: [abs(ev.image)] } : {})
    };
  };

  for (const lang of LANGS) {
    const T = t[lang];
    const both = (key) => ({ id: routes[key].id, en: routes[key].en });

    // ================= HOME =================
    {
      const nextEvents = upcoming.slice(0, 3);
      const moments = services.flatMap((sv) => (sv.gallery || []).map((g) => ({ ...g, svc: sv })));
      const latest = posts.filter((p) => hasPost(p, lang)).slice(0, 3);
      const body = `
<section class="banner"><div class="banner-bg" aria-hidden="true"></div>
  <div class="banner-copy"><p class="banner-kicker">${esc(S('hero_kicker', lang))}</p><h1>${esc(S('hero_title', lang))}</h1>
    <p class="banner-by">${esc(S('hero_byline', lang))}</p><p class="banner-lead">${esc(S('hero_subtitle', lang))}</p>
    <div class="actions"><a class="btn" href="${wa(lang, 'general')}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(T.chatWA)}</span></a>
    <a class="banner-link" href="#portofolio"><span>${esc(T.home.portfolio)}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6"/></svg></a></div></div>
  <div class="banner-photo"><img src="${u('/images/hero-fikri.jpg')}" alt="${esc(T.home.heroAlt)}" width="962" height="1468" fetchpriority="high" decoding="async"></div></section>
<section class="section"><div class="wrap split"><h2>${esc(S('intro_title', lang))}</h2>
  <div class="prose"><p>${esc(S('intro_body', lang))}</p><h3>${esc(S('audience_title', lang))}</h3><p>${esc(S('audience_body', lang))}</p>
  <p><a class="btn btn-ghost" href="${wa(lang, 'group')}" target="_blank" rel="noopener">${esc(T.askWA)}</a></p></div></div></section>
<section class="section section-mist"><div class="wrap">${sectionHead(T.home.servicesTitle, T.home.servicesLead)}
  <div class="svc-list">${services.map((s) => serviceRow(s, lang)).join('')}</div></div></section>
${nextEvents.length ? `<section class="section"><div class="wrap">${sectionHead(T.home.eventsTitle, '', `<a class="link" href="${u(routes.events[lang])}">${esc(T.seeAllEvents)}</a>`)}
  <div class="event-list">${nextEvents.map((e) => eventRow(e, lang)).join('')}</div></div></section>` : ''}
${moments.length ? `<section class="section moments" id="portofolio"><div class="wrap">${sectionHead(T.home.momentsTitle, T.home.momentsLead)}<div class="moments-grid">${moments.map((m) => momentTile(m, lang)).join('')}</div></div></section>` : ''}
${products.map((p, i) => productSection(p, lang, i, false)).join('')}
${latest.length ? `<section class="section"><div class="wrap">${sectionHead(T.home.blogTitle, T.home.blogLead, `<a class="link" href="${u(routes.blog[lang])}">${esc(T.seeAllPosts)}</a>`)}
  <div class="post-list">${latest.map((p) => postItem(p, lang)).join('')}</div></div></section>` : ''}
${ctaBand(lang, T.home.ctaTitle, T.home.ctaBody)}
${testiSection(lang)}`;
      pages.push({ lang, path: routes.home[lang], alt: both('home'), section: 'home', title: T.home.title, description: T.home.description, body, jsonld: [orgLd(), websiteLd(lang)],
        preload: `<link rel="preload" as="image" href="${u('/images/hero-fikri.jpg')}" fetchpriority="high">` });
    }

    // ================= ABOUT =================
    {
      const values = S('about_values', lang).split(';').map((v) => v.split('|')).filter((v) => v[0]?.trim());
      const body = `<div class="wrap page-top">${crumbs(lang, [{ name: T.nav.about, path: routes.about[lang] }])}
  <h1>${esc(S('about_title', lang))}</h1></div>
<section class="section-tight"><div class="wrap split"><div class="prose prose-lg">${md(S('about_body', lang))}</div>
  <aside class="aside-art" aria-hidden="true">${hero}</aside></div></section>
<section class="section section-mist"><div class="wrap"><h2>${esc(T.about.valuesTitle)}</h2>
  <div class="values">${values.map((v) => `<div class="value"><h3>${esc(v[0].trim())}</h3><p>${esc((v[1] || '').trim())}</p></div>`).join('')}</div></div></section>
<section class="section-tight"><div class="wrap split"><h2>${esc(S('audience_title', lang))}</h2><div class="prose"><p>${esc(S('audience_body', lang))}</p>${note(lang)}</div></div></section>
${ctaBand(lang, T.about.ctaTitle, T.about.ctaBody)}
${testiSection(lang)}`;
      pages.push({ lang, path: routes.about[lang], alt: both('about'), section: 'about', title: T.about.title, description: T.about.description, body,
        jsonld: [breadcrumbLd([{ name: T.breadcrumbHome, path: routes.home[lang] }, { name: T.nav.about, path: routes.about[lang] }])] });
    }

    // ================= LAYANAN (indeks) =================
    {
      const body = `<div class="wrap page-top">${crumbs(lang, [{ name: T.nav.services, path: routes.services[lang] }])}
  <h1>${esc(T.services.h1)}</h1><p class="lead">${esc(T.services.lead)}</p></div>
<section class="section-tight"><div class="wrap"><div class="svc-list">${services.map((s) => serviceRow(s, lang)).join('')}</div>${note(lang)}</div></section>
${ctaBand(lang, T.home.ctaTitle, T.home.ctaBody)}
${testiSection(lang)}`;
      pages.push({ lang, path: routes.services[lang], alt: both('services'), section: 'services', title: T.services.title, description: T.services.description, body,
        jsonld: [breadcrumbLd([{ name: T.breadcrumbHome, path: routes.home[lang] }, { name: T.nav.services, path: routes.services[lang] }]),
          { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(svcPath(lang, s.slug)), name: L(s.title, lang) })) }] });
    }

    // ================= LAYANAN (detail) =================
    for (const s of services) {
      const name = L(s.title, lang);
      const related = upcoming.filter((e) => e.serviceSlug === s.slug).slice(0, 3);
      const others = services.filter((x) => x.slug !== s.slug);
      const extra = (s.gallery || []).filter((g) => g.src !== s.image);
      const path = svcPath(lang, s.slug);
      const visual = s.image ? `<img class="detail-img" src="${imgUrl(s.image)}" alt="${esc(L(s.imageAlt, lang) || name)}" width="1200" height="900" loading="eager" decoding="async">` : '';
      const body = `<div class="wrap page-top">${crumbs(lang, [{ name: T.nav.services, path: routes.services[lang] }, { name, path }])}
  <h1>${esc(name)}</h1><p class="lead">${esc(L(s.summary, lang))}</p></div>
<section class="section-tight"><div class="wrap detail-grid">
  <article class="prose prose-lg">${visual}${md(L(s.description, lang))}</article>
  <aside class="book-box"><span class="svc-icon">${icons[s.icon] || icons.leaf}</span><h2>${esc(T.services.booking)}</h2><p>${esc(T.services.bookingBody)}</p>
    <div class="stack">${s.lynkUrl ? `<a class="btn" href="${esc(s.lynkUrl)}" target="_blank" rel="noopener">${esc(T.bookLynk)}</a>` : ''}
    <a class="btn btn-ghost" href="${wa(lang, 'service', name)}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(T.askWA)}</span></a></div>${note(lang)}</aside></div></section>
${extra.length ? `<section class="section-tight"><div class="wrap"><h2>${esc(T.services.gallery)}</h2><div class="gallery">${extra.map((g) => `<figure><img src="${imgUrl(g.src)}" alt="${esc(L(g.alt, lang))}" width="700" height="580" loading="lazy" decoding="async"><figcaption>${esc(L(g.caption, lang))}</figcaption></figure>`).join('')}</div></div></section>` : ''}
${related.length ? `<section class="section section-mist"><div class="wrap"><h2>${esc(T.services.upcoming)}</h2><div class="event-list">${related.map((e) => eventRow(e, lang)).join('')}</div></div></section>` : ''}
<section class="section"><div class="wrap"><h2>${esc(T.services.others)}</h2><div class="svc-list">${others.map((x) => serviceRow(x, lang)).join('')}</div></div></section>`;
      pages.push({ lang, path, alt: { id: svcPath('id', s.slug), en: svcPath('en', s.slug) }, section: 'services', title: withName(name), description: truncate(L(s.summary, lang), 158),
        ogImage: s.image || undefined, body,
        jsonld: [breadcrumbLd([{ name: T.breadcrumbHome, path: routes.home[lang] }, { name: T.nav.services, path: routes.services[lang] }, { name, path }]),
          { '@context': 'https://schema.org', '@type': 'Service', name, description: truncate(stripMd(L(s.description, lang)), 300), url: abs(path), provider: { '@id': `${site.url}/#org` }, areaServed: 'ID', inLanguage: lang }] });
    }

    // ================= EVENTS =================
    {
      const body = `<div class="wrap page-top">${crumbs(lang, [{ name: T.nav.events, path: routes.events[lang] }])}
  <h1>${esc(T.events.h1)}</h1><p class="lead">${esc(T.events.lead)}</p></div>
<section class="section-tight"><div class="wrap"><h2>${esc(T.events.upcoming)}</h2>
  ${upcoming.length ? `<div class="event-list">${upcoming.map((e) => eventRow(e, lang)).join('')}</div>` : `<p class="empty">${esc(T.events.none)}</p>`}
  ${past.length ? `<h2 class="mt">${esc(T.events.past)}</h2><div class="event-list">${past.slice(0, 6).map((e) => eventRow(e, lang, true)).join('')}</div>` : ''}</div></section>
${ctaBand(lang, T.home.ctaTitle, T.home.ctaBody)}`;
      pages.push({ lang, path: routes.events[lang], alt: both('events'), section: 'events', title: T.events.title, description: T.events.description, body,
        jsonld: [breadcrumbLd([{ name: T.breadcrumbHome, path: routes.home[lang] }, { name: T.nav.events, path: routes.events[lang] }]), ...upcoming.map((e) => eventLd(e, lang))] });
    }

    // ================= PRODUCTS =================
    {
      const shopCard = (p, g) => {
        const name = L(g.alt, lang) || L(p.title, lang);
        return `<article class="shop-card"><figure class="shop-img"><img src="${imgUrl(g.src)}" alt="${esc(name)}" width="600" height="600" loading="lazy" decoding="async"></figure>
          <h3>${esc(name)}</h3>
          <a class="btn" href="${wa(lang, 'buy', name)}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(T.products.buyNow)}</span></a></article>`;
      };
      const blocks = products.map((p, i) => {
        const items = (p.gallery && p.gallery.length ? p.gallery : p.image ? [{ src: p.image, alt: p.title }] : []);
        return `<section class="section shop-sec${i % 2 === 0 ? ' section-mist' : ''}" id="${esc(p.slug)}"><div class="wrap">
          <div class="shop-head"><h2>${esc(L(p.title, lang))}</h2><p class="lead">${esc(L(p.summary, lang))}</p>
          ${L(p.price, lang) ? `<p class="price">${esc(T.products.price)}: ${esc(L(p.price, lang))}</p>` : ''}
          ${p.referenceUrl ? `<p><a class="link" href="${esc(p.referenceUrl)}" target="_blank" rel="noopener">${esc(L(p.referenceLabel, lang) || p.referenceUrl)}</a></p>` : ''}</div>
          ${items.length ? `<div class="shop-grid">${items.map((g) => shopCard(p, g)).join('')}</div>` : `<p class="empty"><a class="btn" href="${p.orderUrl || wa(lang, 'buy', L(p.title, lang))}" target="_blank" rel="noopener">${esc(T.products.buyNow)}</a></p>`}
          </div></section>`;
      }).join('');
      const body = `<div class="wrap page-top">${crumbs(lang, [{ name: T.nav.products, path: routes.products[lang] }])}
  <h1>${esc(T.products.h1)}</h1><p class="lead">${esc(T.products.lead)}</p></div>${blocks}
${testiSection(lang)}`;
      pages.push({ lang, path: routes.products[lang], alt: both('products'), section: 'products', title: T.products.title, description: T.products.description, body,
        jsonld: [breadcrumbLd([{ name: T.breadcrumbHome, path: routes.home[lang] }, { name: T.nav.products, path: routes.products[lang] }])] });
    }

    // ================= BLOG (indeks) =================
    {
      const list = posts.filter((p) => hasPost(p, lang));
      const body = `<div class="wrap page-top">${crumbs(lang, [{ name: T.nav.blog, path: routes.blog[lang] }])}
  <h1>${esc(T.blog.h1)}</h1><p class="lead">${esc(T.blog.lead)}</p></div>
<section class="section-tight"><div class="wrap">${list.length ? `<div class="post-list post-list-lg">${list.map((p) => postItem(p, lang)).join('')}</div>` : `<p class="empty">${esc(T.blog.none)}</p>`}</div></section>
${ctaBand(lang, T.blog.cta, T.blog.ctaBody)}`;
      pages.push({ lang, path: routes.blog[lang], alt: both('blog'), section: 'blog', title: T.blog.title, description: T.blog.description, body,
        jsonld: [breadcrumbLd([{ name: T.breadcrumbHome, path: routes.home[lang] }, { name: T.nav.blog, path: routes.blog[lang] }])] });
    }

    // ================= BLOG (artikel) =================
    for (const p of posts.filter((p) => hasPost(p, lang))) {
      const title = p.title[lang];
      const path = postPath(lang, p);
      const ig = instagramEmbed(p.instagramUrl);
      const desc = truncate(p.metaDescription?.[lang] || p.excerpt?.[lang] || stripMd(p.body[lang]), 158);
      const more = posts.filter((x) => x.slug !== p.slug && hasPost(x, lang)).slice(0, 2);
      const alt = {};
      for (const l of LANGS) if (hasPost(p, l)) alt[l] = postPath(l, p);
      const embed = ig ? `<figure class="ig"><iframe src="${ig.embed}" title="${esc(T.blog.watch)}" loading="lazy" allowtransparency="true" scrolling="no" allow="encrypted-media"></iframe>
        <figcaption><a href="${ig.permalink}" target="_blank" rel="noopener">${esc(T.blog.openIG)}</a></figcaption></figure>` : '';
      const hero_img = p.image ? `<img class="detail-img" src="${imgUrl(p.image)}" alt="${esc(L(p.imageAlt, lang) || title)}" width="1200" height="675" loading="eager" decoding="async">` : '';
      const body = `<div class="wrap page-top">${crumbs(lang, [{ name: T.nav.blog, path: routes.blog[lang] }, { name: truncate(title, 48), path }])}
  <h1>${esc(title)}</h1><p class="byline"><time datetime="${esc(p.date)}">${esc(T.blog.published)} ${fmtDate(p.date, lang)}</time></p></div>
<section class="section-tight"><div class="wrap article-grid"><article class="prose prose-lg">${hero_img}${md(p.body[lang])}</article>
  <aside class="article-aside">${embed}<div class="book-box"><h2>${esc(T.blog.cta)}</h2><p>${esc(T.blog.ctaBody)}</p><div class="stack">
    <a class="btn" href="${u(routes.services[lang])}">${esc(T.seeServices)}</a>
    <a class="btn btn-ghost" href="${wa(lang, 'general')}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(T.chatWA)}</span></a></div></div></aside></div></section>
${more.length ? `<section class="section section-mist"><div class="wrap"><h2>${esc(T.blog.more)}</h2><div class="post-list">${more.map((x) => postItem(x, lang)).join('')}</div></div></section>` : ''}`;
      pages.push({ lang, path, alt, section: 'blog', title: withName(title), description: desc, ogType: 'article', ogImage: p.image || undefined, lastmod: p.date, body,
        jsonld: [breadcrumbLd([{ name: T.breadcrumbHome, path: routes.home[lang] }, { name: T.nav.blog, path: routes.blog[lang] }, { name: title, path }]),
          { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title, description: desc, datePublished: p.date, dateModified: p.date, inLanguage: lang,
            mainEntityOfPage: abs(path), author: { '@id': `${site.url}/#org` }, publisher: { '@id': `${site.url}/#org` },
            ...(p.image ? { image: [abs(p.image)] } : {}), ...(p.tags?.length ? { keywords: p.tags.join(', ') } : {}) }] });
    }
  }

  return pages;
}

export function notFoundPage() {
  const lang = 'id';
  const T = t[lang];
  const body = `<section class="section"><div class="wrap narrow"><h1>${esc(T.notFound.title)}</h1><p class="lead">${esc(T.notFound.body)}</p>
    <p><a class="btn" href="${u('/')}">${esc(T.notFound.back)}</a></p></div></section>`;
  return { lang, path: '/404.html', alt: {}, title: `${T.notFound.title} | ${site.name}`, description: T.notFound.body, body, noindex: true, section: '' };
}
