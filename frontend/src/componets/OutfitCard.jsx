import { Link } from "react-router-dom";

function OutfitCard({ outfit }) {
  return (
    <Link to={`/outfits/${outfit.id}`} className="block group">
      <div className="relative border-2 border-[#d4b896] rounded-t-sm rounded-b-[18px] overflow-hidden shadow-[0_4px_16px_rgba(80,50,20,0.14)] group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(80,50,20,0.22)] transition-all duration-500">

        {/* Sky image bed */}
        <div className="relative h-72 bg-gradient-to-b from-[#a8c8de] via-[#c8dde8] to-[#e8f0e0] overflow-hidden">
          <div className="absolute inset-0"
            style={{background:"radial-gradient(ellipse 120px 40px at 18% 25%, rgba(255,255,255,0.7) 0%, transparent 70%), radial-gradient(ellipse 80px 30px at 75% 18%, rgba(255,255,255,0.6) 0%, transparent 70%)"}}
          />
          <img
            src={outfit.image}
            alt={outfit.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_50px_16px_rgba(80,55,30,0.2)] pointer-events-none" />
        </div>

        {/* Scroll rod top */}
        <div className="h-4 bg-gradient-to-b from-[#c8a87a] to-[#b8906a] border-y border-[#a07850]" />

        {/* Name plate */}
        <div className="relative bg-[#a33828] py-3 px-4 border-y-2 border-[#7a2a1c]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5c89a] text-[10px] opacity-60">✦</span>
          <h2 className="font-['Playfair_Display'] font-semibold text-base text-[#fdf3e4] text-center tracking-wide"
            style={{textShadow:"0 1px 3px rgba(0,0,0,0.25)"}}>
            {outfit.name}
          </h2>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f5c89a] text-[10px] opacity-60">✦</span>
        </div>

        {/* Scroll rod bottom */}
        <div className="h-4 bg-gradient-to-b from-[#b8906a] to-[#c8a87a] border-y border-[#a07850] rounded-b-[16px]" />
      </div>
    </Link>
  );
}

export default OutfitCard;