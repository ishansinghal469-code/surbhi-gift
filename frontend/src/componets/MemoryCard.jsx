import { useState } from "react";
import { Link } from "react-router-dom";

function MemoryCard({ memory }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/memories/${memory.id}`}
      className="block no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          bg-teal-900/20 rounded-xl border overflow-hidden
          transition-all duration-300
          ${hovered ? "border-teal-500/50 shadow-lg shadow-teal-900/40 -translate-y-0.5" : "border-teal-700/20"}
        `}
      >
        {/* ── Photo ── */}
        {memory.photos?.length > 0 && (
          <div className="relative overflow-hidden">
            <img
              src={memory.photos[0].image}
              alt={memory.title}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* multiple photos badge */}
            {memory.photos.length > 1 && (
              <div className="absolute top-2 right-2 bg-[#071a18]/75 rounded-full px-2 py-0.5">
                <span className="text-teal-400 text-[10px] tracking-wide">
                  +{memory.photos.length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Video (only if no photo) ── */}
        {memory.photos?.length === 0 && memory.videos?.length > 0 && (
          <div className="relative">
            <video
              width="100%"
              controls
              className="w-full rounded-t-xl"
            >
              <source src={memory.videos[0].video_file} type="video/mp4" />
              Your browser does not support videos.
            </video>
            {/* video badge */}
            <div className="absolute top-2 right-2 bg-[#071a18]/75 rounded-full px-2 py-0.5 flex items-center gap-1">
              <svg className="w-3 h-3 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-teal-400 text-[10px] tracking-wide">video</span>
            </div>
          </div>
        )}

        {/* ── Text content ── */}
        <div className="p-4">
          {/* no-media label */}
          {memory.photos?.length === 0 && memory.videos?.length === 0 && (
            <p className="text-[10px] tracking-[6px] text-teal-500/50 uppercase mb-2">
              ✦ memory ✦
            </p>
          )}

          <h2 className="text-xl text-teal-50 italic font-normal leading-snug mb-2">
            {memory.title}
          </h2>

          <p className="text-teal-100/60 text-sm leading-relaxed line-clamp-3 mb-3">
            {memory.description}
          </p>

          {/* date + arrow row */}
          <div className="flex items-center justify-between">
            <p className="text-teal-500/40 text-[10px] tracking-widest uppercase">
              {new Date(memory.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <span
              className={`text-teal-500 text-xs transition-transform duration-200 ${
                hovered ? "translate-x-1" : "translate-x-0"
              }`}
            >
              →
            </span>
          </div>
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

export default MemoryCard;
