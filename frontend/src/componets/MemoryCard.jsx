import { useState } from "react";
import { Link } from "react-router-dom";

const WOOD_DARK   = "#3B1F0E";
const WOOD_MID    = "#6B3A1F";
const WOOD_LIGHT  = "#9B6235";
const GOLD        = "#C8922A";
const GOLD_LIGHT  = "#E8B84B";
const PARCHMENT   = "#F2E0B6";
const PARCHMENT_DARK = "#DEC99A";
const INK         = "#2C1A0E";

function PixelStar() {
  return (
    <span style={{ color: GOLD, fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>
      ✦
    </span>
  );
}

function MemoryCard({ memory }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/memories/${memory.id}`}
      className="block no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "transform 0.15s ease",
          position: "relative",
        }}
      >
        {/* pixel drop shadow */}
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

        {/* outermost border — dark wood */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            border: `4px solid ${WOOD_DARK}`,
            borderRadius: "2px",
            background: WOOD_DARK,
          }}
        >
          {/* mid wood frame */}
          <div
            style={{
              border: `3px solid ${WOOD_MID}`,
              background: WOOD_MID,
            }}
          >
            {/* gold inner border */}
            <div
              style={{
                border: `2px solid ${GOLD}`,
                background: GOLD,
              }}
            >
              {/* parchment interior */}
              <div style={{ background: PARCHMENT }}>

                {/* photo */}
                {memory.photos?.length > 0 && (
                  <div style={{ position: "relative", borderBottom: `3px solid ${GOLD}` }}>
                    <img
                      src={memory.photos[0].image}
                      alt={memory.title}
                      style={{
                        width: "100%",
                        maxHeight: "160px",
                        objectFit: "cover",
                        display: "block",
                        imageRendering: "pixelated",
                      }}
                    />
                    {/* sepia overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(180,120,40,0.15)",
                        mixBlendMode: "multiply",
                        pointerEvents: "none",
                      }}
                    />
                    {memory.photos.length > 1 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          background: WOOD_DARK,
                          border: `2px solid ${GOLD}`,
                          padding: "2px 6px",
                        }}
                      >
                        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: GOLD_LIGHT }}>
                          +{memory.photos.length}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* video */}
                {memory.photos?.length === 0 && memory.videos?.length > 0 && (
                  <div style={{ borderBottom: `3px solid ${GOLD}`, position: "relative" }}>
                    <video width="100%" style={{ display: "block" }}>
                      <source src={memory.videos[0].video_file} type="video/mp4" />
                    </video>
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "6px",
                        background: WOOD_DARK,
                        border: `2px solid ${GOLD}`,
                        padding: "2px 6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: GOLD_LIGHT }}>▶ video</span>
                    </div>
                  </div>
                )}

                {/* panel header bar */}
                <div
                  style={{
                    background: WOOD_MID,
                    padding: "6px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderBottom: `2px solid ${GOLD}`,
                  }}
                >
                  <PixelStar />
                  <span
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "9px",
                      color: PARCHMENT,
                      letterSpacing: "1px",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {memory.title}
                  </span>
                  <PixelStar />
                </div>

                {/* text body */}
                <div style={{ padding: "10px 12px 8px" }}>
                  {/* description */}
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "7px",
                      color: INK,
                      lineHeight: "2.2",
                      marginBottom: "10px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {memory.description}
                  </p>

                  {/* divider */}
                  <div
                    style={{
                      borderTop: `2px solid ${PARCHMENT_DARK}`,
                      borderBottom: `2px solid ${PARCHMENT_DARK}`,
                      padding: "5px 0",
                      marginBottom: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "6px",
                        color: WOOD_LIGHT,
                      }}
                    >
                      {new Date(memory.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "8px",
                        color: hovered ? GOLD_LIGHT : GOLD,
                        transition: "color 0.15s",
                      }}
                    >
                      ▶
                    </span>
                  </div>
                </div>

                {/* bottom wood strip */}
                <div
                  style={{
                    background: `linear-gradient(to right, ${WOOD_MID}, ${WOOD_LIGHT}, ${WOOD_MID})`,
                    height: "6px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MemoryCard;