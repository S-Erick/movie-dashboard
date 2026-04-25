import { useState, useEffect, useRef, useCallback } from "react";
import { artworks, panelColors, AUTOPLAY_MS } from "./Data.jsx";
import { CarouselCard } from "./CarouselCard.jsx";
import { Sidebar } from "./Sidebar.jsx";

export function Home() {
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

  useEffect(() => {
    if (isPaused) return;
    startTimeRef.current = Date.now() - progress * AUTOPLAY_MS;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / AUTOPLAY_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        setActive((a) => (a + 1) % artworks.length);
        startTimeRef.current = Date.now();
        setProgress(0);
      }
      progressRef.current = requestAnimationFrame(tick);
    };

    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [isPaused]);

  return (
    <div
      className="h-[90vh] bg-[#0f0f0f] text-white flex flex-col select-none"
      style={{ fontFamily: "'Rajdhani', 'Share Tech Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        .nav-item {
          position: relative; cursor: pointer;
          transition: color 0.2s; letter-spacing: 0.12em;
          font-size: 0.78rem; font-weight: 600; color: #555; padding: 0 4px;
        }
        .nav-item:hover { color: #bbb; }
        .nav-item.active { color: #fff; }
        .nav-item.active::before {
          content: ''; position: absolute; left: -12px; top: 50%;
          transform: translateY(-50%); width: 5px; height: 12px; background: #4ade80;
        }
        .glitch-text { animation: glitch 9s infinite; }
        @keyframes glitch {
          0%,88%,100% { transform: translate(0); }
          90% { transform: translate(-2px, 1px); clip-path: inset(10% 0 70% 0); }
          92% { transform: translate(2px, -1px); clip-path: inset(65% 0 15% 0); }
          94% { transform: translate(0); }
        }
        .fade-info { animation: fadeInfo 0.35s ease forwards; }
        @keyframes fadeInfo {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .icon-btn {
          width: 32px; height: 32px; border: 1px solid #252525;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: border-color 0.2s, background 0.2s;
          background: transparent; color: #888;
        }
        .icon-btn:hover { border-color: #555; background: #1e1e1e; color: #fff; }
        .icon-btn.yellow { background: #c8b84a; border-color: #c8b84a; color: black; }
        .icon-btn.yellow:hover { background: #d9ca5a; }
      `}</style>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        <Sidebar
          active={active}
          current={current}
          colors={colors}
          goTo={goTo}
        />
        {/* Carousel main */}
        <main className="flex-1 flex flex-col relative overflow-hidden min-w-0">
          {/* Stage */}
          <div className="flex-1 relative">
            {artworks.map((artwork, i) => {
              let position = i - active;
              if (position > artworks.length / 2) position -= artworks.length;
              if (position < -artworks.length / 2) position += artworks.length;
              return (
                <CarouselCard
                  key={artwork.id}
                  artwork={artwork}
                  position={position}
                  colors={panelColors[i]}
                  onClick={() => goTo(i)}
                  setIsPaused={setIsPaused}
                />
              );
            })}
            {/* Vignette */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)",
              }}
            />
            {/* Side fades */}
            <div
              className="absolute top-0 left-0 bottom-0 w-36 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(to right, #0f0f0f, transparent)",
              }}
            />
            <div
              className="absolute top-0 right-0 bottom-0 w-36 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(to left, #0f0f0f, transparent)",
              }}
            />
            {/* Scan lines */}
            <div
              className="absolute inset-0 z-[15] pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
              }}
            />
            {/* Autoplay progress bar */}
            <div className="absolute top-0 left-0 right-0 h-px bg-[#1a1a1a] z-30">
              <div
                style={{
                  height: "100%",
                  width: `${progress * 100}%`,
                  background: colors.accent,
                  transition: "background 0.5s",
                }}
              />
            </div>
            {/* Paused pill */}
            {isPaused && (
              <div className="absolute top-4 right-6 z-30 flex items-center gap-1.5 opacity-40">
                <div className="w-1 h-3 bg-white" />
                <div className="w-1 h-3 bg-white" />
                <span className="text-white text-[8px] tracking-widest ml-1 font-mono">
                  PAUSED
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between px-8 py-4 border-t border-[#1c1c1c] flex-shrink-0 z-30">
            <div className="text-[#2a2a2a] text-[9px] tracking-widest">
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
                    background: active === i ? colors.accent : "#252525",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>

            <div className="text-[#252525] text-[8px] tracking-widest uppercase text-right leading-relaxed">
              <div>MISSION DEPENDENT PAYLOAD</div>
              <div>SYSTEM INTERFACES</div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={prev} className="icon-btn" aria-label="Previous">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="text-[#444] text-[11px] tracking-widest font-mono w-12 text-center">
                {String(active + 1).padStart(2, "0")}/{artworks.length}
              </span>
              <button onClick={next} className="icon-btn" aria-label="Next">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
