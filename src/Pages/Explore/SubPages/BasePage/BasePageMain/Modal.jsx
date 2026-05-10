import { useState } from "react";
import { IMAGE_BASE_URL } from "../../../../../api/tmdb.js";
import { Link } from "react-router-dom";

const getLiked = () => {
  try { return JSON.parse(localStorage.getItem("liked_videos") || "[]"); }
  catch { return []; }
};

export function Modal({ video, onClose }) {
  const [liked, setLiked] = useState(() => getLiked().some((v) => v.id === video.id));
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    const current = getLiked();
    const updated = next
      ? [...current, video]
      : current.filter((v) => v.id !== video.id);
    localStorage.setItem("liked_videos", JSON.stringify(updated));
  };

  return (
    // fondo
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-2)] backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* elemento */}
      <div
        className="relative w-full max-w-2xl mx-4 overflow-hidden shadow-2xl animate-slide-up border border-[var(--border-2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* image area */}
        <div
          className={`relative  bg-[${IMAGE_BASE_URL}${video.backdrop_path}]`}
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={`${IMAGE_BASE_URL}${video.backdrop_path}`}
            alt={video.title}
            className="w-full h-full "
          />
          <button
            onClick={onClose}
            className=" absolute top-4 right-4 w-8 aspect-square rounded-full bg-[var(--bg-2)] flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Info */}
        <div className="bg-[var(--bg-base)] flex flex-col p-4 gap-2">
          <div className="flex w-full justify-between items-center ">
            <h2 className="text-[var(--text-base)] font-semibold text-lg mt-1">
              {video.title || video.original_name}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleLike}
                className="transition-transform hover:scale-110"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={liked ? "#ef4444" : "none"}
                  stroke={liked ? "#ef4444" : "white"}
                  strokeWidth="1"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button
                onClick={() => setSaved((s) => !s)}
                className="transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.5 3H19.5V21L12 16.5L4.5 21V3Z"
                    fill={saved ? "white" : "none"}
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-[var(--text-2)] text-sm mt-1">{video.overview}</p>
          <Link
            to="#"
            className="flex items-center gap-1 border border-[var(--border-1)] text-sm font-bold text-[var(--text-4)] bg-[var(--text-base)] w-max px-4 py-1.5 mt-3 hover:bg-white/60 transition-colors cursor-not-allowed"
          >
            Ver
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="var(--text-4)"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
