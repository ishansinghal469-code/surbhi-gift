import { useState } from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/books/${book.id}`}
      className="block no-underline break-inside-avoid mb-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 group">

        {/* ── Cover image (fills card, no border/padding) ── */}
        {book.cover_image ? (
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-full object-cover block"
            style={{
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.35s ease",
            }}
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-200 flex flex-col items-center justify-center gap-2 p-4">
            <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <p className="text-[10px] tracking-[3px] text-gray-400 uppercase">no cover</p>
          </div>
        )}

        {/* ── Dark gradient overlay on hover, for legibility ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        />

        {/* ── Save-style button (top-right, appears on hover) ── */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-4px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <div className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md">
            View
          </div>
        </div>

        {/* ── Rating badge (top-left, always visible) ── */}
        {book.rating != null && (
          <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
            <span className="text-amber-500 text-[11px]">★</span>
            <span className="text-gray-800 text-[11px] font-medium">{book.rating}</span>
          </div>
        )}

        {/* ── Title / author overlay (bottom, on hover) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 14px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          <h2 className="text-white text-sm font-semibold leading-snug truncate m-0">
            {book.title}
          </h2>
          <p className="text-white/75 text-xs mt-0.5 truncate m-0">
            {book.author}
          </p>
        </div>

        {/* ── More options (•••) bottom-left, shown when NOT hovered — Pinterest quirk ── */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            opacity: hovered ? 0 : 0,
          }}
        />
      </div>

      {/* ── Always-visible caption below card (since these are books, not pure images) ── */}
      <div className="pt-2 px-1">
        <h3 className="text-gray-900 text-sm font-medium leading-snug truncate m-0">
          {book.title}
        </h3>
        <p className="text-gray-500 text-xs mt-0.5 truncate m-0">
          {book.author}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;