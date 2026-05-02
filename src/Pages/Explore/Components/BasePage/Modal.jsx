import { useState, useEffect, useRef } from "react";

export function Modal({ video, onClose }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(intervalRef.current);
            setPlaying(false);
            return 100;
          }
          return p + 0.5;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video area */}
        <div
          className={`relative bg-gradient-to-b ${video.gradient}`}
          style={{ aspectRatio: "16/9" }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20 select-none">
            {video.emoji}
          </div>

          {/* Play/Pause overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={() => setPlaying((p) => !p)}
          >
            {!playing && (
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            )}
          </div>

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-xs text-white font-bold">
                {video.user[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-none">
                  {video.user}{" "}
                  {video.verified && <span className="text-blue-400">✓</span>}
                </p>
                <p className="text-white/60 text-xs">{video.duration}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full mb-3 accent-white cursor-pointer"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="text-white hover:opacity-70 transition-opacity"
                >
                  {playing ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="text-white hover:opacity-70 transition-opacity"
                >
                  {muted ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                      <path d="M15.54,8.46a5,5,0,0,1,0,7.07" />
                      <path d="M19.07,4.93a10,10,0,0,1,0,14.14" />
                    </svg>
                  )}
                </button>
                <span className="text-white/70 text-xs">
                  {Math.floor((progress * 0.6) / 10)}:
                  {String(Math.floor(((progress * 0.6) % 10) * 6)).padStart(
                    2,
                    "0",
                  )}{" "}
                  / {video.duration}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked((l) => !l)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={liked ? "#ef4444" : "none"}
                    stroke={liked ? "#ef4444" : "white"}
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="hover:opacity-70 cursor-pointer"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="hover:opacity-70 cursor-pointer"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-gray-950 p-4">
          {video.tag && (
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              {video.tag}
            </span>
          )}
          <h2 className="text-white font-semibold text-lg mt-1">
            {video.title}
          </h2>
          <p className="text-gray-400 text-sm mt-1">{video.desc}</p>
        </div>
      </div>
    </div>
  );
}
