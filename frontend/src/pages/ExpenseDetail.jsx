import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const categoryIcons = {
  food:        "🍵",
  shopping:    "🛍️",
  travel:      "🚗",
  gaming:      "🎮",
  books:       "📚",
  craft:       "🔮",
  gifts:       "💌",
  antiques:    "🕰️",
  other:       "✦",
};

function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/expenses/${id}/`)
      .then((response) => setExpense(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/expenses/${id}/`);
      navigate("/expenses");
    } catch (error) {
      console.log(error);
      setError("couldn't delete this. please try again.");
      setDeleting(false);
    }
  };

  // ── Loading ──
  if (!expense) {
    return (
      <div className="min-h-screen bg-[#071a18] flex flex-col items-center justify-center gap-4">
        <p className="text-teal-500/50 text-2xl animate-pulse">✦</p>
        <p className="font-serif italic text-teal-100/40 text-sm tracking-widest">
          fetching the details...
        </p>
      </div>
    );
  }

  const icon = categoryIcons[expense.category?.toLowerCase()] ?? "✦";

  return (
    <div className="min-h-screen bg-[#071a18] font-serif">

      {/* ── HEADER ── */}
      <div className="relative text-center pt-10 pb-4 px-6">
        <Link
          to="/expenses"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← back
        </Link>
        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-5 pb-20 max-w-md mx-auto flex flex-col items-center gap-6">

        {/* Icon */}
        <span className="text-4xl">{icon}</span>

        {/* Title */}
        <h1 className="font-serif italic font-normal text-2xl text-teal-50 tracking-wide text-center leading-snug m-0">
          {expense.title}
        </h1>

        {/* Amount — big focal point */}
        <p className="text-teal-50 text-4xl font-serif italic">
          ₹{Number(expense.amount).toLocaleString("en-IN")}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 w-full max-w-xs">
          <div className="flex-1 h-px bg-teal-500/20" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <div className="flex-1 h-px bg-teal-500/20" />
        </div>

        {/* Category + date */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="
            text-[10px] tracking-[0.1em] uppercase
            text-teal-300/70 bg-teal-900/25
            border border-teal-700/25 rounded-full
            px-3 py-1
          ">
            {expense.category}
          </span>

          <span className="text-teal-500/40 text-[11px] tracking-wide">
            {new Date(expense.date).toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric", year: "numeric",
            })}
          </span>
        </div>

        {/* Note */}
        {expense.note && (
          <div className="w-full">
            <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/50 mb-3 text-center">
              note
            </p>
            <div className="
              relative bg-teal-900/15 border border-teal-700/20
              rounded-xl px-5 py-5
            ">
              <p className="text-teal-100/65 text-sm leading-relaxed italic text-center">
                {expense.note}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="w-full bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3">
            <p className="text-red-300/80 text-sm italic text-center">{error}</p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-teal-500/15" />
          <div className="w-1 h-1 bg-teal-500/30 rotate-45" />
          <div className="flex-1 h-px bg-teal-500/15" />
        </div>

        {/* ── Delete flow ── */}
        {!confirmOpen ? (
          <button
            onClick={() => setConfirmOpen(true)}
            className="
              w-full py-3 rounded-lg font-serif italic tracking-wide text-sm
              border transition-all duration-200
              bg-red-950/20 hover:bg-red-900/30
              border-red-700/25 hover:border-red-500/40
              text-red-300/60 hover:text-red-200
            "
          >
            delete this expense
          </button>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <p className="text-center text-teal-100/50 text-xs italic mb-1">
              are you sure? this can't be undone
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
                className="
                  flex-1 py-2.5 rounded-lg font-serif italic tracking-wide text-sm
                  border transition-all duration-200
                  bg-teal-900/20 hover:bg-teal-800/30
                  border-teal-700/25 hover:border-teal-500/40
                  text-teal-300/70 hover:text-teal-200
                  disabled:opacity-50
                "
              >
                cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="
                  flex-1 py-2.5 rounded-lg font-serif italic tracking-wide text-sm
                  border transition-all duration-200
                  bg-red-900/40 hover:bg-red-800/50
                  border-red-600/40 hover:border-red-500/60
                  text-red-200 hover:text-red-50
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {deleting ? "deleting..." : "yes, delete"}
              </button>
            </div>
          </div>
        )}

        {/* Back button */}
        <Link
          to="/expenses"
          className="
            no-underline text-center w-full py-3 rounded-lg font-serif italic
            tracking-wide text-sm border transition-all duration-200
            bg-teal-900/20 hover:bg-teal-800/30
            border-teal-700/25 hover:border-teal-500/40
            text-teal-300/70 hover:text-teal-200
          "
        >
          ← back to expenses
        </Link>

      </div>
    </div>
  );
}

export default ExpenseDetail;
