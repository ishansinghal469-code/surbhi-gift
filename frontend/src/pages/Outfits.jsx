import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OutfitCard from "../componets/OutfitCard";

function Outfits() {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/outfits/")
      .then((res) => setOutfits(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden"
      style={{background:"linear-gradient(180deg,#a8c8de 0%,#c8dde8 30%,#dce8ef 55%,#eef3e8 80%,#f5ead8 100%)"}}>

      {/* Power line poles */}
      <div className="absolute top-0 left-[10%] w-1 h-[45%] bg-[rgba(160,185,210,0.6)] rounded-full" />
      <div className="absolute top-0 right-[12%] w-1 h-[38%] bg-[rgba(160,185,210,0.6)] rounded-full" />
      <div className="absolute top-[18%] left-[10%] right-[12%] h-[1.5px] bg-[rgba(140,175,210,0.4)]" style={{transform:"rotate(1.5deg)",transformOrigin:"left"}} />
      <div className="absolute top-[26%] left-[10%] right-[12%] h-[1.5px] bg-[rgba(140,175,210,0.35)]" style={{transform:"rotate(-0.8deg)",transformOrigin:"left"}} />

      {/* Clouds */}
      <div className="absolute top-[6%] left-[7%] w-36 h-11 bg-white/80 rounded-full" />
      <div className="absolute top-[10%] left-[12%] w-24 h-7 bg-white/60 rounded-full" />
      <div className="absolute top-[5%] right-[10%] w-28 h-9 bg-white/75 rounded-full" />
      <div className="absolute top-[14%] right-[16%] w-16 h-6 bg-white/55 rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 pb-32">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-[#5a3e28] mb-2"
            style={{textShadow:"0 1px 0 rgba(255,255,255,0.5)"}}>
            Outfits
          </h1>
          <p className="font-['Lora'] italic text-sm text-[#7a5a38] opacity-85">
            a little collection of outfits, gathered like pages in a storybook
          </p>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full"
            style={{background:"linear-gradient(90deg,transparent,#a33828,transparent)"}} />
        </div>

        {/* Add button */}
        <div className="flex justify-center mb-10">
          <Link to="/Outfits/add">
            <button className="flex items-center gap-2 font-['Playfair_Display'] font-semibold text-sm text-[#fdf3e4] bg-[#a33828] px-7 py-3 rounded-full tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              style={{boxShadow:"0 4px 16px rgba(120,40,20,0.3)"}}>
              ＋ &nbsp;Add outfit
            </button>
          </Link>
        </div>

        {/* Grid */}
        {outfits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {outfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        ) : (
          <p className="font-['Lora'] italic text-center text-[#7a5a38] opacity-70 mt-20">
            Your lookbook is waiting to be filled...
          </p>
        )}
      </div>

      {/* Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-20 rounded-t-[60%]"
        style={{background:"linear-gradient(180deg,#8ab87a 0%,#6a9a58 100%)"}} />
      <div className="absolute bottom-14 left-[-5%] right-[-5%] h-9 rounded-t-[60%] bg-[#9ec98a]" />
    </div>
  );
}

export default Outfits;