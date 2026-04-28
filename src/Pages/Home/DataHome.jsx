export const artworks = [
  {
    id: 1,
    title: "HORIZONTES INFINITOS",
    theme: "AVENTURA DE CIENCIA FICCIÓN",
    num: "01",
  },
  {
    id: 2,
    title: "ECOS EN LA PENUMBRA",
    theme: "MISTERIO Y SUSPENSO",
    num: "02",
  },
  {
    id: 3,
    title: "LATIDOS INCONFESABLES",
    theme: "DRAMA ROMÁNTICO",
    num: "03",
  },
  {
    id: 4,
    title: "EL DESPERTAR DE LOS DIOSES",
    theme: "AVENTURA ÉPICA",
    num: "04",
  },
  {
    id: 5,
    title: "CONTRA EL RELOJ",
    theme: "ACCIÓN Y SUPERVIVENCIA",
    num: "05",
  },
  {
    id: 6,
    title: "CIRCUITOS DE LUZ",
    theme: "ESTÉTICA CYBERPUNK",
    num: "06",
  },
];
export const panelColors = [
  { from: "#78350f", via: "#292524", to: "#18181b", accent: "#fbbf24" },
  { from: "#064e3b", via: "#134e4a", to: "#18181b", accent: "#34d399" },
  { from: "#1e1b4b", via: "#312e81", to: "#18181b", accent: "#818cf8" },
  { from: "#4c0519", via: "#881337", to: "#18181b", accent: "#fb7185" },
  { from: "#0f172a", via: "#1e293b", to: "#020617", accent: "#38bdf8" },
  { from: "#3f1d2e", via: "#6b213f", to: "#1a0f14", accent: "#f472b6" },
];

export const AUTOPLAY_MS = 4000;

export function ArrowBtnL() {
  return (
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
  );
}

export function ArrowBtnR() {
  return (
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
  );
}

export function CornerCard({ colors }) {
  return (
    <>
      {/* esquinero arriba izquierda */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          width: 16,
          height: 16,
          borderTop: `1px solid ${colors.accent}80`,
          borderLeft: `1px solid ${colors.accent}80`,
        }}
      />

      {/* esquinero arriba derecha */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 16,
          height: 16,
          borderTop: `1px solid ${colors.accent}80`,
          borderRight: `1px solid ${colors.accent}80`,
        }}
      />
      {/* esquinero abajo izquierda */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          width: 16,
          height: 16,
          borderBottom: `1px solid ${colors.accent}80`,
          borderLeft: `1px solid ${colors.accent}80`,
        }}
      />
      {/* esquinero abajo derecha */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 16,
          height: 16,
          borderBottom: `1px solid ${colors.accent}80`,
          borderRight: `1px solid ${colors.accent}80`,
        }}
      />
    </>
  );
}
