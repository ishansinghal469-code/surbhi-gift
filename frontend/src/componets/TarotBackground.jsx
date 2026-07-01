// src/components/TarotBackground.jsx
function TarotBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a120a] font-serif">
      {/* base parchment gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2b1d10] via-[#1f150c] to-[#100b06]" />

      {/* candle glow, top-left like the photo's light source */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,184,92,0.25),transparent_70%)]" />
      <div className="pointer-events-none absolute left-10 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,200,110,0.18),transparent_65%)]" />

      {/* parchment fiber texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default TarotBackground;