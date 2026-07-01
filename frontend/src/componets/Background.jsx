function PageBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#160d1c] font-[Inter]">
      {/* base duotone vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2b1736] via-[#1c1124] to-[#0f0813]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,58,150,0.25),transparent_60%)]" />

      {/* film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* torn paper strip — signature element */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-24 bg-[#ece4e8]"
        style={{
          clipPath:
            "polygon(0 0,100% 0,100% 70%,92% 60%,84% 78%,76% 55%,68% 82%,60% 58%,52% 75%,44% 52%,36% 80%,28% 60%,20% 85%,12% 62%,4% 78%,0 60%)",
        }}
      />
      <div className="absolute inset-x-0 top-20 z-10 h-4 bg-gradient-to-b from-black/20 to-transparent" />

      {/* content */}
      <div className="relative z-20 pt-32">
        <header className="px-6 pb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-300/60">
            now playing
          </p>
          <h1 className="mt-2 font-[Cormorant_Garamond] text-5xl italic tracking-wide text-purple-50">
            Manic Sessions
          </h1>
        </header>

        <main className="px-6 pb-20">{children}</main>
      </div>
    </div>
  );
}

export default PageBackground;