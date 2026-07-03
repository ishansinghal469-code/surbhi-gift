import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../componets/BookCard";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://surbhi-gift.onrender.com/api/books/");
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-700 border-t-red-500 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm tracking-wide">yo internet slow man</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center gap-4 px-5 py-3 max-w-6xl mx-auto">

          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors shrink-0 no-underline"
          >
            <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* Search pill */}
          <div className="relative flex-1 max-w-xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full bg-gray-900 border border-transparent rounded-full
                pl-11 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500
                focus:outline-none focus:bg-gray-800 focus:border-gray-700
                transition-colors
              "
            />
          </div>

          <Link
            to="/books/add"
            className="
              flex items-center gap-1.5 no-underline shrink-0
              bg-red-600 hover:bg-red-700
              text-white text-sm font-semibold
              px-4 py-2.5 rounded-full transition-colors whitespace-nowrap
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="hidden sm:inline">Add book</span>
          </Link>
        </div>
      </div>

      {/* ── PAGE TITLE ── */}
      <div className="text-center pt-10 pb-6 px-6">
        <h1 className="text-2xl font-semibold text-gray-50 m-0">
          Surbhi's Shelf
        </h1>
        <p className="text-gray-500 text-sm mt-1.5">
          every story you've felt 
        </p>
      </div>

      {/* ── BOOK GRID ── */}
      <div className="px-5 pb-20 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <svg className="w-10 h-10 text-gray-700 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p className="text-gray-300 text-lg font-medium">
              try better next time hehe
            </p>
            <p className="text-gray-600 text-sm mt-1.5">
              search diffrent my sweet slow girly
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <p className="text-center pb-10 text-gray-600 text-xs tracking-wide">
        {books.length} books
      </p>

    </div>
  );
}

export default Books;