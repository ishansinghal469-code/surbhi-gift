import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddMemory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Create memory
      const response = await axios.post(
        "http://127.0.0.1:8000/api/memories/",
        { title, description, created_at: createdAt }
      );

      const memoryId = response.data.id;

      // Upload photos
      for (const photo of photos) {
        const formData = new FormData();
        formData.append("image", photo);
        formData.append("memory", memoryId);
        await axios.post("http://127.0.0.1:8000/api/photos/", formData);
      }

      // Upload videos
      for (const video of videos) {
        const formData = new FormData();
        formData.append("video_file", video);
        formData.append("memory", memoryId);
        await axios.post("http://127.0.0.1:8000/api/videos/", formData);
      }

      navigate("/memories");

    } catch (error) {
      console.log(error.response?.data);
      setError("something went wrong. please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071a18] font-serif flex flex-col">

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
        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0">
          Add a Memory
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            capture the moment
          </p>
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <div className="flex-1 h-px bg-teal-500/25" />
        </div>
      </div>

      {/* ── FORM ── */}
      <div className="px-5 pb-16 max-w-lg mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Error message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3">
              <p className="text-red-300/80 text-sm italic">{error}</p>
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              title
            </label>
            <input
              type="text"
              placeholder="what shall we call this memory..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="
                bg-teal-900/15 border border-teal-700/25 rounded-lg
                px-4 py-3 text-sm text-teal-100 placeholder-teal-500/35
                focus:outline-none focus:border-teal-500/50
                italic tracking-wide font-serif transition-colors
              "
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              description
            </label>
            <textarea
              placeholder="tell the story of this moment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="
                bg-teal-900/15 border border-teal-700/25 rounded-lg
                px-4 py-3 text-sm text-teal-100 placeholder-teal-500/35
                focus:outline-none focus:border-teal-500/50
                italic tracking-wide font-serif resize-none transition-colors
              "
            />
          </div>

          {/* Date & time */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              when did this happen
            </label>
            <input
              type="datetime-local"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              required
              className="
                bg-teal-900/15 border border-teal-700/25 rounded-lg
                px-4 py-3 text-sm text-teal-100
                focus:outline-none focus:border-teal-500/50
                italic tracking-wide font-serif transition-colors
                [color-scheme:dark]
              "
            />
          </div>

          {/* Photos */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              photos
            </label>
            <label className="
              relative flex items-center gap-3 cursor-pointer
              bg-teal-900/15 border border-dashed border-teal-700/30
              hover:border-teal-500/50 hover:bg-teal-900/25
              rounded-lg px-4 py-4 transition-all duration-200
            ">
              <svg className="w-5 h-5 text-teal-500/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-teal-100/50 text-sm italic">
                  {photos.length > 0
                    ? `${photos.length} photo${photos.length > 1 ? "s" : ""} selected`
                    : "choose photos..."}
                </span>
                <span className="text-teal-500/35 text-[10px] tracking-wide mt-0.5">
                  jpg, png, webp — multiple allowed
                </span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setPhotos(Array.from(e.target.files))}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            {/* Photo preview thumbnails */}
            {photos.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-1">
                {photos.map((photo, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(photo)}
                    alt={`preview ${i + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-teal-700/30"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Videos */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              videos
            </label>
            <label className="
              relative flex items-center gap-3 cursor-pointer
              bg-teal-900/15 border border-dashed border-teal-700/30
              hover:border-teal-500/50 hover:bg-teal-900/25
              rounded-lg px-4 py-4 transition-all duration-200
            ">
              <svg className="w-5 h-5 text-teal-500/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-teal-100/50 text-sm italic">
                  {videos.length > 0
                    ? `${videos.length} video${videos.length > 1 ? "s" : ""} selected`
                    : "choose videos..."}
                </span>
                <span className="text-teal-500/35 text-[10px] tracking-wide mt-0.5">
                  mp4, mov, webm — multiple allowed
                </span>
              </div>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(e) => setVideos(Array.from(e.target.files))}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-teal-500/15" />
            <div className="w-1 h-1 bg-teal-500/30 rotate-45" />
            <div className="flex-1 h-px bg-teal-500/15" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full py-3 rounded-lg font-serif italic tracking-wide text-sm
              border transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              bg-teal-800/40 hover:bg-teal-700/50
              border-teal-600/40 hover:border-teal-500/60
              text-teal-200 hover:text-teal-50
            "
          >
            {submitting ? "saving memory..." : "✦ save this memory"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddMemory;
