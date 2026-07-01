import { useState } from "react";
import { Link } from "react-router-dom";

const categoryIcons = {
  study: "📖",
  work: "💼",
  gaming: "🎮",
  reading: "📚",
  selfcare: "🌿",
  craft: "🔮",
  other: "✦",
};

const priorityStyles = {
  high: { dot: "bg-red-400/70", label: "text-red-400/70", text: "high" },
  medium: { dot: "bg-amber-400/70", label: "text-amber-400/70", text: "medium" },
  low: { dot: "bg-teal-400/70", label: "text-teal-400/70", text: "low" },
};

function DayCard({ day }) {
  const [hovered, setHovered] = useState(false);

  const icon = categoryIcons[day.category] ?? "✦";
  const p = priorityStyles[day.priority] ?? priorityStyles.medium;

  return (
    <div
      className={`
        relative bg-teal-900/20 border rounded-xl overflow-hidden
        transition-all duration-300
        ${day.completed
          ? "border-teal-700/10 opacity-60"
          : hovered
            ? "border-teal-500/50 shadow-lg shadow-teal-900/40"
            : "border-teal-700/20"
        }
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Completed banner ── */}
      {day.completed && (
        <div className="bg-teal-800/30 border-b border-teal-700/20 px-4 py-1.5 flex items-center gap-2">
          <svg className="w-3 h-3 text-teal-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-teal-400/70 text-[10px] tracking-widest uppercase italic">
            completed
          </span>
        </div>
      )}

      <div className="px-4 py-4 flex gap-4">

        {/* ── Time column ── */}
        <div className="flex flex-col items-center shrink-0 gap-1 pt-0.5">
          <span className="text-teal-100/70 text-xs font-serif italic tracking-wide">
            {day.start_time}
          </span>
          <div className="flex-1 w-px bg-teal-700/30 min-h-[20px]" />
          <span className="text-teal-100/40 text-xs font-serif italic tracking-wide">
            {day.end_time}
          </span>
        </div>

        {/* ── Main content ── */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">

          {/* Title as link */}
          <h2
            className={`
    font-serif italic font-normal text-base leading-snug
    transition-colors duration-200 m-0
    ${hovered ? "text-teal-200" : "text-teal-50"}
    ${day.completed ? "line-through text-teal-100/40" : ""}
  `}
          >
            {icon} &nbsp;{day.title}
          </h2>

          {/* Description */}
          {day.description && (
            <p className="text-teal-100/50 text-xs leading-relaxed line-clamp-2 font-serif italic m-0">
              {day.description}
            </p>
          )}

          {/* Meta row — category + priority */}
          <div className="flex items-center gap-3 flex-wrap mt-0.5">
            <span className="
              text-[10px] tracking-[0.08em] uppercase
              text-teal-300/60 bg-teal-900/30
              border border-teal-700/20 rounded-full px-2.5 py-0.5
            ">
              {day.category}
            </span>

            <span className={`flex items-center gap-1 text-[10px] tracking-wide ${p.label}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dot}`} />
              {p.text}
            </span>

            {/* Completed badge (when not completed) */}
            {!day.completed && (
              <span className="text-teal-500/35 text-[10px] tracking-wide ml-auto">
                in progress
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Hover shimmer ── */}
      <div
        className={`
          absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-teal-500 to-transparent
          transition-opacity duration-300
          ${hovered && !day.completed ? "opacity-50" : "opacity-0"}
        `}
      />
    </div>
  );
}

export default DayCard;
