import { Link } from "react-router-dom";
import { useState } from "react";

const tabs = [
  { name: "Para Ti", href: "/foryou" },
  { name: "Peliculas", href: "/movies" },
  { name: "Series", href: "/shows" },
  { name: "Me Gusta", href: "/liked" },
  { name: "Guardados", href: "/saved" },
];

export function Header() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="sticky z-50 top-0 left-0 right-0 bg-[var(--bg-base)] py-6 flex items-center justify-between overflow-x-scroll md:overflow-x-auto">
      <nav className="flex items-center px-6 gap-6 border-b border-[var(--border-1)] shrink-0 overflow-x-auto">
        {tabs.map((tab, i) => (
          <Link
            key={tab.name}
            to={tab.href}
            onClick={() => setActiveTab(i)}
            className={`pb-3 text-sm whitespace-nowrap transition-colors font-medium ${activeTab === i ? "text-[var(--text-base)] border-b-2 border-[var(--text-base)]" : "text-[var(--text-2)] hover:text-gray-300"}`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
      <input
        type="text"
        placeholder="Buscar"
        className=" cursor-not-allowed bg-[var(--border-2)] text-[var(--text-base)] text-sm px-4 py-1.5 outline-none border border-[var(--border-1)] placeholder-[var(--text-2)] focus:border-[var(--border-3)]"
      />
    </div>
  );
}
