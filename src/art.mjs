// Ilustrasi & ikon SVG inline (tanpa file gambar eksternal).
const stroke = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';

export const icons = {
  leaf: `<svg viewBox="0 0 48 48" ${stroke} aria-hidden="true"><path d="M10 38C10 20 22 9 40 8c0 18-9 30-26 30"/><path d="M10 38 28 20"/></svg>`,
  wave: `<svg viewBox="0 0 48 48" ${stroke} aria-hidden="true"><path d="M4 24c4-8 8-8 12 0s8 8 12 0 8-8 12 0 4 4 4 4"/><path d="M4 34c4-6 8-6 12 0s8 6 12 0 8-6 12 0" opacity=".55"/><path d="M4 14c4-6 8-6 12 0s8 6 12 0 8-6 12 0" opacity=".55"/></svg>`,
  stone: `<svg viewBox="0 0 48 48" ${stroke} aria-hidden="true"><ellipse cx="24" cy="34" rx="15" ry="6"/><ellipse cx="24" cy="24" rx="11" ry="4.5"/><ellipse cx="24" cy="15" rx="7" ry="3"/></svg>`,
  bowl: `<svg viewBox="0 0 48 48" ${stroke} aria-hidden="true"><ellipse cx="24" cy="20" rx="16" ry="4"/><path d="M8 20c1 10 7 16 16 16s15-6 16-16"/><path d="M16 41h16"/><path d="M36 6 27 17"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8" fill="currentColor"/></svg>`,
  store: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><path d="M4 9.5 5.5 4h13L20 9.5M4 9.5c0 1.4 1.1 2.5 2.5 2.5S9 10.9 9 9.5c0 1.4 1.1 2.5 3 2.5s3-1.1 3-2.5c0 1.4 1.1 2.5 2.5 2.5S20 10.9 20 9.5M5.5 12v8h13v-8"/></svg>`
};

export const logoMark = `<svg class="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" stroke="#12948E" stroke-width="1.5"/><circle cx="20" cy="20" r="12" stroke="#12948E" stroke-width="1.5" opacity=".6"/><circle cx="20" cy="20" r="6" stroke="#B88A2E" stroke-width="1.5"/><circle cx="20" cy="20" r="1.8" fill="#B88A2E"/></svg>`;

// Ilustrasi hero: singing bowl dengan riak suara (satu momen animasi saat dimuat).
export const hero = `<svg class="hero-art" viewBox="0 0 600 600" role="img" aria-label="Singing bowl dengan riak suara / Singing bowl with sound ripples" fill="none">
  <g class="ripples" stroke-width="1.5">
    <circle class="rp rp1" cx="300" cy="300" r="140" stroke="#B88A2E"/>
    <circle class="rp rp2" cx="300" cy="300" r="195" stroke="#12948E" stroke-opacity=".75"/>
    <circle class="rp rp3" cx="300" cy="300" r="250" stroke="#12948E" stroke-opacity=".45"/>
    <circle class="rp rp4" cx="300" cy="300" r="294" stroke="#12948E" stroke-opacity=".22"/>
  </g>
  <g stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="300" cy="438" rx="92" ry="13" fill="#F6EDD6" stroke="#B88A2E" stroke-width="1.5"/>
    <path d="M164 318c4 70 62 112 136 112s132-42 136-112Z" fill="#FFFFFF" stroke="#0B5F5C" stroke-width="2"/>
    <path d="M180 352c20 40 68 62 120 62" stroke="#12948E" stroke-opacity=".5" stroke-width="1.5"/>
    <ellipse cx="300" cy="318" rx="136" ry="27" fill="#E4F4F2" stroke="#0B5F5C" stroke-width="2"/>
    <ellipse cx="300" cy="320" rx="108" ry="19" stroke="#B88A2E" stroke-width="1.5"/>
    <path d="M470 232 352 304" stroke="#B88A2E" stroke-width="7"/>
    <circle cx="352" cy="304" r="9" fill="#F6EDD6" stroke="#B88A2E" stroke-width="2"/>
  </g>
</svg>`;

// Panel ilustrasi pengganti foto (dipakai bila Airtable tidak memiliki gambar)
export const panelArt = (icon, tone = 'turquoise') => `<div class="panel-art panel-${tone}" aria-hidden="true"><span class="panel-icon">${icons[icon] || icons.leaf}</span></div>`;

export const kawungDataUri = (hex = '%23B88A2E', opacity = '.35') =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none' stroke='${decodeURIComponent(hex)}' stroke-opacity='${opacity}' stroke-width='1'><ellipse cx='32' cy='16' rx='8' ry='16'/><ellipse cx='32' cy='48' rx='8' ry='16'/><ellipse cx='16' cy='32' rx='16' ry='8'/><ellipse cx='48' cy='32' rx='16' ry='8'/></svg>`)}")`;
