import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const pastels = [
  "bg-[#fdf3e3]",
  "bg-[#e8e8f8]",
  "bg-[#fde8e8]",
  "bg-[#e3f0fd]",
];

const pinColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-orange-400",
];

function PushPin({ color }) {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
      <div className={`w-5 h-5 rounded-full ${color} shadow-md shadow-black/30 border border-white/40`} />
      <div className={`w-2 h-3 ${color} opacity-60`} />
    </div>
  );
}

function LoveLetterDetail() {
  const { id } = useParams();
  const [letter, setLetter] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/loveletters/${id}/`)
      .then((res) => setLetter(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!letter) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <p className="text-sm text-gray-400 italic">loading note…</p>
      </div>
    );
  }

  // pick a consistent pastel based on id so it matches the card color
  const colorIndex = (letter.id - 1) % pastels.length;
  const pastel = pastels[colorIndex];
  const pin = pinColors[colorIndex];

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
        <div className={`relative ${pastel} rounded-md pt-10 pb-8 px-7 shadow-[2px_6px_28px_rgba(0,0,0,0.10)]`}>
          <PushPin color={pin} />

          {/* note number */}
          <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
            {String((letter.id - 1) % 100 + 1).padStart(2, "0")}
          </p>

          {/* title */}
          <h1 className="font-bold text-xl text-gray-800 leading-snug mb-5">
            {letter.title || "Untitled"}
          </h1>

          {/* ruled lines behind text */}
          <div className="relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 27px, #d1c9c0 28px)",
                backgroundPosition: "0 4px",
              }}
            />
            <p className="relative text-[14px] text-gray-600 leading-7 whitespace-pre-wrap">
              {letter.message}
            </p>
          </div>
        </div>

        {/* subtle tape strip at top of card */}
        <div className="flex justify-center -mt-[340px] mb-[320px] pointer-events-none">
          <div className="w-14 h-5 rounded-sm bg-yellow-100/70 rotate-2 shadow-sm border border-yellow-200/50" />
        </div>

      </div>
    </div>
  );
}

export default LoveLetterDetail;