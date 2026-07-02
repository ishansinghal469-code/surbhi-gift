import { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    to: "/memories",
    label: "Memories",
    sub: "toooooo manyyyyy",
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
    sub: "perfect",
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
    sub: "books!!!!",
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
    sub: "you look amazing whatever you wear",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
      </svg>
    ),
  },
  {
    to: "/planner",
    label: "Planner",
    sub: "plan yo shi",
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
    sub: "mota paisa",
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
    sub: "I believe in it",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/>
      </svg>
    ),
  },
  {
    to: "/letters",
    label: "..",
    sub: "words",
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

function LighthouseScene() {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a2e2a" />
          <stop offset="55%" stopColor="#071f1c" />
          <stop offset="100%" stopColor="#04110f" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d4a44" />
          <stop offset="45%" stopColor="#0a3530" />
          <stop offset="100%" stopColor="#051b18" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf6f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fbbf6f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="400" height="320" fill="url(#sky)" />

      {/* sea */}
      <rect x="0" y="300" width="400" height="300" fill="url(#sea)" />

      {/* wave layers */}
      <path d="M0,330 Q50,318 100,330 T200,330 T300,330 T400,330 V600 H0 Z" fill="#0c4540" opacity="0.55" />
      <path d="M0,380 Q60,365 120,380 T240,380 T360,380 T400,378 V600 H0 Z" fill="#0a3a35" opacity="0.55" />
      <path d="M0,450 Q70,435 140,450 T280,450 T400,448 V600 H0 Z" fill="#072925" opacity="0.6" />
      <path d="M0,520 Q80,508 160,520 T320,520 T400,518 V600 H0 Z" fill="#041815" opacity="0.7" />

      {/* foam streaks */}
      <path d="M40,340 Q90,335 130,345 Q170,355 220,345" stroke="#7fd9c9" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M180,400 Q230,392 270,402 Q310,412 360,400" stroke="#7fd9c9" strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M20,470 Q70,460 120,472 Q170,484 220,470" stroke="#7fd9c9" strokeWidth="1.5" fill="none" opacity="0.2" />

      {/* rock outcrop */}
      <path d="M150,330 L175,300 L195,318 L210,295 L235,330 L260,322 L270,340 L130,340 Z" fill="#04110f" />

      {/* lighthouse base/house */}
      <rect x="168" y="280" width="44" height="36" fill="#0e2622" />
      <path d="M165,280 L190,265 L215,280 Z" fill="#7a2e2e" />

      {/* lighthouse tower */}
      <rect x="183" y="200" width="14" height="84" fill="#0e2622" />
      <rect x="183" y="200" width="14" height="6" fill="#7fd9c9" opacity="0.3" />
      <rect x="183" y="218" width="14" height="6" fill="#7fd9c9" opacity="0.2" />
      <rect x="183" y="236" width="14" height="6" fill="#7fd9c9" opacity="0.2" />

      {/* lantern room + glow */}
      <circle cx="190" cy="192" r="22" fill="url(#glow)" />
      <rect x="181" y="184" width="18" height="14" rx="2" fill="#fbbf6f" opacity="0.85" />
      <path d="M178,184 L190,170 L202,184 Z" fill="#0e2622" />
      <line x1="190" y1="170" x2="190" y2="160" stroke="#7fd9c9" strokeWidth="1.2" opacity="0.6" />
      <polygon points="187,160 190,153 193,160" fill="#7fd9c9" opacity="0.6" />

      {/* light beam sweep */}
      <polygon points="190,192 60,120 130,150" fill="#fbbf6f" opacity="0.08" />
      <polygon points="190,192 340,140 270,170" fill="#fbbf6f" opacity="0.08" />
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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-60" />
        <div className="text-teal-400 opacity-85">{icon}</div>
        <div>
          <p className="font-serif italic text-[15px] font-normal text-teal-50 mb-0.5 tracking-wide">
            {label}
          </p>
          <p className="text-[11px] text-teal-100/40 tracking-wider">{sub}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#071a18] font-serif">

      {/* ── HERO with lighthouse scene + dome skyline ── */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <LighthouseScene />

        {/* skyline silhouette layered over the painting, anchored to bottom */}
        <div className="absolute inset-x-0 bottom-0 opacity-70">
          <DomeSkyline />
        </div>

        {/* vignette so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071a18]/20 via-transparent to-[#071a18]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071a18]/40 via-transparent to-[#071a18]/40" />

        {/* floating accent badge, echoing the "Save" chip */}
        <span className="absolute top-5 right-5 rounded-full bg-teal-600 px-4 py-1.5 text-xs font-sans font-semibold tracking-wide text-teal-50 shadow-lg shadow-black/30">
          for my best person
        </span>

        {/* floating stars */}
        <span className="absolute top-[18%] left-[5%] text-teal-300 opacity-50 pointer-events-none text-sm">✦</span>
        <span className="absolute top-[60%] left-[3%] text-teal-300 opacity-40 pointer-events-none text-xs">✦</span>
        <span className="absolute top-[25%] right-[8%] text-teal-300 opacity-40 pointer-events-none text-sm">✦</span>

        {/* title block */}
        <div className="absolute inset-x-0 bottom-16 px-6 text-center">
          <p className="text-[10px] tracking-[8px] text-teal-300 opacity-80 mb-3">
            ✦ &nbsp; ✦ &nbsp; ✦
          </p>
          <h1 className="font-serif italic font-normal text-[clamp(28px,7vw,42px)] text-teal-50 tracking-wide leading-tight m-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Supi
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3 max-w-sm mx-auto">
            <div className="flex-1 h-px bg-teal-300/30" />
            <div className="w-1.5 h-1.5 bg-teal-300 rotate-45 shrink-0" />
            <p className="italic text-[12px] text-teal-100/70 tracking-wide whitespace-nowrap m-0">
              i love you
            </p>
            <div className="w-1.5 h-1.5 bg-teal-300 rotate-45 shrink-0" />
            <div className="flex-1 h-px bg-teal-300/30" />
          </div>
        </div>

        {/* floating pill buttons, echoing "Visit site" / share */}
        <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="px-5 pb-12 pt-10 max-w-xl mx-auto">
        <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/50 text-center mb-5">
          — navigate —
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {sections.map((s) => (
            <NavCard key={s.to} {...s} />
          ))}
        </div>

        <p className="text-center mt-10 italic text-[12px] text-teal-500/35 tracking-wide">
          this thing was so hard to make i love you a lot , i hope you like it 
        </p>
      </div>
    </div>
  );
}