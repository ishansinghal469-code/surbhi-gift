import { useState } from "react";

function TaskCard({ task, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task.id);
  };

  const priorityStyles = {
    high:   { dot: "bg-red-400/70",    label: "text-red-400/70"   },
    medium: { dot: "bg-amber-400/70",  label: "text-amber-400/70" },
    low:    { dot: "bg-teal-400/70",   label: "text-teal-400/70"  },
  };

  const categoryIcons = {
    study:    "📖",
    work:     "💼",
    gaming:   "🎮",
    reading:  "📚",
    selfcare: "🌿",
    craft:    "🔮",
    other:    "✦",
  };

  const p = priorityStyles[task.priority] ?? priorityStyles.medium;
  const icon = categoryIcons[task.category] ?? "✦";

  return (
    <div
      className={`
        relative bg-teal-900/20 border border-teal-700/20 rounded-xl
        px-4 py-4 flex items-start justify-between gap-4
        transition-all duration-300
        ${deleting ? "opacity-40 scale-95" : "opacity-100 scale-100"}
      `}
    >
      {/* ── Left: icon + text ── */}
      <div className="flex items-start gap-3 flex-1 min-w-0">

        {/* Category icon */}
        <span className="text-lg mt-0.5 shrink-0">{icon}</span>

        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-teal-50 text-sm italic font-serif leading-snug truncate">
            {task.title}
          </span>

          {/* Meta row — priority + due date */}
          <div className="flex items-center gap-2 flex-wrap">
            {task.priority && (
              <span className={`flex items-center gap-1 text-[10px] tracking-wide ${p.label}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${p.dot} shrink-0`} />
                {task.priority}
              </span>
            )}

            {task.due_date && (
              <span className="text-teal-500/40 text-[10px] tracking-wide">
                due {new Date(task.due_date).toLocaleDateString("en-US", {
                  month: "short", day: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Description if present */}
          {task.description && (
            <p className="text-teal-100/45 text-xs leading-relaxed line-clamp-2 mt-0.5 font-serif italic">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* ── Right: done button ── */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="
          shrink-0 flex items-center gap-1.5
          bg-teal-800/30 hover:bg-teal-700/50
          border border-teal-600/30 hover:border-teal-500/50
          text-teal-300/70 hover:text-teal-100
          text-[11px] italic tracking-wide font-serif
          px-3 py-1.5 rounded-lg
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        done
      </button>

      {/* ── Top shimmer line ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent rounded-t-xl" />
    </div>
  );
}

export default TaskCard;
