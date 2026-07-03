import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.post("https://surbhi-gift.onrender.com/api/expenses/", {
        title,
        amount,
        category,
        date,
        note,
      });

      navigate("/expenses");
    } catch (error) {
      console.log(error);
      setError("something went wrong. please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `
    bg-teal-900/15 border border-teal-700/25 rounded-lg
    px-4 py-3 text-sm text-teal-100 placeholder-teal-500/35
    focus:outline-none focus:border-teal-500/50
    italic tracking-wide font-serif transition-colors w-full
    [color-scheme:dark]
  `;

  return (
    <div className="min-h-screen bg-[#071a18] font-serif flex flex-col">

      {/* ── HEADER ── */}
      <div className="relative text-center pt-10 pb-6 px-6">
        <Link
          to="/expenses"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← back
        </Link>

        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0">
          Add Expense
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            keep the track of yoyr expenses babe
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
              placeholder="what was it for..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Amount + Category side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
                amount (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
                category
              </label>
              <input
                type="text"
                placeholder="food, books..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              note
            </label>
            <textarea
              placeholder="any extra details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
            />
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
            {submitting ? "adding expense..." : "✦ add expense"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddExpense;
