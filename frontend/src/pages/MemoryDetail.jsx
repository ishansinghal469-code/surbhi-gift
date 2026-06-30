import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MemoryDetail() {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/memories/${id}/`);
        setMemory(response.data);
      } catch (error) {
        console.error("Error fetching memory:", error);
      }
    };

    fetchMemory();
  }, [id]);

  // ── Loading ──
  if (!memory) {
    return (
      <div className="min-h-screen bg-[#071a18] flex flex-col items-center justify-center gap-4">
        <p className="text-teal-500/50 text-2xl animate-pulse">✦</p>
        <p className="font-serif italic text-teal-100/40 text-sm tracking-widest">
          finding this memory...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071a18] font-serif">

      {/* ── HEADER ── */}
      <div className="relative text-center pt-10 pb-6 px-6">
        <Link
          to="/memories"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← back
        </Link>

        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>

        {/* Date above title */}
        <p className="text-teal-500/40 text-[10px] tracking-widest uppercase mb-2">
          {new Date(memory.created_at).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0 leading-snug">
          {memory.title}
        </h1>

        <div className="flex items-center gap-2 justify-center my-4 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <div className="flex-1 h-px bg-teal-500/25" />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-5 pb-20 max-w-xl mx-auto flex flex-col gap-8">

        {/* Description */}
        <p className="text-teal-100/65 text-base leading-relaxed italic text-center">
          {memory.description}
        </p>

        {/* ── Photo grid ── */}
        {memory.photos?.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/50">
              photos &nbsp;·&nbsp; {memory.photos.length}
            </p>

            {memory.photos.length === 1 ? (
              // Single photo — full width
              <img
                src={memory.photos[0].image}
                alt={memory.title}
                className="w-full rounded-xl border border-teal-700/20 object-cover"
              />
            ) : (
              // Multiple photos — Pinterest masonry
              <div className="columns-2 gap-3">
                {memory.photos.map((photo, i) => (
                  <div key={photo.id} className="break-inside-avoid mb-3">
                    <img
                      src={photo.image}
                      alt={`${memory.title} — photo ${i + 1}`}
                      className="w-full rounded-xl border border-teal-700/20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Videos ── */}
        {memory.videos?.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/50">
              videos &nbsp;·&nbsp; {memory.videos.length}
            </p>

            <div className="flex flex-col gap-4">
              {memory.videos.map((video, i) => (
                <div
                  key={video.id}
                  className="rounded-xl overflow-hidden border border-teal-700/20"
                >
                  <video
                    controls
                    className="w-full"
                  >
                    <source src={video.video_file} type="video/mp4" />
                    Your browser does not support videos.
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No media state */}
        {memory.photos?.length === 0 && memory.videos?.length === 0 && (
          <div className="text-center py-10 border border-dashed border-teal-700/20 rounded-xl">
            <p className="text-teal-500/30 text-2xl mb-2">✦</p>
            <p className="font-serif italic text-teal-100/25 text-sm">
              just words, no photos
            </p>
          </div>
        )}

        {/* ── Divider ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-teal-500/15" />
          <div className="w-1 h-1 bg-teal-500/30 rotate-45" />
          <div className="flex-1 h-px bg-teal-500/15" />
        </div>

        {/* ── Back button ── */}
        <Link
          to="/memories"
          className="
            no-underline text-center w-full py-3 rounded-lg font-serif italic
            tracking-wide text-sm border transition-all duration-200
            bg-teal-900/20 hover:bg-teal-800/30
            border-teal-700/25 hover:border-teal-500/40
            text-teal-300/70 hover:text-teal-200
          "
        >
          ← back to memories
        </Link>

      </div>
    </div>
  );
}

export default MemoryDetail;