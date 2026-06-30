import { useState } from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/books/${book.id}`}
      className="block no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          bg-teal-900/20 rounded-xl border overflow-hidden
          transition-all duration-300
          ${hovered ? "border-teal-500/50 shadow-lg shadow-teal-900/40 -translate-y-1" : "border-teal-700/20"}
        `}
      >
        {/* ── Cover image ── */}
        {book.cover_image ? (
          <div className="relative overflow-hidden">
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* rating badge over cover */}
            <div className="absolute top-2 right-2 bg-[#071a18]/75 rounded-full px-2 py-0.5 flex items-center gap-1">
              <span className="text-amber-400/80 text-[10px]">★</span>
              <span className="text-teal-100 text-[10px] tracking-wide">
                {book.rating}/5
              </span>
            </div>
          </div>
        ) : (
          // No cover — styled placeholder spine
          <div className="w-full aspect-[2/3] bg-teal-950/40 border-b border-teal-700/20 flex flex-col items-center justify-center gap-2 p-4">
            <svg className="w-8 h-8 text-teal-500/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <p className="text-[10px] tracking-[6px] text-teal-500/40 uppercase">no cover</p>
          </div>
        )}

        {/* ── Text content ── */}
        <div className="p-4">
          <h2 className="text-lg text-teal-50 italic font-normal leading-snug mb-1">
            {book.title}
          </h2>

          <p className="text-teal-100/50 text-sm tracking-wide mb-2">
            by {book.author}
          </p>

          {/* Rating row (shown again below for cards with no cover image) */}
          {!book.cover_image && (
            <p className="text-amber-400/70 text-sm flex items-center gap-1">
              <span>★</span>
              <span className="text-teal-100/60">{book.rating}/5</span>
            </p>
          )}
        </div>

        {/* ── Hover shimmer line ── */}
        <div
          className={`
            h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent
            transition-opacity duration-300
            ${hovered ? "opacity-50" : "opacity-0"}
          `}
        />
      </div>
    </Link>
  );
}

export default BookCard;