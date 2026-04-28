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

  const tx = position * 340;
  const scale = isCenter ? 1 : 0.85;
  const opacity = isCenter ? 1 : abs === 1 ? 0.45 : 0;
  const blur = isCenter ? 0 : 3;
  const zIndex = isCenter ? 10 : abs === 1 ? 5 : 0;

  return (
    <div
      onClick={() => !isCenter && onClick()}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "900px",
        aspectRatio: "16/9",
        transform: `translateX(calc(-50% + ${tx}px)) translateY(-50%) scale(${scale})`,
        opacity,
        filter: `blur(${blur}px) brightness(${isCenter ? 1 : 0.5})`,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex,
        cursor: isCenter ? "default" : "pointer",
        pointerEvents: isVisible ? "auto" : "none",
        borderRadius: "2px",
        overflow: "hidden",
        border: isCenter
          ? "1px solid var(--border-1)"
          : "1px solid var(--border-2)",
        boxShadow: isCenter
          ? "0 0 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)"
          : "0 0 30px rgba(0,0,0,0.6)",
      }}
    >
      {/* background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${colors.from}, ${colors.via}, ${colors.to})`,
        }}
      />

      {/* grilla */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(var(--border-2) 1px, transparent 1px),
                          linear-gradient(90deg, var(--border-2) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* texto */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "6.5rem",
            fontWeight: 900,
            color: "var(--text-3)",
            letterSpacing: "-0.04em",
            userSelect: "none",
            textAlign: "center",
          }}
        >
          {artwork.title.toUpperCase()}
        </span>
      </div>

      {/* fondo retro */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)`,
          pointerEvents: "none",
        }}
      />

      {isCenter && (
        <>
          <CornerCard colors={colors} />

          {/* cuadros decorativos */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              display: "flex",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 6,
                aspectRatio: 1 / 1,
                background: colors.accent,
                opacity: 0.8,
              }}
            />
            <div
              style={{
                width: 6,
                aspectRatio: 1 / 1,
                background: colors.accent,
                opacity: 0.4,
              }}
            />
          </div>
          {/* numeros internos arriba derecha */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 14,
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: `${colors.accent}99`,
            }}
          >
            {artwork.num}/{artworks.length}
          </div>
        </>
      )}

      {/* gradiente texto abajo */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 48,
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          display: "flex",
          alignItems: "flex-end",
          padding: "0 14px 10px",
        }}
      >
        {/* textos abajo izquierda */}
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            color: "var(--text-2)",
            textTransform: "uppercase",
          }}
        >
          {artwork.theme}
        </span>
      </div>

      {/* viñeta */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 40px rgba(0,0,0,0.4), inset 0 0 1px ${colors.accent}40`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
