import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { NAV_LINKS, SERVICES } from '../data';
import logoSvg from '../assets/logo.jpeg';
import { useCompanyLogo } from '../hooks/useCompanyLogo';
import { useCompanySettings } from '../hooks/useCompanySettings';

export default function Footer() {
  const logo = useCompanyLogo(logoSvg);
  const company = useCompanySettings();
  return (
    <footer className="bg-[#0D1B2A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-4 mb-4 group">
              {/* Logo mark */}
              <div className="relative flex-shrink-0">
                {/* Outer gold ring */}
                <div className="absolute inset-0 rounded-xl border border-[#C9A84C]/25 scale-[1.15] group-hover:border-[#C9A84C]/55 transition-all duration-300" />
                {/* Diagonal stripe pattern */}
                <div
                  className="absolute inset-0 rounded-xl opacity-15"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 6px)',
                  }}
                />
                <div
                  className="relative w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: '#0D1B2A', isolation: 'isolate' }}
                >
                  <img
                    src={logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
                  />
                </div>
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                <span className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full bg-[#C9A84C]/50" />
              </div>
              {/* Brand text */}
              <div className="flex flex-col leading-none gap-1">
                <span className="font-display font-bold text-white text-[22px] tracking-widest leading-none">ESRAT</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-px w-5 bg-[#C9A84C]/70" />
                  <span className="text-[#C9A84C] text-[9px] tracking-[0.28em] font-semibold uppercase">Associates</span>
                  <span className="h-px w-5 bg-[#C9A84C]/70" />
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mt-4">
              Professional Legal, Property & Corporate Consultancy Services across Bangladesh since 2013.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-5">
              Our Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9A84C] shrink-0" />
                <a
                  href={`tel:${company.phone}`}
                  className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
                >
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C9A84C] shrink-0" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-[#C9A84C] shrink-0" />
                <span className="text-white/60 text-sm">{company.website}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            Building Trust Through Professional Excellence Since {company.foundedPractice}.
          </p>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} ESRAT Associates. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
