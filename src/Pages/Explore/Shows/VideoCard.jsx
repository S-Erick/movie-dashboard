import { IMAGE_BASE_URL } from "../../../api/tmdb.js";

export function VideoCard({ video, onSelect }) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer transition-transform duration-300 hover:outline outline-[var(--border-1)]"
      style={{ aspectRatio: "9/13" }}
      onClick={() => onSelect(video)}
    >
      {video.poster_path ? (
        <img
          src={`${IMAGE_BASE_URL}${video.poster_path}`}
          alt={video.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--bg-surface-1)]" />
      )}

      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <p className="text-white font-semibold text-sm leading-tight">
          {video.name}
        </p>
      </div>
    </div>
  );
}
