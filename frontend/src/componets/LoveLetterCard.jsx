import { Link } from "react-router-dom";

const pastels = [
  "bg-[#fdf3e3]", // warm cream
  "bg-[#e8e8f8]", // soft lavender
  "bg-[#fde8e8]", // blush pink
  "bg-[#e3f0fd]", // sky blue
];

const pinColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-orange-400",
];

function PushPin({ color }) {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
      <div className={`w-4 h-4 rounded-full ${color} shadow-md shadow-black/30 border border-white/40`} />
      <div className={`w-1.5 h-3 ${color} opacity-60`} />
    </div>
  );
}

function LoveLetterCard({ letter, index = 0 }) {
  const pastel = pastels[index % pastels.length];
  const pin = pinColors[index % pinColors.length];

  return (
    <Link
      to={`/letters/${letter.id}`}
      className="no-underline"
    >
      <div className={`relative ${pastel} rounded-md p-5 pt-7 shadow-[2px_4px_18px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:shadow-[2px_8px_24px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer`}>
        <PushPin color={pin} />

        <p className="text-[10px] font-semibold tracking-widest text-gray-400 mb-1 uppercase">
          {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="font-bold text-[15px] text-gray-800 mb-2 leading-snug">
          {letter.title || "Untitled"}
        </h3>

        <p className="text-[13px] text-gray-500 leading-relaxed">
          {letter.message.length > 100
            ? letter.message.slice(0, 100) + "..."
            : letter.message}
        </p>
      </div>
    </Link>
  );
}

export default LoveLetterCard;