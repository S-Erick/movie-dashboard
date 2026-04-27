import { useState, useEffect, useRef, useCallback } from "react";
import { artworks, panelColors, AUTOPLAY_MS, ArrowBtn } from "./Data.jsx";
import { Carousel } from "./Carousel.jsx";
import { Sidebar } from "./Sidebar.jsx";

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
    <div className="h-[100vh] pt-15 bg-[var(--bg-base)] text-white flex flex-col select-none">
      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <Sidebar
          active={active}
          current={current}
          colors={colors}
          goTo={goTo}
          current={current}
          colors={colors}
        />
        {/* Carousel main */}
        <main className="flex-1 flex flex-col relative overflow-hidden min-w-0">
          <div className="flex-1 relative">
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
            {/* viñeta */}
            {/* <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)",
              }}
            /> */}

            {/* blur lateral izquierdo */}
            {/* <div
              className="absolute top-0 left-0 bottom-0 w-36 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--bg-base), transparent)",
              }}
            /> */}

            {/* blur lateral derecho */}
            {/* <div
              className="absolute top-0 right-0 bottom-0 w-36 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, var(--bg-base), transparent)",
              }}
            /> */}

            {/* lineas retro */}
            {/* <div
              className="absolute inset-0 z-[15] pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
              }}
            /> */}

            {/* barra de progreso */}
            <div className="absolute top-0 left-0 right-0 h-px bg-[var(--bg-surface-1)] z-30">
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
            {/* {isPaused && (
              <div className="absolute top-4 right-6 z-30 flex items-center gap-1.5 opacity-40">
                <div className="w-1 h-3 bg-white" />
                <div className="w-1 h-3 bg-white" />
                <span className="text-white text-[8px] tracking-widest ml-1 font-mono">
                  PAUSED
                </span>
              </div>
            )} */}
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between px-8 py-4 border-t border-[var(--bg-surface-2)] flex-shrink-0 z-30">
            <div className="text-[var(--border-default)] text-[9px] tracking-widest">
              © GRYPHLINE
            </div>

            {/* Pill dots */}
            <div className="flex items-center gap-2">
              {artworks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: active === i ? 22 : 6,
                    height: 4,
                    background:
                      active === i ? colors.accent : "var(--border-subtle)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>

            <div className="text-[var(--border-subtle)] text-[8px] tracking-widest uppercase text-right leading-relaxed">
              <div>MISSION DEPENDENT PAYLOAD</div>
              <div>SYSTEM INTERFACES</div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={prev} className="icon-btn" aria-label="Previous">
                <ArrowBtn />
              </button>
              <span className="text-[var(--text-dim-2)] text-[11px] tracking-widest font-mono w-12 text-center">
                {String(active + 1).padStart(2, "0")}/{artworks.length}
              </span>
              <button onClick={next} className="icon-btn" aria-label="Next">
                <ArrowBtn className="rotate-180" />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
