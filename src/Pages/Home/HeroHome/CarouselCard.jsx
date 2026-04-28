import { artworks, CornerCard } from "../DataHome.jsx";

export function CarouselCard({
  artwork,
  position,
  onClick,
  colors,
  setIsPaused,
}) {
  const abs = Math.abs(position);
  const isCenter = position === 0;
  const isVisible = abs <= 1;

  const isMobile = window.innerWidth < 1024;
  const tx = position * (isMobile ? window.innerWidth * 0.85 : 340);
  const scale = isCenter ? 1 : 0.85;
  const opacity = isCenter ? 1 : abs === 1 ? 0.45 : 0;
  const blur = isCenter ? 0 : 3;
  const zIndex = isCenter ? 10 : abs === 1 ? 5 : 0;

  return (
    <div
      onClick={() => !isCenter && onClick()}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`absolute left-1/2 top-1/2 w-[min(100%,900px)] aspect-[9/11.3] lg:aspect-[16/9] rounded-[2px] overflow-hidden border transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] [container-type:inline-size]
        ${isCenter ? "border-[var(--border-1)] cursor-default" : "border-[var(--border-2)] cursor-pointer"}
        ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{
        transform: `translateX(calc(-50% + ${tx}px)) translateY(-50%) scale(${scale})`,
        opacity,
        filter: `blur(${blur}px) brightness(${isCenter ? 1 : 0.5})`,
        zIndex,
        boxShadow: isCenter
          ? "0 0 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)"
          : "0 0 30px rgba(0,0,0,0.6)",
      }}
    >
      {/* background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.via}, ${colors.to})`,
        }}
      />

      {/* grilla */}
      <div
        className="absolute inset-0 [background-size:4.44cqw_4.44cqw]"
        style={{
          backgroundImage: `linear-gradient(var(--border-2) 1px, transparent 1px),
                          linear-gradient(90deg, var(--border-2) 1px, transparent 1px)`,
        }}
      />

      {/* texto */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10cqw] font-black text-[var(--text-3)] tracking-[-0.04em] select-none text-center p-[3.3%]">
          {artwork.title.toUpperCase()}
        </span>
      </div>

      {/* fondo retro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 0.22cqw, rgba(0,0,0,0.08) 0.22cqw, rgba(0,0,0,0.08) 0.44cqw)`,
        }}
      />

      {isCenter && (
        <>
          <CornerCard colors={colors} />

          {/* cuadros decorativos */}
          <div className="absolute top-3 left-3 flex gap-1">
            <div
              className="w-[6px] aspect-square opacity-80"
              style={{ background: colors.accent }}
            />
            <div
              className="w-[6px] aspect-square opacity-40"
              style={{ background: colors.accent }}
            />
          </div>

          {/* numeros internos arriba derecha */}
          <div
            className="absolute top-3 right-[14px] text-[10px] tracking-[0.2em]"
            style={{ color: `${colors.accent}99` }}
          >
            {artwork.num}/{String(artworks.length).padStart(2, "0")}
          </div>
        </>
      )}

      {/* gradiente texto abajo */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/70 to-transparent flex items-end px-[14px] pb-[10px]">
        <span className="text-xs tracking-[0.25em] text-[var(--text-2)] uppercase">
          {artwork.theme}
        </span>
      </div>

      {/* viñeta */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 40px rgba(0,0,0,0.4), inset 0 0 1px ${colors.accent}40`,
        }}
      />
    </div>
  );
}
