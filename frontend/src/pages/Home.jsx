import { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    to: "/memories",
    label: "Memories",
    sub: "our moments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <circle cx="8.5" cy="10.5" r="1.5"/>
        <path d="M21 15l-5-5L5 19"/>
      </svg>
    ),
  },
  {
    to: "/playlists",
    label: "Playlists",
    sub: "sounds we love",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="3" x2="12" y2="9"/>
      </svg>
    ),
  },
  {
    to: "/books",
    label: "Library",
    sub: "her bookshelf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    to: "/outfits",
    label: "Lookbook",
    sub: "her fits",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
      </svg>
    ),
  },
  {
    to: "/planner",
    label: "Planner",
    sub: "our plans",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    to: "/expenses",
    label: "Expenses",
    sub: "our spending",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    to: "/tarot",
    label: "Tarot",
    sub: "the cards speak",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/>
      </svg>
    ),
  },
  {
    to: "/letters",
    label: "Love Letters",
    sub: "words for her",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

function DomeSkyline() {
  return (
    <svg
      viewBox="0 0 680 80"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      className="w-full h-20 block"
      aria-hidden="true"
    >
      {[[60,12],[180,7],[340,4],[500,9],[620,14],[130,20],[420,16]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={i%2===0?1.2:0.8} fill="#0d9488" opacity={0.45+(i%3)*0.1}/>
      ))}
      <rect x="30" y="62" width="22" height="20" fill="#0a2e2a"/>
      <path d="M30,62 Q41,38 52,62 Z" fill="#0d9488" opacity="0.4"/>
      <line x1="41" y1="38" x2="41" y2="33" stroke="#0d9488" strokeWidth="1" opacity="0.5"/>
      <polygon points="39,33 41,28 43,33" fill="#0d9488" opacity="0.5"/>
      <rect x="80" y="50" width="34" height="30" fill="#0b2620"/>
      <path d="M80,50 Q97,20 114,50 Z" fill="#0d9488" opacity="0.55"/>
      <line x1="97" y1="20" x2="97" y2="14" stroke="#0d9488" strokeWidth="1.2" opacity="0.6"/>
      <polygon points="94.5,14 97,8 99.5,14" fill="#0d9488" opacity="0.6"/>
      <rect x="148" y="40" width="48" height="40" fill="#0d2e2a"/>
      <path d="M148,40 Q172,6 196,40 Z" fill="#0d9488" opacity="0.7"/>
      <line x1="172" y1="6" x2="172" y2="0" stroke="#0d9488" strokeWidth="1.5"/>
      <polygon points="169,0 172,-6 175,0" fill="#0d9488" opacity="0.65"/>
      <rect x="270" y="32" width="60" height="48" fill="#0a2420"/>
      <path d="M270,32 Q300,-4 330,32 Z" fill="#0d9488" opacity="0.85"/>
      <ellipse cx="300" cy="32" rx="8" ry="4" fill="#071a18" opacity="0.4"/>
      <line x1="300" y1="-4" x2="300" y2="-11" stroke="#0d9488" strokeWidth="1.5" opacity="0.85"/>
      <polygon points="297,-11 300,-17 303,-11" fill="#0d9488" opacity="0.85"/>
      <rect x="286" y="50" width="8" height="11" rx="4" fill="#0d9488" opacity="0.25"/>
      <rect x="302" y="50" width="8" height="11" rx="4" fill="#0d9488" opacity="0.25"/>
      <rect x="342" y="44" width="44" height="36" fill="#0b2822"/>
      <path d="M342,44 Q364,12 386,44 Z" fill="#0d9488" opacity="0.65"/>
      <line x1="364" y1="12" x2="364" y2="6" stroke="#0d9488" strokeWidth="1.2" opacity="0.6"/>
      <polygon points="361.5,6 364,0 366.5,6" fill="#0d9488" opacity="0.6"/>
      <rect x="460" y="52" width="32" height="28" fill="#0a2420"/>
      <path d="M460,52 Q476,24 492,52 Z" fill="#0d9488" opacity="0.5"/>
      <line x1="476" y1="24" x2="476" y2="18" stroke="#0d9488" strokeWidth="1" opacity="0.5"/>
      <polygon points="473.5,18 476,12 478.5,18" fill="#0d9488" opacity="0.5"/>
      <rect x="560" y="60" width="24" height="22" fill="#0a2e2a"/>
      <path d="M560,60 Q572,38 584,60 Z" fill="#0d9488" opacity="0.4"/>
      <line x1="572" y1="38" x2="572" y2="32" stroke="#0d9488" strokeWidth="1" opacity="0.45"/>
      <polygon points="570,32 572,27 574,32" fill="#0d9488" opacity="0.45"/>
      <rect x="0" y="79" width="680" height="1" fill="#0d9488" opacity="0.2"/>
    </svg>
  );
}

function NavCard({ to, label, sub, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={to} className="no-underline">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          relative overflow-hidden rounded-md p-4 flex flex-col gap-3
          border transition-all duration-200 cursor-pointer
          ${hovered
            ? "bg-teal-800/20 border-teal-500/50 -translate-y-0.5"
            : "bg-teal-900/10 border-teal-700/20"}
        `}
      >
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-60" />

        {/* Icon */}
        <div className="text-teal-400 opacity-85">
          {icon}
        </div>

        {/* Text */}
        <div>
          <p className="font-serif italic text-[15px] font-normal text-teal-50 mb-0.5 tracking-wide">
            {label}
          </p>
          <p className="text-[11px] text-teal-100/40 tracking-wider">
            {sub}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#071a18] font-serif">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <DomeSkyline />

        {/* Floating corner stars */}
        <span className="absolute top-[18%] left-[5%] text-teal-500 opacity-35 pointer-events-none text-sm">✦</span>
        <span className="absolute top-[60%] left-[2%] text-teal-500 opacity-35 pointer-events-none text-xs">✦</span>
        <span className="absolute top-[25%] right-[6%] text-teal-500 opacity-35 pointer-events-none text-sm">✦</span>
        <span className="absolute top-[70%] right-[3%] text-teal-500 opacity-35 pointer-events-none text-xs">✦</span>

        <div className="relative text-center px-6 pt-4 pb-10">

          {/* Ornament */}
          <p className="text-[10px] tracking-[8px] text-teal-500 opacity-80 mb-3">
            ✦ &nbsp; ✦ &nbsp; ✦
          </p>

          {/* Name */}
          <h1 className="font-serif italic font-normal text-[clamp(26px,6vw,38px)] text-teal-50 tracking-wide leading-tight m-0">
            Supi
          </h1>

          {/* Divider + tagline */}
          <div className="flex items-center justify-center gap-2 my-3 max-w-sm mx-auto">
            <div className="flex-1 h-px bg-teal-500/30" />
            <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
            <p className="italic text-[12px] text-teal-100/50 tracking-wide whitespace-nowrap m-0">
              i love you  
            </p>
            <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
            <div className="flex-1 h-px bg-teal-500/30" />
          </div>

        </div>
      </div>

      {/* ── GRID ── */}
      <div className="px-5 pb-12 max-w-xl mx-auto">

        {/* Nav label */}
        <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/50 text-center mb-5">
          — navigate —
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {sections.map((s) => (
            <NavCard key={s.to} {...s} />
          ))}
        </div>

        {/* Footer */}
        <p className="text-center mt-10 italic text-[12px] text-teal-500/35 tracking-wide">
          made with love &nbsp;✦&nbsp; teal &amp; candlelight
        </p>

      </div>
    </div>
  );
}
