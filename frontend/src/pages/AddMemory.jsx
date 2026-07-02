import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
const RED         = "#8B2E1F";

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

const labelStyle = {
  fontFamily: pixelFont,
  fontSize: "8px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: GOLD,
  opacity: 0.9,
};

const inputStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: pixelFont,
  fontSize: "9px",
  color: INK,
  letterSpacing: "0.5px",
  padding: "12px 14px",
  boxSizing: "border-box",
};

function AddMemory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Create memory
      const response = await axios.post(
        "http://127.0.0.1:8000/api/memories/",
        { title, description, created_at: createdAt }
      );

      const memoryId = response.data.id;

      // Upload photos
      for (const photo of photos) {
        const formData = new FormData();
        formData.append("image", photo);
        formData.append("memory", memoryId);
        await axios.post("http://127.0.0.1:8000/api/photos/", formData);
      }

      // Upload videos
      for (const video of videos) {
        const formData = new FormData();
        formData.append("video_file", video);
        formData.append("memory", memoryId);
        await axios.post("http://127.0.0.1:8000/api/videos/", formData);
      }

      navigate("/memories");

    } catch (error) {
      console.log(error.response?.data);
      setError("something went wrong. please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${BG_GREEN} 0%, ${BG_GREEN_DARK} 100%)`,
        fontFamily: pixelFont,
        display: "flex",
        flexDirection: "column",
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
              fontSize: "18px",
              color: GOLD_LIGHT,
              letterSpacing: "2px",
              margin: 0,
              padding: "12px 20px",
              border: `3px solid ${GOLD}`,
              background: WOOD_DARK,
              textShadow: `2px 2px 0 ${WOOD_DARK}`,
            }}
          >
            Add a Memory
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", margin: "18px auto 0", maxWidth: "320px" }}>
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.5 }} />
          <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
          <div style={{ width: "6px", height: "6px", background: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
          <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.5 }} />
        </div>
      </div>

      {/* ── FORM ── */}
      <div style={{ padding: "0 20px 60px", maxWidth: "560px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Error message */}
          {error && (
            <div
              style={{
                background: "rgba(139,46,31,0.2)",
                border: `2px solid ${RED}`,
                borderRadius: "4px",
                padding: "12px 16px",
              }}
            >
              <p style={{ fontFamily: pixelFont, fontSize: "8px", color: "#E8A090", margin: 0, lineHeight: "1.8" }}>
                {error}
              </p>
            </div>
          )}

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={labelStyle}>title</label>
            <WoodPanel>
              <input
                type="text"
                placeholder="what shall we call this memory..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={inputStyle}
              />
            </WoodPanel>
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={labelStyle}>description</label>
            <WoodPanel>
              <textarea
                placeholder="tell the story of this moment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: "none", lineHeight: "1.8" }}
              />
            </WoodPanel>
          </div>

          {/* Date & time */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={labelStyle}>when did this happen</label>
            <WoodPanel>
              <input
                type="datetime-local"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                required
                style={{ ...inputStyle, colorScheme: "light" }}
              />
            </WoodPanel>
          </div>

          {/* Photos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={labelStyle}>photos</label>

            <label style={{ position: "relative", display: "block", cursor: "pointer" }}>
              <WoodPanel>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px" }}>
                  <span style={{ fontSize: "18px" }}>🖼️</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontFamily: pixelFont, fontSize: "9px", color: INK }}>
                      {photos.length > 0
                        ? `${photos.length} photo${photos.length > 1 ? "s" : ""} selected`
                        : "choose photos..."}
                    </span>
                    <span style={{ fontFamily: pixelFont, fontSize: "7px", color: WOOD_MID, opacity: 0.7 }}>
                      you can add more later
                    </span>
                  </div>
                </div>
              </WoodPanel>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files);
                  setPhotos((prev) => [...prev, ...newFiles]);
                  e.target.value = "";
                }}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
              />
            </label>

            {photos.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "6px" }}>
                {photos.map((photo, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <div style={{ border: `3px solid ${WOOD_DARK}`, background: WOOD_MID, padding: "2px" }}>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt=""
                        style={{
                          width: "72px",
                          height: "72px",
                          objectFit: "cover",
                          display: "block",
                          imageRendering: "pixelated",
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setPhotos((prev) => prev.filter((_, i) => i !== index))
                      }
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "0",
                        border: `2px solid ${WOOD_DARK}`,
                        background: RED,
                        color: PARCHMENT,
                        fontFamily: pixelFont,
                        fontSize: "9px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Videos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={labelStyle}>videos</label>

            <label style={{ position: "relative", display: "block", cursor: "pointer" }}>
              <WoodPanel>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px" }}>
                  <span style={{ fontSize: "18px" }}>🎬</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontFamily: pixelFont, fontSize: "9px", color: INK }}>
                      {videos.length > 0
                        ? `${videos.length} video${videos.length > 1 ? "s" : ""} selected`
                        : "choose videos..."}
                    </span>
                    <span style={{ fontFamily: pixelFont, fontSize: "7px", color: WOOD_MID, opacity: 0.7 }}>
                      you can add more later
                    </span>
                  </div>
                </div>
              </WoodPanel>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files);
                  setVideos((prev) => [...prev, ...newFiles]);
                  e.target.value = "";
                }}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
              />
            </label>

            {videos.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
                {videos.map((video, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: WOOD_MID,
                      border: `2px solid ${WOOD_DARK}`,
                      padding: "10px 12px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: pixelFont,
                        fontSize: "8px",
                        color: PARCHMENT,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginRight: "10px",
                      }}
                    >
                      🎥 {video.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setVideos((prev) => prev.filter((_, i) => i !== index))
                      }
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#E8A090",
                        fontFamily: pixelFont,
                        fontSize: "10px",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "4px 0" }}>
            <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.3 }} />
            <div style={{ width: "5px", height: "5px", background: GOLD, opacity: 0.5, transform: "rotate(45deg)" }} />
            <div style={{ flex: 1, height: "2px", background: WOOD_LIGHT, opacity: 0.3 }} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              position: "relative",
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.6 : 1,
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
                  padding: "14px",
                  textAlign: "center",
                  borderRadius: "2px",
                }}
              >
                <span style={{ fontFamily: pixelFont, fontSize: "9px", color: WOOD_DARK, letterSpacing: "1px" }}>
                  {submitting ? "saving memory..." : "✦ save this memory"}
                </span>
              </div>
            </div>
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddMemory;