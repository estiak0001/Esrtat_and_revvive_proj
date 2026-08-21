import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";
import { navLinks, siteInfo } from "../../data/site";
import { getSettings } from "../../lib/api";
import Button from "../shared/Button";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex flex-col items-start" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Revive Holidays"
            className={`h-7 w-auto sm:h-9 transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
          <span
            className={`mt-1.5 pl-1 text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
              scrolled ? "text-teal-600" : "text-amber-300"
            }`}
          >
            {settings.tagline || siteInfo.tagline}
          </span>
        </NavLink>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `font-display text-sm font-medium transition-colors ${
                  scrolled
                    ? isActive
                      ? "text-teal-600"
                      : "text-navy-700 hover:text-teal-600"
                    : isActive
                      ? "text-amber-300"
                      : "text-white/90 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/contact" variant="primary" className="!px-6 !py-2.5">
            Plan Your Journey
          </Button>
        </div>

        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            scrolled ? "text-navy-900" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-100 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-base font-medium ${
                    isActive ? "text-teal-600" : "text-navy-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" variant="primary" className="mt-2 w-full">
              Plan Your Journey
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
