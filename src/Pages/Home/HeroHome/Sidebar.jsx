import { artworks, panelColors } from "./Data.jsx";

export function Sidebar({ active, current, colors, goTo }) {
  return (
    <aside className="w-52 flex-shrink-0 border-r border-[var(--bg-surface-2)] flex flex-col py-6 px-5 gap-5 relative z-10 overflow-hidden">
      {/* cuadrado */}
      <div
        className="w-14 aspect-square border border-[var(--border-default)] transition-all duration-500"
        style={{ background: colors.accent + "44" }}
      />

      {/* barra de prograso */}
      <div>
        <div className="text-[var(--text-dim-3)] text-[9px] tracking-[0.25em] uppercase mb-2">
          ARKNIGHTS: ENDFIELD
        </div>
        <div className="h-1 w-full bg-[var(--bg-surface-1)] mb-1">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((active + 1) / artworks.length) * 100}%`,
              background: colors.accent,
            }}
          />
        </div>
        <div className="text-[var(--text-dim-1)] text-[9px] tracking-widest font-mono">
          {String(active + 1).padStart(2, "0")}/
          {String(artworks.length).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {["VIEW ORIGINAL", "WALLPAPER MODE"].map((label) => (
          <label
            key={label}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-3 h-3 border border-[var(--border-default)] group-hover:border-[var(--text-dim-3)] transition-colors" />
            <span className="text-[var(--text-dim-1)] text-[9px] tracking-wider">
              {label}
            </span>
          </label>
        ))}
      </div>

      <div className="border-t border-[var(--bg-surface-2)]" />

      <div key={`info-${active}`} className="fade-info flex flex-col gap-4">
        <div>
          <div className="text-[var(--text-dim-1)] text-[9px] tracking-[0.2em] mb-1">
            //Theme
          </div>
          <div className="text-white text-sm font-semibold tracking-wide">
            {current.theme}
          </div>
        </div>
        <div>
          <div className="text-[var(--text-dim-1)] text-[9px] tracking-[0.2em] mb-1">
            //Creator
          </div>
          <div className="text-white text-sm font-semibold">
            {current.creator}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div>
        <div className="text-white text-xs font-bold tracking-[0.25em] mb-1">
          ENDFIELD
        </div>
        <div
          className="text-black text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 inline-block transition-colors duration-500"
          style={{ background: colors.accent }}
        >
          INDUSTRIES
        </div>
      </div>

      <div
        className="font-black transition-colors duration-500"
        style={{
          fontSize: "5.5rem",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: colors.accent + "18",
        }}
      >
        {String(active + 1).padStart(2, "0")}
      </div>

      <div className="flex gap-2">
        <div className="icon-btn yellow">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </div>
        <div className="icon-btn yellow">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
