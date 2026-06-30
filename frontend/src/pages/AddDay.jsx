import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const categoryOptions = [
  { value: "study",    label: "Study",     icon: "📖" },
  { value: "work",     label: "Work",      icon: "💼" },
  { value: "gaming",   label: "Gaming",    icon: "🎮" },
  { value: "reading",  label: "Reading",   icon: "📚" },
  { value: "selfcare", label: "Self Care", icon: "🌿" },
  { value: "craft",    label: "Craft",     icon: "🔮" },
  { value: "other",    label: "Other",     icon: "✦"  },
];

const priorityOptions = [
  { value: "low",    label: "Low",    color: "text-teal-400/70"  },
  { value: "medium", label: "Medium", color: "text-amber-400/70" },
  { value: "high",   label: "High",   color: "text-red-400/70"   },
];

function AddDayManager() {
  const [title, setTitle]           = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime]   = useState("");
  const [endTime, setEndTime]       = useState("");
  const [category, setCategory]     = useState("other");
  const [priority, setPriority]     = useState("medium");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.post("http://127.0.0.1:8000/api/daymanager/", {
        title,
        description,
        start_time: startTime,
        end_time:   endTime,
        category,
        priority,
      });

      navigate("/planner");
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
          to="/planner"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← back
        </Link>

        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0">
          Add Day Schedule
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            plan the hours ahead
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
              placeholder="what's happening today..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              description
            </label>
            <textarea
              placeholder="any details to note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Start + End time side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
                start time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
                end time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Category — pill selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              category
            </label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    text-xs italic tracking-wide font-serif border
                    transition-all duration-200
                    ${category === opt.value
                      ? "bg-teal-700/40 border-teal-500/60 text-teal-100"
                      : "bg-teal-900/15 border-teal-700/20 text-teal-100/50 hover:border-teal-600/40 hover:text-teal-100/75"
                    }
                  `}
                >
                  <span>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority — pill selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              priority
            </label>
            <div className="flex gap-2">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={`
                    flex-1 py-2 rounded-lg text-xs italic tracking-wide font-serif border
                    transition-all duration-200
                    ${priority === opt.value
                      ? `bg-teal-700/40 border-teal-500/60 ${opt.color}`
                      : "bg-teal-900/15 border-teal-700/20 text-teal-100/40 hover:border-teal-600/40"
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
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
            {submitting ? "saving schedule..." : "✦ add to schedule"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddDayManager;
