import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchTrending } from "../../../api/tmdb.js";
import { movieCards } from "./DataCarousel.jsx";
import { Card } from "./Card.jsx";

const CARD_W = 350;
const GAP = 14;
const STEP = CARD_W + GAP;

export function MovieCarousel() {
  const [bgImages, setBgImages] = useState([]);

  useEffect(() => {
    fetchTrending()
      .then((results) =>
        setBgImages(
          results.slice(0, 6).map((item) =>
            item.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
              : null
          )
        )
      )
      .catch(console.error);
  }, []);

  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const posRef = useRef(STEP * movieCards.length);
  const animRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startPos: 0,
    lastX: 0,
    lastT: 0,
    vel: 0,
  });

  const allCards = [...movieCards, ...movieCards, ...movieCards];

  const setPos = useCallback((p) => {
    const total = STEP * movieCards.length;
    if (p < total * 0.5) p += total;
    if (p > total * 1.5) p -= total;
    posRef.current = p;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${p}px)`;
    }
  }, []);

  useEffect(() => {
    setPos(posRef.current);
    const autoScroll = () => {
      if (!dragRef.current.active) setPos(posRef.current + 0.55);
      animRef.current = requestAnimationFrame(autoScroll);
    };
    animRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animRef.current);
  }, [setPos]);

  const startDrag = (clientX) => {
    dragRef.current = {
      active: true,
      startX: clientX,
      startPos: posRef.current,
      lastX: clientX,
      lastT: Date.now(),
      vel: 0,
    };
    cancelAnimationFrame(animRef.current);
  };

  const moveDrag = (clientX) => {
    if (!dragRef.current.active) return;
    setPos(dragRef.current.startPos - (clientX - dragRef.current.startX));
    const now = Date.now();
    dragRef.current.vel =
      ((clientX - dragRef.current.lastX) / (now - dragRef.current.lastT + 1)) *
      16;
    dragRef.current.lastX = clientX;
    dragRef.current.lastT = now;
  };

  const endDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    let v = -dragRef.current.vel;
    const momentum = () => {
      if (Math.abs(v) < 0.3) {
        const resume = () => {
          if (!dragRef.current.active) setPos(posRef.current + 0.55);
          animRef.current = requestAnimationFrame(resume);
        };
        animRef.current = requestAnimationFrame(resume);
        return;
      }
      setPos(posRef.current + v);
      v *= 0.92;
      animRef.current = requestAnimationFrame(momentum);
    };
    momentum();
  };

  const fecha = () => {
    const ahora = new Date();
    const opciones = {
      weekday: "long",
      month: "long",
      year: "numeric",
      day: "numeric",
    };
    return ahora.toLocaleDateString("es-ES", opciones);
  };

  return (
    <section className="w-full h-[80vh] flex flex-col justify-center">
      {/* header */}
      <div className="flex justify-between items-center mb-4 px-11">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            Mas Recientes
          </div>
          <div className="text-xs text-white/50 mt-0.5">{fecha()}</div>
        </div>
        <button className="flex items-center gap-3 text-xs text-white/50"></button>
        <Link
          to="/foryou"
          className="border border-[var(--border-1)] py-1 px-3 bg-white text-black text-base font-semibold hover:bg-[var(--bg-base)] hover:text-[var(--text-base)]"
        >
          Entrar [↗]
        </Link>
      </div>

      {/* track */}
      <div
        ref={wrapRef}
        className="overflow-hidden w-full cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: GAP }}
        >
          {allCards.map((card, i) => (
            <Card key={i} card={card} image={bgImages[i % movieCards.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
