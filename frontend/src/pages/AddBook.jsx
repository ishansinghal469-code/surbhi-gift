import { useState } from "react";
import API from "../services/api";
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
      await API.post("books/", formData);
      navigate("/books");
    } catch (error) {
      console.log(error.response?.data);
      setError("something went wrong. please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center gap-4 px-5 py-3 max-w-3xl mx-auto">
          <Link
            to="/books"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors shrink-0 no-underline"
          >
            <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="text-gray-100 text-sm font-semibold">
            Add a book
          </span>
        </div>
      </div>

      {/* ── PAGE TITLE ── */}
      <div className="text-center pt-10 pb-6 px-6">
        <h1 className="text-2xl font-semibold text-gray-50 m-0">
          Add a Book
        </h1>
        <p className="text-gray-500 text-sm mt-1.5">
          for your shelf
        </p>
      </div>

      {/* ── FORM ── */}
      <div className="px-5 pb-16 max-w-lg mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400">
              Title
            </label>
            <input
              type="text"
              placeholder="The name of the book"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="
                bg-gray-900 border border-gray-800 rounded-xl
                px-4 py-3 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-gray-600 focus:bg-gray-800
                transition-colors
              "
            />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400">
              Author
            </label>
            <input
              type="text"
              placeholder="Who wrote it"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="
                bg-gray-900 border border-gray-800 rounded-xl
                px-4 py-3 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-gray-600 focus:bg-gray-800
                transition-colors
              "
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400">
              Description
            </label>
            <textarea
              placeholder="What it's about, or what she thought of it"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="
                bg-gray-900 border border-gray-800 rounded-xl
                px-4 py-3 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-gray-600 focus:bg-gray-800
                resize-none transition-colors
              "
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400">
              dont exceed rating more than 5 site will crash!
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="
                  w-20 bg-gray-900 border border-gray-800 rounded-xl
                  px-3 py-3 text-sm text-gray-100 text-center
                  focus:outline-none focus:border-gray-600 focus:bg-gray-800
                  transition-colors
                "
              />
              <span className="text-lg">
                <span className="text-amber-400">
                  {"★".repeat(Math.round(rating))}
                </span>
                <span className="text-gray-700">
                  {"★".repeat(5 - Math.round(rating))}
                </span>
              </span>
              <span className="text-gray-500 text-xs">/ 5</span>
            </div>
          </div>

          {/* Cover image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400">
              Cover image
            </label>
            <label className="
              relative flex items-center gap-3 cursor-pointer
              bg-gray-900 border border-dashed border-gray-700
              hover:border-gray-500 hover:bg-gray-800
              rounded-xl px-4 py-4 transition-all duration-200
            ">
              <svg className="w-5 h-5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-gray-300 text-sm">
                  {coverImage ? coverImage.name : "Choose a cover"}
                </span>
                <span className="text-gray-600 text-xs mt-0.5">
                  everything works thb
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
                className="w-24 aspect-[2/3] object-cover rounded-xl mt-1"
              />
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 my-1" />

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full py-3 rounded-full text-sm font-semibold
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              bg-red-600 hover:bg-red-700
              text-white
            "
          >
            {submitting ? "Adding to shelf..." : "Add to her shelf"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBook;