import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/books/${id}/`)
            .then((response) => setBook(response.data))
            .catch((error) => console.log(error));
    }, [id]);

    // ── Loading ──
    if (!book) {
        return (
            <div className="min-h-screen bg-[#071a18] flex flex-col items-center justify-center gap-4">
                <p className="text-teal-500/50 text-2xl animate-pulse">✦</p>
                <p className="font-serif italic text-teal-100/40 text-sm tracking-widest">
                    opening this book...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#071a18] font-serif">

            {/* ── HEADER ── */}
            <div className="relative text-center pt-10 pb-4 px-6">
                <Link
                    to="/books"
                    className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
                >
                    ← back
                </Link>
                <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
                    ✦ &nbsp; ✦ &nbsp; ✦
                </p>
            </div>

            {/* ── CONTENT ── */}
            <div className="px-5 pb-20 max-w-xl mx-auto flex flex-col items-center gap-6">

                {/* ── Cover image ── */}
                {book.cover_image && (
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-40 aspect-[2/3] object-cover rounded-lg border border-teal-700/25 shadow-lg shadow-teal-950/40"
                    />
                )}

                {/* ── Title + author ── */}
                <div className="text-center">
                    <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide leading-snug mb-2">
                        {book.title}
                    </h1>
                    <p className="text-teal-100/50 text-sm tracking-wide">
                        by {book.author}
                    </p>
                </div>

                {/* ── Genre + rating row ── */}
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    {book.genre && (
                        <span className="
              text-[10px] tracking-[0.1em] uppercase
              text-teal-300/70 bg-teal-900/25
              border border-teal-700/25 rounded-full
              px-3 py-1
            ">
                            {book.genre}
                        </span>
                    )}

                    {Number.isInteger(book.rating) && (
                        <span className="text-amber-400/70 text-sm flex items-center gap-1">
                            {"★".repeat(book.rating)}
                            <span className="text-teal-700/30">
                                {"★".repeat(5 - book.rating)}
                            </span>
                            <span className="text-teal-500/40 text-xs ml-1">
                                {book.rating}/5
                            </span>
                        </span>
                    )}
                </div>

                {/* ── Divider ── */}
                <div className="flex items-center gap-2 w-full max-w-xs">
                    <div className="flex-1 h-px bg-teal-500/20" />
                    <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
                    <div className="flex-1 h-px bg-teal-500/20" />
                </div>

                {/* ── Description ── */}
                {book.description && (
                    <p className="text-teal-100/60 text-sm leading-relaxed text-center italic">
                        {book.description}
                    </p>
                )}

                {/* ── Her review ── */}
                {book.review && (
                    <div className="w-full">
                        <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/50 mb-3 text-center">
                            her thoughts
                        </p>
                        <div className="
              relative bg-teal-900/15 border border-teal-700/20
              rounded-xl px-5 py-5
            ">
                            <span className="absolute top-2 left-3 text-teal-600/30 text-3xl font-serif">"</span>
                            <p className="text-teal-100/70 text-sm leading-relaxed italic text-center px-3">
                                {book.review}
                            </p>
                            <span className="absolute bottom-0 right-3 text-teal-600/30 text-3xl font-serif">"</span>
                        </div>
                    </div>
                )}

                {/* No-content fallback */}
                {!book.description && !book.review && (
                    <div className="text-center py-6 border border-dashed border-teal-700/20 rounded-xl w-full">
                        <p className="text-teal-500/30 text-xl mb-2">✦</p>
                        <p className="font-serif italic text-teal-100/25 text-sm">
                            no notes on this one yet
                        </p>
                    </div>
                )}

                {/* ── Back button ── */}
                <Link
                    to="/books"
                    className="
            no-underline text-center w-full py-3 rounded-lg font-serif italic
            tracking-wide text-sm border transition-all duration-200
            bg-teal-900/20 hover:bg-teal-800/30
            border-teal-700/25 hover:border-teal-500/40
            text-teal-300/70 hover:text-teal-200 mt-2
          "
                >
                    ← back to library
                </Link>

            </div>
        </div>
    );
}

export default BookDetail;
