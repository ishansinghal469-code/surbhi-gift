
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ExpenseCard from "../componets/ExpenseCard";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/expenses/")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const filtered = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071a18] flex flex-col items-center justify-center gap-4">
        <p className="text-teal-500/50 text-2xl animate-pulse">✦</p>
        <p className="font-serif italic text-teal-100/40 text-sm tracking-widest">
          counting the coins...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071a18] font-serif">

      {/* ── HEADER ── */}
      <div className="relative text-center pt-10 pb-6 px-6">
        <Link
          to="/"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← home
        </Link>

        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0">
          Expenses
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            keep track of your expenses i am sorry this page is also not designed well we can design these pages together tho ;/
          </p>
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <div className="flex-1 h-px bg-teal-500/25" />
        </div>
      </div>

      {/* ── TOTAL CARD ── */}
      <div className="px-5 max-w-2xl mx-auto mb-7">
        <div className="
          bg-teal-900/25 border border-teal-700/25 rounded-xl
          px-5 py-4 flex items-center justify-between
        ">
          <div>
            <p className="text-[10px] tracking-[0.14em] uppercase text-teal-500/50 mb-1">
              total bags spent
            </p>
            <p className="text-teal-50 text-2xl font-serif italic">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>
          <span className="text-teal-500/30 text-3xl">✦</span>
        </div>
      </div>

      {/* ── SEARCH + ADD ── */}
      <div className="flex items-center gap-3 px-5 max-w-2xl mx-auto mb-7">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500/50"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-teal-900/15 border border-teal-700/25 rounded-lg
              pl-9 pr-4 py-2.5 text-sm text-teal-100 placeholder-teal-500/40
              focus:outline-none focus:border-teal-500/50 italic tracking-wide font-serif
            "
          />
        </div>

        <Link
          to="/expenses/add"
          className="
            flex items-center gap-2 no-underline
            bg-teal-800/30 hover:bg-teal-700/40
            border border-teal-600/30 hover:border-teal-500/50
            text-teal-300 text-[12px] italic tracking-wide
            px-4 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap font-serif
          "
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          add expense
        </Link>
      </div>

      {/* ── EXPENSE LIST ── */}
      <div className="px-5 pb-16 max-w-2xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4 opacity-30">✦</p>
            <p className="font-serif italic text-teal-100/30 text-lg">
              not using this page huh :(
            </p>
            <p className="text-teal-500/30 text-xs tracking-widest mt-2">
              try a different search
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <p className="text-center pb-10 italic text-[11px] text-teal-500/30 tracking-wide">
        {expenses.length} you are the prettiest person ever
      </p>

    </div>
  );
}

export default Expenses;
