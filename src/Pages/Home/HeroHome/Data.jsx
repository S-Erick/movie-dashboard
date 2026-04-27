export const artworks = [
  { id: 1, title: "DYE", theme: "DYE", creator: "Namie", num: "01" },
  {
    id: 2,
    title: "A CAT NAP",
    theme: "A Cat Nap",
    creator: "Namie",
    num: "02",
  },
  {
    id: 3,
    title: "SEEKING THE NORTH",
    theme: "Seeking The North",
    creator: "Atori",
    num: "03",
  },
  {
    id: 4,
    title: "HEATING UP",
    theme: "Heating Up",
    creator: "Yostar",
    num: "04",
  },
];

export const panelColors = [
  { from: "#78350f", via: "#292524", to: "#18181b", accent: "#fbbf24" },
  { from: "#064e3b", via: "#134e4a", to: "#18181b", accent: "#34d399" },
  { from: "#1e1b4b", via: "#312e81", to: "#18181b", accent: "#818cf8" },
  { from: "#4c0519", via: "#881337", to: "#18181b", accent: "#fb7185" },
];

export const AUTOPLAY_MS = 4000;

export function ArrowBtn() {
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
