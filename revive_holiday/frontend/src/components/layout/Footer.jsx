import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LuMapPin, LuPhone, LuMail, LuClock } from "react-icons/lu";
import { navLinks, footerServiceLinks, siteInfo } from "../../data/site";
import { getSettings } from "../../lib/api";
import logo from "../../assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt="Revive Holidays" className="h-9 w-auto brightness-0 invert" />
          <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-300">
            {settings.tagline || siteInfo.tagline}
          </p>
          <p className="mt-4 font-display text-sm italic text-amber-300">
            &ldquo;Creating Journeys, Crafting Memories&rdquo;
          </p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-navy-300">
            {settings.strength || siteInfo.strength}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className="text-sm text-navy-200 transition-colors hover:text-amber-300"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-3">
            {footerServiceLinks.map((service) => (
              <li key={service} className="text-sm text-navy-200">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-200">
            <li className="flex items-start gap-2">
              <LuMapPin className="mt-0.5 shrink-0 text-amber-400" size={16} />
              <span>{settings.address || siteInfo.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <LuPhone className="mt-0.5 shrink-0 text-amber-400" size={16} />
              <span>{settings.phone || siteInfo.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <LuMail className="mt-0.5 shrink-0 text-amber-400" size={16} />
              <span>{settings.email || siteInfo.email}</span>
            </li>
            <li className="flex items-start gap-2">
              <LuClock className="mt-0.5 shrink-0 text-amber-400" size={16} />
              <span>
                {settings.hours_weekdays || siteInfo.hours.weekdays}
                <br />
                {settings.hours_friday || siteInfo.hours.friday}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-navy-400 sm:flex-row">
          <p>© {year} Revive Holidays. All Rights Reserved.</p>
          <p className="text-center">
            International Tours · Visa Assistance · Flight Booking · Hotel Reservation · Corporate
            Travel · Umrah Packages
          </p>
        </div>
      </div>
    </footer>
  );
}
