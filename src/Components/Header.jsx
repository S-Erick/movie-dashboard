import { Link } from "react-router-dom";
import { useState } from "react";

const options = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Shows", href: "/shows" },
  { name: "Account", href: "/account" },
];

const NavLinks = ({ className, onLinkClick }) => (
  <ul className={`list-none ${className}`}>
    {options.map((option) => (
      <li key={option.name}>
        <Link to={option.href} onClick={onLinkClick}>
          {option.name}
        </Link>
      </li>
    ))}
  </ul>
);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" fixed z-50 top-0 left-0 right-0 bg-[var(--bg-base)] flex items-center justify-between py-3 px-20">
      <Link to="/" className="flex">
        LOGO
      </Link>

      <nav className="hidden md:block">
        <NavLinks className="flex gap-8" onLinkClick={() => setIsOpen(false)} />
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border border-[var(--border-1)]">
          {/* Profile Picture */}
        </div>
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1b1b1b] border-b border-[var(--border-1)] p-6 md:hidden shadow-lg z-50">
          <NavLinks
            className="flex flex-col gap-5"
            onLinkClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
