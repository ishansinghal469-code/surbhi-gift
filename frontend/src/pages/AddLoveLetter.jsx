import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function PushPin({ color = "bg-red-400" }) {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
      <div className={`w-5 h-5 rounded-full ${color} shadow-md shadow-black/30 border border-white/40`} />
      <div className={`w-2 h-3 ${color} opacity-60`} />
    </div>
  );
}

function AddLoveLetter() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://surbhi-gift.onrender.com/api/loveletters/", {
        title,
        message,
      });
      navigate("/letters");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans px-6 py-16">
      <div className="max-w-md mx-auto">

        {/* back link */}
        <Link
          to="/letters"
          className="inline-block mb-10 text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 transition no-underline"
        >
          ← Back to Notes
        </Link>

        {/* note card */}
        <div className="relative bg-[#fdf3e3] rounded-md pt-10 pb-8 px-7 shadow-[2px_6px_28px_rgba(0,0,0,0.10)]">
          <PushPin color="bg-red-400" />

          {/* tape strip */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm bg-yellow-100/70 rotate-2 shadow-sm border border-yellow-200/50 pointer-events-none" />

          <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
            new note
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* title */}
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 pb-2 text-xl font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-gray-500 transition"
            />

            {/* ruled textarea */}
            <div className="relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent, transparent 27px, #d1c9c0 28px)",
                  backgroundPosition: "0 4px",
                }}
              />
              <textarea
                placeholder="Start writing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={14}
                className="relative w-full bg-transparent text-[14px] leading-7 text-gray-600 placeholder:text-gray-300 outline-none resize-none"
              />
            </div>

            {/* save button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="rounded-full bg-gray-800 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-gray-700 transition"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default AddLoveLetter;