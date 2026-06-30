import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddTask() {
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.post("http://127.0.0.1:8000/api/tasks/", {
        day,
        title,
        description,
        due_date: dueDate,
      });

      navigate("/planner");
    } catch (error) {
      console.log(error);
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
          to="/planner"
          className="absolute left-5 top-10 text-teal-500/50 hover:text-teal-400 text-[11px] tracking-widest uppercase no-underline transition-colors"
        >
          ← back
        </Link>

        <p className="text-[10px] tracking-[8px] text-teal-500/70 mb-3">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
        <h1 className="font-serif italic font-normal text-3xl text-teal-50 tracking-wide m-0">
          Add a Task
        </h1>
        <div className="flex items-center gap-2 justify-center my-3 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-teal-500/25" />
          <div className="w-1.5 h-1.5 bg-teal-500 rotate-45 shrink-0" />
          <p className="italic text-[11px] text-teal-100/40 tracking-wide m-0 whitespace-nowrap">
            something to get done
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

          {/* Day Manager ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              day manager id
            </label>
            <input
              type="number"
              placeholder="enter the day id..."
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              className="
                bg-teal-900/15 border border-teal-700/25 rounded-lg
                px-4 py-3 text-sm text-teal-100 placeholder-teal-500/35
                focus:outline-none focus:border-teal-500/50
                italic tracking-wide font-serif transition-colors
              "
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              task title
            </label>
            <input
              type="text"
              placeholder="what needs to be done..."
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

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              description
            </label>
            <textarea
              placeholder="any details..."
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

          {/* Due date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.14em] uppercase text-teal-500/60">
              due date
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="
                bg-teal-900/15 border border-teal-700/25 rounded-lg
                px-4 py-3 text-sm text-teal-100
                focus:outline-none focus:border-teal-500/50
                italic tracking-wide font-serif transition-colors
                [color-scheme:dark]
              "
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
            {submitting ? "adding task..." : "✦ add task"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddTask;
