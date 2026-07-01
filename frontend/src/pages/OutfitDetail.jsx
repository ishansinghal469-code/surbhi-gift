import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OutfitDetail() {
  const { id } = useParams();
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/outfits/${id}/`)
      .then((res) => setOutfit(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!outfit) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{background:"linear-gradient(180deg,#a8c8de 0%,#c8dde8 40%,#f5ead8 100%)"}}>
      <p className="font-['Lora'] italic text-[#7a5a38] animate-pulse text-lg">
        turning the pages...
      </p>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12"
      style={{background:"linear-gradient(180deg,#a8c8de 0%,#c8dde8 30%,#dce8ef 55%,#eef3e8 80%,#f5ead8 100%)"}}>

      {/* Poles & wires */}
      <div className="absolute top-0 left-[8%] w-1 h-[40%] bg-[rgba(160,185,210,0.6)] rounded-full" />
      <div className="absolute top-0 right-[10%] w-1 h-[35%] bg-[rgba(160,185,210,0.6)] rounded-full" />
      <div className="absolute top-[16%] left-[8%] right-[10%] h-[1.5px] bg-[rgba(140,175,210,0.4)]" style={{transform:"rotate(1deg)",transformOrigin:"left"}} />

      {/* Clouds */}
      <div className="absolute top-[5%] left-[6%] w-36 h-11 bg-white/78 rounded-full" />
      <div className="absolute top-[9%] left-[12%] w-20 h-7 bg-white/58 rounded-full" />
      <div className="absolute top-[4%] right-[8%] w-28 h-9 bg-white/72 rounded-full" />

      <div className="relative z-10 max-w-lg mx-auto">
        <Link to="/outfits"
          className="inline-flex items-center gap-2 font-['Lora'] text-sm italic text-[#5a3e28] bg-[rgba(253,243,228,0.78)] border border-[#d4b896] rounded-full px-4 py-1.5 mb-7 no-underline hover:bg-[rgba(253,243,228,0.95)] transition-all duration-200">
          ← back to lookbook
        </Link>

        {/* Scroll */}
        <div className="border-2 border-[#d4b896] rounded-t-sm rounded-b-[28px] overflow-hidden"
          style={{boxShadow:"0 10px 40px rgba(80,50,20,0.2), inset 0 0 0 1px rgba(255,240,210,0.5)"}}>

          {/* Top rod */}
          <div className="h-5 bg-gradient-to-b from-[#c8a87a] to-[#b8906a] border-b-2 border-[#a07850]" />

          {/* Image */}
          <div className="relative bg-gradient-to-b from-[#a8c8de] via-[#c8dde8] to-[#e8f0e0] overflow-hidden"
            style={{minHeight:"340px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div className="absolute inset-0"
              style={{background:"radial-gradient(ellipse 140px 50px at 16% 22%, rgba(255,255,255,0.65) 0%, transparent 70%), radial-gradient(ellipse 90px 35px at 78% 18%, rgba(255,255,255,0.55) 0%, transparent 70%)"}} />
            <img
              src={outfit.image}
              alt={outfit.name}
              className="relative w-full max-h-[420px] object-contain z-10"
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{boxShadow:"inset 0 0 70px 20px rgba(80,55,30,0.2)"}} />
          </div>

          {/* Name plate */}
          <div className="relative bg-[#a33828] py-4 px-6 border-y-[3px] border-[#7a2a1c]">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#f5c89a] text-xs opacity-60">✦</span>
            <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-[#fdf3e4] text-center tracking-wide"
              style={{textShadow:"0 1px 4px rgba(0,0,0,0.3)"}}>
              {outfit.name}
            </h1>
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#f5c89a] text-xs opacity-60">✦</span>
          </div>

          {/* Description */}
          <div className="bg-[rgba(253,246,232,0.97)] px-8 py-7">
            <div className="text-center text-[#c4a070] tracking-[8px] text-sm mb-5">· · ·</div>
            <p className="font-['Lora'] italic text-[#5a3e28] text-base leading-relaxed text-center">
              {outfit.description}
            </p>
          </div>

          {/* Bottom rod */}
          <div className="h-5 bg-gradient-to-b from-[#b8906a] to-[#c8a87a] border-t-2 border-[#a07850] rounded-b-[26px]" />
        </div>
      </div>

      {/* Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-20 rounded-t-[60%]"
        style={{background:"linear-gradient(180deg,#8ab87a 0%,#6a9a58 100%)"}} />
      <div className="absolute bottom-14 left-[-5%] right-[-5%] h-9 rounded-t-[60%] bg-[#9ec98a]" />
    </div>
  );
}

export default OutfitDetail;