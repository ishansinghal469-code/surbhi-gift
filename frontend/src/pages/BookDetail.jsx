import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios
            .get(`https://surbhi-gift.onrender.com/api/books/${id}/`)
            .then((response) => setBook(response.data))
            .catch((error) => console.log(error));
    }, [id]);

    // ── Loading ──
    if (!book) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <div className="w-8 h-8 border-2 border-gray-700 border-t-red-500 rounded-full animate-spin" />
                <p className="text-gray-500 text-sm tracking-wide">opening this book...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">

            {/* ── TOP BAR ── */}
            <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800">
                <div className="flex items-center gap-4 px-5 py-3 max-w-6xl mx-auto">
                    <Link
                        to="/books"
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors shrink-0 no-underline"
                    >
                        <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <span className="text-gray-300 text-sm font-medium truncate">
                        {book.title}
                    </span>
                </div>
            </div>

            {/* ── CONTENT ── */}
            <div className="px-5 pb-20 pt-10 max-w-xl mx-auto flex flex-col items-center gap-6">

                {/* ── Cover image ── */}
                {book.cover_image ? (
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-44 aspect-[2/3] object-cover rounded-2xl shadow-2xl shadow-black/60"
                    />
                ) : (
                    <div className="w-44 aspect-[2/3] rounded-2xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <p className="text-[10px] tracking-[3px] text-gray-600 uppercase">no cover</p>
                    </div>
                )}

                {/* ── Title + author ── */}
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-50 leading-snug mb-1.5">
                        {book.title}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        by {book.author}
                    </p>
                </div>

                {/* ── Genre + rating row ── */}
                <div className="flex items-center gap-3 flex-wrap justify-center">
                    {book.genre && (
                        <span className="
              text-xs font-medium
              text-gray-300 bg-gray-900
              border border-gray-800 rounded-full
              px-3 py-1.5
            ">
                            {book.genre}
                        </span>
                    )}

                    {Number.isInteger(book.rating) && (
                        <span className="text-sm flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-full px-3 py-1.5">
                            <span className="text-amber-400">
                                {"★".repeat(book.rating)}
                            </span>
                            <span className="text-gray-700">
                                {"★".repeat(5 - book.rating)}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">
                                {book.rating}/5
                            </span>
                        </span>
                    )}
                </div>

                {/* ── Divider ── */}
                <div className="w-full max-w-xs h-px bg-gray-800" />

                {/* ── Description ── */}
                {book.description && (
                    <p className="text-gray-400 text-sm leading-relaxed text-center">
                        {book.description}
                    </p>
                )}

                {/* ── Her review ── */}
                {book.review && (
                    <div className="w-full">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3 text-center">
                            her thoughts
                        </p>
                        <div className="
              relative bg-gray-900 border border-gray-800
              rounded-2xl px-5 py-6
            ">
                            <span className="absolute top-2 left-4 text-gray-700 text-3xl font-serif">"</span>
                            <p className="text-gray-300 text-sm leading-relaxed text-center px-3">
                                {book.review}
                            </p>
                            <span className="absolute bottom-1 right-4 text-gray-700 text-3xl font-serif">"</span>
                        </div>
                    </div>
                )}

                {/* No-content fallback */}
                {!book.description && !book.review && (
                    <div className="text-center py-8 border border-dashed border-gray-800 rounded-2xl w-full">
                        <svg className="w-6 h-6 text-gray-700 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <p className="text-gray-500 text-sm">
                            no notes on this one yet
                        </p>
                    </div>
                )}

                {/* ── Back button ── */}
                <Link
                    to="/books"
                    className="
            no-underline text-center w-full py-3 rounded-full text-sm font-semibold
            transition-colors duration-200
            bg-red-600 hover:bg-red-700
            text-white mt-2
          "
                >
                    ← Back to library
                </Link>

            </div>
        </div>
    );
}

export default BookDetail;