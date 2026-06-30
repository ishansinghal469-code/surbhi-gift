import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [coverImage, setCoverImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("cover_image", coverImage);

    try {
      await axios.post("http://127.0.0.1:8000/api/books/", formData);
      navigate("/books");
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
          to="/books"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← back
        </Link>

        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0">
          Add a Book
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            for her shelf
          </p>
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <div className="flex-1 h-px bg-teal-500/25" />
        </div>
      </div>

      {/* ── FORM ── */}
      <div className="px-5 pb-16 max-w-lg mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Error */}
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
              placeholder="the name of the book..."
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

          {/* Author */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              author
            </label>
            <input
              type="text"
              placeholder="who wrote it..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
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
              placeholder="what it's about, or what she thought of it..."
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

          {/* Rating */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              rating
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="
                  w-20 bg-teal-900/15 border border-teal-700/25 rounded-lg
                  px-3 py-3 text-sm text-teal-100 text-center
                  focus:outline-none focus:border-teal-500/50
                  italic font-serif transition-colors
                "
              />
              <span className="text-amber-400/70 text-lg">
                {"★".repeat(Math.round(rating))}
                <span className="text-teal-700/30">
                  {"★".repeat(5 - Math.round(rating))}
                </span>
              </span>
              <span className="text-teal-500/40 text-xs">/ 5</span>
            </div>
          </div>

          {/* Cover image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              cover image
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
                  {coverImage ? coverImage.name : "choose a cover..."}
                </span>
                <span className="text-teal-500/35 text-[10px] tracking-wide mt-0.5">
                  jpg, png, webp
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            {/* Cover preview */}
            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="cover preview"
                className="w-24 aspect-[2/3] object-cover rounded-lg border border-teal-700/30 mt-1"
              />
            )}
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
            {submitting ? "adding to shelf..." : "✦ add to her shelf"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBook;
