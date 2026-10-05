// Utilitas bersama: escape HTML, slug, markdown ringan, tanggal, Instagram.

export const esc = (v = '') =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const slugify = (s = '') =>
  String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' dan ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

const safeUrl = (u) => /^(https?:\/\/|mailto:|\/|#)/i.test(u);

function inline(raw) {
  let s = esc(raw);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, url) => {
    const u = url.replace(/&amp;/g, '&');
    return safeUrl(u) ? `<img src="${esc(u)}" alt="${alt}" loading="lazy" decoding="async">` : m;
  });
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, url) => {
    const u = url.replace(/&amp;/g, '&');
    if (!safeUrl(u)) return m;
    const ext = /^https?:\/\//i.test(u);
    return `<a href="${esc(u)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  return s;
}

// Markdown ringan: heading (#..###), paragraf, list, kutipan, garis, gambar, link, bold/italic.
export function md(src = '') {
  const lines = String(src).replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let para = [];
  let list = null;
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<${list.type}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.type}>`); list = null; } };
  for (const line of lines) {
    const t = line.trim();
    let m;
    if (!t) { flushPara(); flushList(); continue; }
    if ((m = t.match(/^(#{1,3})\s+(.*)$/))) {
      flushPara(); flushList();
      const level = Math.min(m[1].length + 1, 3); // # -> h2 (h1 dipakai judul halaman)
      out.push(`<h${level}>${inline(m[2])}</h${level}>`);
    } else if ((m = t.match(/^[-*]\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== 'ul') { flushList(); list = { type: 'ul', items: [] }; }
      list.items.push(m[1]);
    } else if ((m = t.match(/^\d+[.)]\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== 'ol') { flushList(); list = { type: 'ol', items: [] }; }
      list.items.push(m[1]);
    } else if ((m = t.match(/^>\s?(.*)$/))) {
      flushPara(); flushList();
      out.push(`<blockquote><p>${inline(m[1])}</p></blockquote>`);
    } else if (/^(-{3,}|\*{3,})$/.test(t)) {
      flushPara(); flushList(); out.push('<hr>');
    } else {
      flushList(); para.push(t);
    }
  }
  flushPara(); flushList();
  return out.join('\n');
}

export const stripMd = (s = '') =>
  String(s).replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`]/g, '').replace(/^\s*[-\d.)]+\s+/gm, '').replace(/\s+/g, ' ').trim();

export const truncate = (s = '', n = 160) => {
  const t = String(s).replace(/\s+/g, ' ').trim();
  if (t.length <= n) return t;
  return t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
};

export function fmtDate(iso, lang, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return '';
  const d = new Date(`${String(iso).slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', { ...opts, timeZone: 'UTC' }).format(d);
}

export function instagramEmbed(url = '') {
  const m = String(url).match(/instagram\.com\/(?:[^/]+\/)?(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/i);
  if (!m) return null;
  const kind = m[1].toLowerCase() === 'reels' ? 'reel' : m[1].toLowerCase();
  return { code: m[2], permalink: `https://www.instagram.com/${kind}/${m[2]}/`, embed: `https://www.instagram.com/${kind}/${m[2]}/embed/` };
}

export const todayISO = () => new Date().toISOString().slice(0, 10);
