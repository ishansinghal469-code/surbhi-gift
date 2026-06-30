import { useState } from "react";
import { Link } from "react-router-dom";

const categoryIcons = {
  food:        "🍵",
  shopping:    "🛍️",
  travel:      "🚗",
  gaming:      "🎮",
  books:       "📚",
  craft:       "🔮",
  gifts:       "💌",
  antiques:    "🕰️",
  other:       "✦",
};

function ExpenseCard({ expense }) {
  const [hovered, setHovered] = useState(false);

  const icon = categoryIcons[expense.category?.toLowerCase()] ?? "✦";

  return (
    <Link
      to={`/expenses/${expense.id}`}
      className="block no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          relative bg-teal-900/20 border rounded-xl
          px-4 py-3.5 flex items-center gap-4
          transition-all duration-300
          ${hovered
            ? "border-teal-500/50 shadow-lg shadow-teal-900/30 -translate-y-0.5"
            : "border-teal-700/20"}
        `}
      >
        {/* ── Icon ── */}
        <span className="text-xl shrink-0">{icon}</span>

        {/* ── Title + category ── */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="text-teal-50 text-sm italic font-serif leading-snug truncate">
            {expense.title}
          </span>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="
              text-[10px] tracking-[0.08em] uppercase
              text-teal-300/60 bg-teal-900/30
              border border-teal-700/20 rounded-full px-2.5 py-0.5
            ">
              {expense.category}
            </span>

            <span className="text-teal-500/40 text-[10px] tracking-wide">
              {new Date(expense.date).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* ── Amount ── */}
        <span className="text-teal-100 text-base font-serif italic shrink-0">
          ₹{expense.amount}
        </span>

        {/* ── Hover shimmer ── */}
        <div
          className={`
            absolute top-0 left-0 right-0 h-px
            bg-gradient-to-r from-transparent via-teal-500 to-transparent
            transition-opacity duration-300
            ${hovered ? "opacity-50" : "opacity-0"}
          `}
        />
      </div>
    </Link>
  );
}

export default ExpenseCard;
