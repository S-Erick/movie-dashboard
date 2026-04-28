function LiveDot({ small = false, color = "bg-red-500" }) {
  return (
    <span
      className={`rounded-full animate-pulse inline-block ${color} ${
        small ? "w-1.5 h-1.5" : "w-2 h-2"
      }`}
    />
  );
}

function BadgeDot({ type }) {
  if (type === "NEW") return <LiveDot small color="bg-yellow-400" />;
  if (type === "HOT") return <LiveDot small color="bg-orange-500" />;
  return <LiveDot small />;
}

export function BadgeColor({ type }) {
  if (type === "NEW") return "bg-yellow-500/90";
  if (type === "HOT") return "bg-orange-600/90";
  return "bg-red-600/90";
}
export function Card({ card }) {
  const bgClass = card.bg || "";
  const bgInline = card.bgStyle ? { background: card.bgStyle } : {};
  const isDiscussion = card.type === "trending" || card.type === "community";
  const isEvent = card.type === "event" || card.type === "festival";
  const isLive = card.type === "premiere" || card.type === "genre";

  return (
    <div
      className={`relative flex-none w-[350px] aspect-[1/1.2] border border-[var(--border-1)] overflow-hidden text-white select-none ${bgClass}`}
      style={bgInline}
    >
      {/* fondo retro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 0.22cqw, rgba(0,0,0,0.08) 0.30cqw, rgba(0,0,0,0.08) 0.30cqw)`,
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-3.5">
        {/* top row */}
        <div className="flex justify-between items-start">
          <div>
            {card.badge && (
              <span
                className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${BadgeColor({ type: card.badge })}`}
              >
                <BadgeDot type={card.badge} />
                {card.badge}
              </span>
            )}
            {!card.badge && isDiscussion && card.sub && (
              <span className="text-[10px] tracking-widest text-white/60 font-medium px-2.5 py-1 rounded-full bg-white/10">
                {card.sub}
              </span>
            )}
          </div>
        </div>

        {/* bottom section */}
        <div className="flex flex-col gap-2">
          {/* avatars */}
          {isDiscussion && card.avatarLetters && (
            <div className="flex">
              {card.avatarLetters.map((letter, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[#141414] flex items-center justify-center text-[9px] font-bold"
                  style={{
                    background: card.avatarColors[i],
                    marginLeft: i === 0 ? 0 : -6,
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
          )}

          {/* date for event/festival */}
          {isEvent && card.dateTag && (
            <div>
              <div className="text-[18px] font-bold leading-tight">
                {card.dateTag}
              </div>
              <div className="text-[9px] tracking-[0.12em] text-white/60 uppercase mt-0.5">
                {card.sub}
              </div>
            </div>
          )}

          {/* title */}
          <div className="text-[16px] font-semibold leading-snug whitespace-pre-line">
            {card.title}
          </div>

          {/* subtitle for badge cards */}
          {isLive && (
            <div className="text-[12px] text-white/70">{card.sub}</div>
          )}

          {/* actions */}
          {(card.hasJoin || isEvent) && (
            <div className="flex items-center gap-2 flex-wrap">
              {isDiscussion && card.followers && (
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/15">
                  {card.followers} Seguidores
                </span>
              )}
              <button className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/15 border border-white/30 hover:bg-white/28 transition-colors">
                Unirse ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
