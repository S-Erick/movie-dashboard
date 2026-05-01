export function VideoCard({ video, onSelect }) {
  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-gray-900 cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl"
      style={{ aspectRatio: "9/13" }}
      onClick={() => onSelect(video)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90`}
      />
      <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 select-none">
        {video.emoji}
      </div>

      <div className="absolute top-3 right-3 text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded-full">
        {video.duration}
      </div>

      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        {video.tag && <p className="text-white/70 text-xs mb-1">{video.tag}</p>}
        <p className="text-white font-semibold text-sm leading-tight mb-2">
          {video.title}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-xs text-white font-bold">
            {video.user[0].toUpperCase()}
          </div>
          <span className="text-white/80 text-xs">{video.user}</span>
          {video.verified && <span className="text-blue-400 text-xs">✓</span>}
        </div>
      </div>
    </div>
  );
}
