import { useState, useEffect, useRef, useCallback } from "react";
import { artworks, panelColors, AUTOPLAY_MS, ArrowBtn } from "./Data.jsx";
import { CarouselCard } from "./CarouselCard.jsx";

export function Carousel({
  goTo,
  setActive,
  setIsPaused,
  setProgress,
  active,
  isPaused,
  progress,
  progressRef,
  startTimeRef,
}) {
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
    <>
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
    </>
  );
}
