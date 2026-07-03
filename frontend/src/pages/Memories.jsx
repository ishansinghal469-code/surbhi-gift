import { useEffect, useState } from "react";
import axios from "axios";
import MemoryCard from "../componets/MemoryCard";
import { Link } from "react-router-dom";

const WOOD_DARK   = "#3B1F0E";
const WOOD_MID    = "#6B3A1F";
const WOOD_LIGHT  = "#9B6235";
const GOLD        = "#C8922A";
const GOLD_LIGHT  = "#E8B84B";
const PARCHMENT   = "#F2E0B6";
const PARCHMENT_DARK = "#DEC99A";
const INK         = "#2C1A0E";
const BG_GREEN    = "#1E3320";
const BG_GREEN_DARK = "#132218";

const pixelFont = "'Press Start 2P', monospace";

function PixelStar({ size = "8px" }) {
  return (
    <span style={{ color: GOLD, fontFamily: pixelFont, fontSize: size }}>
      ✦
    </span>
  );
}

function WoodPanel({ children, style = {} }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          translate: "4px 4px",
          background: WOOD_DARK,
          borderRadius: "2px",
          zIndex: 0,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          border: `4px solid ${WOOD_DARK}`,
          borderRadius: "2px",
          background: WOOD_DARK,
        }}
      >
        <div style={{ border: `3px solid ${WOOD_MID}`, background: WOOD_MID }}>
          <div style={{ border: `2px solid ${GOLD}`, background: GOLD }}>
            <div style={{ background: PARCHMENT }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Memories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axios.get("https://surbhi-gift.onrender.com/api/memories/");
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
      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${BG_GREEN} 0%, ${BG_GREEN_DARK} 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <p style={{ fontFamily: pixelFont, fontSize: "20px", color: GOLD, opacity: 0.7, animation: "pulse 1.5s infinite" }}>
          ✦
        </p>
        <p style={{ fontFamily: pixelFont, fontSize: "10px", color: PARCHMENT, opacity: 0.6, letterSpacing: "2px" }}>
          loading memories...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${BG_GREEN} 0%, ${BG_GREEN_DARK} 100%)`,
        fontFamily: pixelFont,
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 4px),
          repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 4px)
        `,
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ position: "relative", textAlign: "center", paddingTop: "40px", paddingBottom: "24px", paddingLeft: "24px", paddingRight: "24px" }}>
        <Link
          to="/"
          style={{
            position: "absolute",
            left: "20px",
            top: "40px",
            color: GOLD,
            opacity: 0.7,
            fontSize: "9px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: pixelFont,
          }}
        >
          ← home
        </Link>

        <p style={{ fontSize: "10px", letterSpacing: "8px", color: GOLD, opacity: 0.8, marginBottom: "14px" }}>
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>

        <div style={{ display: "inline-block", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              translate: "3px 3px",
              background: WOOD_DARK,
              opacity: 0.6,
              zIndex: 0,
            }}
          />
          <h1
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: pixelFont,
              fontSize: "22px",
              color: GOLD_LIGHT,
              letterSpacing: "3px",
              margin: 0,
              padding: "10px 20px",
              border: `3px solid ${GOLD}`,
              background: WOOD_DARK,
              textShadow: `2px 2px 0 ${WOOD_DARK}`,
            }}
          >
            MEMORIES
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", margin: "18px auto 0", maxWidth: "320px" }}>
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.5 }} />
          <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
          
          <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.5 }} />
        </div>
      </div>

      {/* ── SEARCH + ADD ── */}
      <div style={{ display: "flex", alignItems: "stretch", gap: "12px", padding: "0 20px", maxWidth: "720px", margin: "0 auto 32px" }}>
        {/* Search bar — parchment scroll input */}
        <div style={{ position: "relative", flex: 1 }}>
          <WoodPanel>
            <div style={{ display: "flex", alignItems: "center", padding: "10px 12px" }}>
              <span style={{ color: WOOD_MID, marginRight: "8px", fontSize: "12px" }}>🔍</span>
              <input
                type="text"
                placeholder="i dont even know if ts works"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: pixelFont,
                  fontSize: "9px",
                  color: INK,
                  letterSpacing: "0.5px",
                }}
              />
            </div>
          </WoodPanel>
        </div>

        {/* Add memory button — gold wooden sign button */}
        <Link
          to="/memories/add"
          style={{
            textDecoration: "none",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                translate: "3px 3px",
                background: WOOD_DARK,
                opacity: 0.7,
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                border: `3px solid ${WOOD_DARK}`,
                background: `linear-gradient(180deg, ${GOLD_LIGHT}, ${GOLD})`,
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                borderRadius: "2px",
              }}
            >
              <span style={{ fontFamily: pixelFont, fontSize: "12px", color: WOOD_DARK, fontWeight: "bold" }}>+</span>
              <span style={{ fontFamily: pixelFont, fontSize: "9px", color: WOOD_DARK, letterSpacing: "0.5px" }}>
                add kand or love
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* ── GRID ── */}
      <div style={{ padding: "0 20px 60px", maxWidth: "760px", margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <p style={{ fontSize: "32px", opacity: 0.3, marginBottom: "16px" }}>✦</p>
            
            <p style={{ fontFamily: pixelFont, fontSize: "8px", color: GOLD, opacity: 1, marginTop: "10px", letterSpacing: "1px" }}>
              wanna add these w you
            </p>
          </div>
        ) : (
          <div
            style={{
              columnCount: 2,
              columnGap: "14px",
            }}
          >
            {filtered.map((memory) => (
              <div key={memory.id} style={{ breakInsideAvoid: "avoid", marginBottom: "14px" }}>
                <MemoryCard memory={memory} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ textAlign: "center", paddingBottom: "40px" }}>
        <p style={{ fontFamily: pixelFont, fontSize: "8px", color: GOLD, opacity: 0.9, letterSpacing: "1px" }}>
          {memories.length} i love you so muchhhhhhhhhhhhhh
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

export default Memories;