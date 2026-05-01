import { Link } from "react-router-dom";
import { useState } from "react";

const tabs = [
  { name: "Peliculas", href: "/movies" },
  { name: "Series", href: "/shows" },
  { name: "Para Ti", href: "/404" },
  { name: "Guardados", href: "/404" },
  { name: "En Vivo", href: "/404" },
  { name: "Ver Despues", href: "/404" },
  { name: "Seguir Viendo", href: "/404" },
];

export function Header() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="sticky z-50 top-0 left-0 right-0 bg-[var(--bg-base)] py-6 flex items-center justify-between ">
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
        placeholder="Search"
        className="bg-[var(--border-2)] text-[var(--text-base)] text-sm px-4 py-1.5 w-10 outline-none border border-[var(--border-1)] placeholder-[var(--text-2)] focus:border-[var(--border-3)]"
      />
    </div>
  );
}
