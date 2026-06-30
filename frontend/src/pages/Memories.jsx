import { useEffect, useState } from "react";
import axios from "axios";
import MemoryCard from "../componets/MemoryCard";
import { Link } from "react-router-dom";

function Memories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/memories/");
        setMemories(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const filtered = memories.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
  );

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071a18] flex flex-col items-center justify-center gap-4">
        <p className="text-teal-500/50 text-2xl animate-pulse">✦</p>
        <p className="font-serif italic text-teal-100/40 text-sm tracking-widest">
          loading memories...
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
          Memories
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            moments we've collected
          </p>
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <div className="flex-1 h-px bg-teal-500/25" />
        </div>
      </div>

      {/* ── SEARCH + ADD ── */}
      <div className="flex items-center gap-3 px-5 max-w-2xl mx-auto mb-7">

        {/* Search bar */}
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
            placeholder="search memories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-teal-900/15 border border-teal-700/25 rounded-lg
              pl-9 pr-4 py-2.5 text-sm text-teal-100 placeholder-teal-500/40
              focus:outline-none focus:border-teal-500/50 italic tracking-wide font-serif
            "
          />
        </div>

        {/* Add memory — same Link as your original, just styled */}
        <Link
          to="/memories/add"
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
          add memory
        </Link>
      </div>

      {/* ── PINTEREST GRID ── */}
      <div className="px-5 pb-16 max-w-2xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4 opacity-30">✦</p>
            <p className="font-serif italic text-teal-100/30 text-lg">
              no memories found
            </p>
            <p className="text-teal-500/30 text-xs tracking-widest mt-2">
              try a different search
            </p>
          </div>
        ) : (
          <div className="columns-2 gap-3">
            {filtered.map((memory) => (
              <div key={memory.id} className="break-inside-avoid mb-3">
                <MemoryCard memory={memory} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <p className="text-center pb-10 italic text-[11px] text-teal-500/30 tracking-wide">
        {memories.length} memories &nbsp;✦&nbsp; and counting
      </p>

    </div>
  );
}

export default Memories;
