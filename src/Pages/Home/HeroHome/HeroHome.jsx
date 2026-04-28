import { useState, useEffect, useRef, useCallback } from "react";
import {
  artworks,
  panelColors,
  AUTOPLAY_MS,
  ArrowBtnL,
  ArrowBtnR,
} from "../DataHome.jsx";
import { Carousel } from "./Carousel.jsx";

function IconBtn({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-8 h-8 border border-[var(--border-1)] flex items-center justify-center cursor-pointer transition-[border-color,background,color] duration-200 bg-transparent text-[var(--text-muted)] hover:border-[var(--border-2)] hover:bg-[var(--border-1)] hover:text-[var(--text-base)]"
    >
      {children}
    </button>
  );
}

export function HeroHome() {
  const [active, setActive] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const current = artworks[active];
  const colors = panelColors[active];

  const goTo = useCallback((idx) => {
    setActive(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const prev = () => goTo((active - 1 + artworks.length) % artworks.length);
  const next = () => goTo((active + 1) % artworks.length);

  return (
    <section className="h-[90vh] pt-15 bg-[var(--bg-base)] text-white flex flex-col select-none overflow-hidden">
      {/* Carousel */}
      <div className="flex-1 relative min-h-0">
        <Carousel
          goTo={goTo}
          setActive={setActive}
          setIsPaused={setIsPaused}
          setProgress={setProgress}
          active={active}
          isPaused={isPaused}
          progress={progress}
          progressRef={progressRef}
          startTimeRef={startTimeRef}
        />

        {/* barra de progreso */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border-1)] z-30">
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: colors.accent,
              transition: "background 0.5s",
            }}
          />
        </div>

        {/* texto e icono "paused" */}
        {isPaused && (
          <div className="absolute top-4 right-6 z-30 flex items-center gap-1.5 opacity-40">
            <div className="w-1 h-3 bg-[var(--text-base)]" />
            <div className="w-1 h-3 bg-[var(--text-base)]" />
            <span className="text-[var(--text-base)] text-[8px] tracking-widest ml-1">
              PAUSED
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end px-8 py-4 gap-10">
        {/* Indicadores carrusel */}
        <div className="flex items-center gap-2">
          {artworks.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: active === i ? 22 : 6,
                height: 4,
                background: active === i ? colors.accent : "var(--border-1)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* botones navegación */}
        <div className="flex items-center gap-3">
          <IconBtn onClick={prev} label="Previous">
            <ArrowBtnL />
          </IconBtn>
          <span className="text-[var(--text-dim-2)] text-[11px] tracking-widest w-12 text-center">
            {String(active + 1).padStart(2, "0")}/{artworks.length}
          </span>
          <IconBtn onClick={next} label="Next">
            <ArrowBtnR />
          </IconBtn>
        </div>
      </div>
    </section>
  );
}
