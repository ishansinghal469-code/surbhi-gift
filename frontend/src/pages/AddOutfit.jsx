import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddOutfit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    try {
      await axios.post("https://surbhi-gift.onrender.com/api/outfits/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/outfits");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-14"
      style={{background:"linear-gradient(180deg,#a8c8de 0%,#c8dde8 30%,#dce8ef 55%,#eef3e8 80%,#f5ead8 100%)"}}>

      {/* Clouds */}
      <div className="absolute top-[5%] left-[8%] w-32 h-10 bg-white/75 rounded-full" />
      <div className="absolute top-[9%] right-[10%] w-24 h-8 bg-white/65 rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/outfits" className="inline-flex items-center gap-2 font-['Lora'] text-sm italic text-[#5a3e28] bg-[rgba(253,243,228,0.75)] border border-[#d4b896] rounded-full px-4 py-1.5 mb-6 no-underline">
          ← back to lookbook
        </Link>

        <div className="text-center mb-6">
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#5a3e28]"
            style={{textShadow:"0 1px 0 rgba(255,255,255,0.5)"}}>
            Add an Outfit
          </h1>
          <div className="mx-auto mt-2 h-[2px] w-12 rounded-full"
            style={{background:"linear-gradient(90deg,transparent,#a33828,transparent)"}} />
        </div>

        {/* Scroll card */}
        <div className="border-2 border-[#d4b896] rounded-t-sm rounded-b-[24px] overflow-hidden"
          style={{boxShadow:"0 8px 32px rgba(80,50,20,0.18)"}}>

          {/* Top scroll rod */}
          <div className="h-4 bg-gradient-to-b from-[#c8a87a] to-[#b8906a] border-b border-[#a07850]" />

          {/* Form body */}
          <form onSubmit={handleSubmit} className="bg-[rgba(253,246,232,0.97)] px-6 py-6 space-y-5">

            <div>
              <label className="block font-['Lora'] text-sm text-[#7a2a1c] mb-1.5 italic">
                Outfit name
              </label>
              <input
                type="text"
                placeholder="e.g. Autumn Wanderer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/70 border border-[#d4b896] rounded-lg px-4 py-2.5 font-['Lora'] text-sm text-[#5a3e28] placeholder:text-[#a08060]/50 focus:outline-none focus:ring-2 focus:ring-[#a33828]/30 focus:border-[#a33828] transition-all duration-200"
              />
            </div>

            <div>
              <label className="block font-['Lora'] text-sm text-[#7a2a1c] mb-1.5 italic">
                Description
              </label>
              <textarea
                placeholder="A little note about this outfit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-white/70 border border-[#d4b896] rounded-lg px-4 py-2.5 font-['Lora'] text-sm text-[#5a3e28] placeholder:text-[#a08060]/50 focus:outline-none focus:ring-2 focus:ring-[#a33828]/30 focus:border-[#a33828] transition-all duration-200 resize-none"
              />
            </div>

            <div>
              <label className="block font-['Lora'] text-sm text-[#7a2a1c] mb-1.5 italic">
                Photo
              </label>
              <label className="flex items-center justify-between w-full bg-white/70 border border-dashed border-[#d4b896] rounded-lg px-4 py-3 cursor-pointer hover:bg-white/90 hover:border-[#a33828]/50 transition-all duration-200">
                <span className="font-['Lora'] text-sm text-[#a08060] italic truncate">
                  {fileName || "Choose a photo..."}
                </span>
                <span className="font-['Playfair_Display'] text-xs font-semibold text-[#a33828] ml-3 shrink-0">
                  Browse
                </span>
                <input type="file" className="hidden"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setFileName(e.target.files[0]?.name || "");
                  }}
                />
              </label>
            </div>

            <div className="pt-1 text-center">
              <div className="text-[#c4a070] tracking-[8px] text-sm mb-4">· · ·</div>
              <button type="submit"
                className="font-['Playfair_Display'] font-semibold text-sm text-[#fdf3e4] bg-[#a33828] px-8 py-3 rounded-full tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7a2a1c]"
                style={{boxShadow:"0 4px 16px rgba(120,40,20,0.3)"}}>
                Add to lookbook
              </button>
            </div>
          </form>

          {/* Bottom scroll rod */}
          <div className="h-4 bg-gradient-to-b from-[#b8906a] to-[#c8a87a] border-t border-[#a07850] rounded-b-[22px]" />
        </div>
      </div>

      {/* Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-16 rounded-t-[60%]"
        style={{background:"linear-gradient(180deg,#8ab87a 0%,#6a9a58 100%)"}} />
    </div>
  );
}

export default AddOutfit;