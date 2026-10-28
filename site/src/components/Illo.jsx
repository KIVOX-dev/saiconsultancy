// Illustrated two-tone icons: dark outline, light-blue fill, small green accent.
// Colours come from CSS variables so cards on dark backgrounds can recolour them.
const O = 'var(--illo-o, #17294a)'
const F = 'var(--illo-f, #8ecdf0)'
const W = 'var(--illo-w, #ffffff)'
const G = 'var(--illo-g, #1bb961)'

const sparkle = (x, y) => <path d={`M${x} ${y - 5}v10M${x - 5} ${y}h10`} stroke={G} />

const ART = {
  target: (
    <>
      <circle cx="29" cy="35" r="20" fill={W} /><circle cx="29" cy="35" r="12" fill={F} /><circle cx="29" cy="35" r="4" fill={G} />
      <path d="M29 35 51 13M51 13v8M51 13h-8" />{sparkle(55, 34)}
    </>
  ),
  mic: (
    <>
      <rect x="23" y="7" width="18" height="30" rx="9" fill={F} />
      <path d="M15 30a17 17 0 0 0 34 0M32 47v9M23 56h18M28 17h8M28 23h8" />{sparkle(54, 14)}
    </>
  ),
  building: (
    <>
      <path d="M10 56V12h28v44" fill={W} /><path d="M38 26h16v30H38" fill={F} />
      <path d="M17 20h4M27 20h4M17 29h4M27 29h4M17 38h4M27 38h4M45 35h3M45 44h3M4 56h56" />
      <rect x="20" y="46" width="8" height="10" fill={F} />{sparkle(52, 12)}
    </>
  ),
  chat: (
    <>
      <path d="M8 10h30a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H22l-8 7v-7H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z" fill={F} />
      <path d="M46 24h8a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-3v7l-8-7H34a4 4 0 0 1-4-4v-3" fill={W} />
      <circle cx="14" cy="22" r="1.6" fill={O} /><circle cx="23" cy="22" r="1.6" fill={O} /><circle cx="32" cy="22" r="1.6" fill={O} />{sparkle(54, 10)}
    </>
  ),
  layers: (
    <>
      <path d="m8 42 24 12 24-12M8 32l24 12 24-12" /><path d="M32 8 56 20 32 32 8 20Z" fill={F} /><path d="m20 14 24 12" stroke={W} />{sparkle(54, 8)}
    </>
  ),
  users: (
    <>
      <circle cx="42" cy="20" r="7" fill={W} /><path d="M32 50c0-9 4-15 10-15s12 6 12 15" fill={W} />
      <circle cx="22" cy="24" r="8" fill={F} /><path d="M6 54c0-10 7-17 16-17s16 7 16 17Z" fill={F} />{sparkle(54, 8)}
    </>
  ),
  spark: (
    <>
      <path d="M32 8a17 17 0 0 0-9 31v6h18v-6a17 17 0 0 0-9-31Z" fill={F} />
      <path d="M26 52h12M28 58h8M27 28l5 5 5-5" /><path d="M8 24H3M61 24h-5M13 9l-3-3M51 9l3-3" stroke={G} />
    </>
  ),
  compass: (
    <>
      <circle cx="32" cy="33" r="22" fill={W} /><path d="M43 22 37 37 27 28Z" fill={F} /><path d="M21 44 27 29 37 38Z" fill={W} />
      <circle cx="32" cy="33" r="2" fill={O} /><path d="M32 11v4M32 51v4M10 33h4M50 33h4" />{sparkle(55, 10)}
    </>
  ),
  briefcase: (
    <>
      <rect x="6" y="20" width="52" height="34" rx="5" fill={F} /><path d="M23 20v-5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5M6 35h52" />
      <rect x="27" y="30" width="10" height="11" rx="2" fill={W} />{sparkle(54, 10)}
    </>
  ),
  code: (
    <>
      <rect x="5" y="10" width="54" height="44" rx="6" fill={W} /><path d="M5 22h54" /><path d="M5 16a6 6 0 0 1 6-6h42a6 6 0 0 1 6 6v6H5Z" fill={F} />
      <path d="m24 31-7 8 7 8M40 31l7 8-7 8" /><path d="m35 29-6 20" stroke={G} />
    </>
  ),
  laptop: (
    <>
      <rect x="11" y="12" width="42" height="30" rx="3" fill={F} /><path d="M5 48h54l-4 7H9Z" fill={W} />
      <path d="m18 35 8-8 6 5 10-12" /><circle cx="42" cy="20" r="2.2" fill={G} />
    </>
  ),
  flag: (
    <>
      <path d="M14 8v50M8 58h14" /><path d="M14 10h36l-9 10 9 10H14Z" fill={F} />{sparkle(54, 46)}
    </>
  ),
  award: (
    <>
      <path d="m23 38-4 19 13-6 13 6-4-19" fill={W} /><circle cx="32" cy="25" r="16" fill={F} /><circle cx="32" cy="25" r="8" fill={W} />
      <path d="m32 20 1.8 3.6 4 .6-2.9 2.8.7 4L32 29l-3.6 1.9.7-4-2.9-2.8 4-.6Z" fill={G} stroke="none" />
    </>
  ),
  book: (
    <>
      <path d="M13 8h36v46H18a5 5 0 0 1-5-5V8Z" fill={F} /><path d="M21 8v46M28 20h14M28 28h10" /><path d="M13 49a5 5 0 0 1 5-5h31" />{sparkle(55, 12)}
    </>
  ),
  pen: (
    <>
      <path d="m10 54 4-15L40 13l11 11-26 26-15 4Z" fill={F} /><path d="m10 54 4-15 11 11Z" fill={W} /><path d="m34 19 11 11" />{sparkle(53, 10)}
    </>
  ),
  pin: (
    <>
      <path d="M32 59S11 41 11 26a21 21 0 0 1 42 0c0 15-21 33-21 33Z" fill={F} /><circle cx="32" cy="26" r="7" fill={W} />{sparkle(56, 10)}
    </>
  ),
  phone: (
    <>
      <path d="M14 8h10l5 14-6 4a30 30 0 0 0 15 15l4-6 14 5v10a4 4 0 0 1-4 4C28 54 8 34 8 12a4 4 0 0 1 4-4Z" fill={F} />
      <path d="M40 8a16 16 0 0 1 16 16M40 16a8 8 0 0 1 8 8" stroke={G} />
    </>
  ),
  assistant: (
    <>
      <path d="M14 61c0-9 7-14 18-14s18 5 18 14Z" fill={F} />
      <circle cx="32" cy="28" r="15" fill={W} />
      <path d="M16 28a16 16 0 0 1 32 0" />
      <rect x="10" y="26" width="8" height="13" rx="3.5" fill={F} /><rect x="46" y="26" width="8" height="13" rx="3.5" fill={F} />
      <path d="M50 39c0 8-6 10-13 10" /><circle cx="35" cy="49" r="3" fill={G} />
      <circle cx="26.5" cy="29" r="1.7" fill={O} stroke="none" /><circle cx="37.5" cy="29" r="1.7" fill={O} stroke="none" />
      <path d="M28 35.5q4 3.2 8 0" />{sparkle(55, 9)}
    </>
  ),
  mail: (
    <>
      <rect x="6" y="14" width="52" height="36" rx="4" fill={W} /><path d="M6 18a4 4 0 0 1 4-4h44a4 4 0 0 1 4 4L32 38Z" fill={F} />{sparkle(56, 8)}
    </>
  ),
}

export default function Illo({ name, className = '', size }) {
  return (
    <svg
      className={`illo ${className}`} viewBox="0 0 64 64" width={size} height={size} fill="none"
      stroke={O} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      {ART[name] || ART.target}
    </svg>
  )
}
