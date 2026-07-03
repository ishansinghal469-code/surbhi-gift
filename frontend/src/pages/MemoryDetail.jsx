import API from "../services/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

function MemoryDetail() {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const response = await API.get(`memories/${id}/`);
        setMemory(response.data);
      } catch (error) {
        console.error("Error fetching memory:", error);
      }
    };

    fetchMemory();
  }, [id]);

  // ── Loading ──
  if (!memory) {
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
          finding this memory...
        </p>
        <style>{`
          @keyframes pulse { 0%,100% { opacity: 0.7; } 50% { opacity: 0.2; } }
        `}</style>
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
          to="/memories"
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
          ← back
        </Link>

        <p style={{ fontSize: "10px", letterSpacing: "8px", color: GOLD, opacity: 0.8, marginBottom: "14px" }}>
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>

        {/* Date above title */}
        <p style={{ fontFamily: pixelFont, fontSize: "8px", color: GOLD, opacity: 0.5, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
          {new Date(memory.created_at).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {/* Title — wooden signpost plaque */}
        <div style={{ display: "inline-block", position: "relative", maxWidth: "90%" }}>
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
              fontSize: "16px",
              color: GOLD_LIGHT,
              letterSpacing: "1.5px",
              margin: 0,
              padding: "14px 22px",
              border: `3px solid ${GOLD}`,
              background: WOOD_DARK,
              lineHeight: "1.6",
              textShadow: `2px 2px 0 ${WOOD_DARK}`,
            }}
          >
            {memory.title}
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", margin: "20px auto 0", maxWidth: "320px" }}>
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.5 }} />
          <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.5 }} />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: "0 20px 80px", maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Description — parchment scroll */}
        <WoodPanel>
          <div style={{ padding: "18px 20px" }}>
            <p
              style={{
                fontFamily: pixelFont,
                fontSize: "9px",
                color: INK,
                lineHeight: "2.4",
                textAlign: "center",
                margin: 0,
              }}
            >
              {memory.description}
            </p>
          </div>
        </WoodPanel>

        {/* ── Photo grid ── */}
        {memory.photos?.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <PixelStar size="9px" />
              <p style={{ fontFamily: pixelFont, fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: GOLD, margin: 0 }}>
                photos &nbsp;·&nbsp; {memory.photos.length}
              </p>
              <PixelStar size="9px" />
            </div>

            {memory.photos.length === 1 ? (
              <WoodPanel>
                <img
                  src={memory.photos[0].image}
                  alt={memory.title}
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                  }}
                />
              </WoodPanel>
            ) : (
              <div style={{ columnCount: 2, columnGap: "12px" }}>
                {memory.photos.map((photo, i) => (
                  <div key={photo.id} style={{ breakInsideAvoid: "avoid", marginBottom: "12px" }}>
                    <WoodPanel>
                      <img
                        src={photo.image}
                        alt={`${memory.title} — photo ${i + 1}`}
                        style={{
                          width: "100%",
                          display: "block",
                          objectFit: "cover",
                          imageRendering: "pixelated",
                        }}
                      />
                    </WoodPanel>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Videos ── */}
        {memory.videos?.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <PixelStar size="9px" />
              <p style={{ fontFamily: pixelFont, fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: GOLD, margin: 0 }}>
                videos &nbsp;·&nbsp; {memory.videos.length}
              </p>
              <PixelStar size="9px" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {memory.videos.map((video) => (
                <WoodPanel key={video.id}>
                  <video controls style={{ width: "100%", display: "block" }}>
                    <source src={video.video_file} type="video/mp4" />
                    Your browser does not support videos.
                  </video>
                </WoodPanel>
              ))}
            </div>
          </div>
        )}

        {/* No media state */}
        {memory.photos?.length === 0 && memory.videos?.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              border: `2px dashed ${WOOD_LIGHT}`,
              borderRadius: "4px",
              opacity: 0.6,
            }}
          >
            <p style={{ fontSize: "24px", opacity: 0.4, marginBottom: "10px" }}>✦</p>
            <p style={{ fontFamily: pixelFont, fontSize: "9px", color: PARCHMENT, opacity: 0.5 }}>
              just words, no photos
            </p>
          </div>
        )}

        {/* ── Divider ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.3 }} />
          <div style={{ width: "5px", height: "5px", background: GOLD, opacity: 0.5, transform: "rotate(45deg)" }} />
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.3 }} />
        </div>

        {/* ── Back button ── */}
        <Link to="/memories" style={{ textDecoration: "none", position: "relative" }}>
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
                padding: "14px",
                textAlign: "center",
                borderRadius: "2px",
              }}
            >
              <span style={{ fontFamily: pixelFont, fontSize: "9px", color: WOOD_DARK, letterSpacing: "1px" }}>
                ← back to memories
              </span>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default MemoryDetail;