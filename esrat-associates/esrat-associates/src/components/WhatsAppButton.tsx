import { useState } from 'react';
import { useCompanySettings } from '../hooks/useCompanySettings';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const company = useCompanySettings();
  const url = `https://wa.me/${company.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20discuss%20my%20requirements%20with%20ESRAT%20Associates.`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-6 z-50 flex items-center gap-2.5 group"
    >
      {/* Tooltip label — slides in from right on hover */}
      <div
        className={`bg-[#0D1B2A] text-white text-[12px] font-medium px-3 py-2 rounded-lg border border-white/10 shadow-xl whitespace-nowrap transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="text-[#25D366] font-semibold">Chat</span> on WhatsApp
      </div>

      {/* Button */}
      <div className="relative flex-shrink-0">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-xl bg-[#25D366]/25 animate-ping" />
        <span className="absolute inset-[-3px] rounded-xl border border-[#25D366]/20" />

        {/* Main button */}
        <div className="relative w-11 h-11 rounded-xl bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_8px_28px_rgba(37,211,102,0.55)] transition-all duration-300">
          {/* WhatsApp SVG icon */}
          <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white drop-shadow-sm">
            <path d="M16.004 2C8.28 2 2 8.28 2 16c0 2.45.648 4.75 1.776 6.75L2 30l7.46-1.742A13.94 13.94 0 0016.004 30C23.72 30 30 23.72 30 16S23.72 2 16.004 2zm0 25.4a11.55 11.55 0 01-5.89-1.6l-.42-.25-4.43 1.036 1.06-4.31-.274-.44A11.54 11.54 0 014.6 16c0-6.296 5.11-11.4 11.404-11.4C22.3 4.6 27.4 9.71 27.4 16S22.3 27.4 16.004 27.4zm6.27-8.554c-.344-.172-2.034-1.004-2.35-1.118-.314-.116-.544-.172-.773.172-.228.344-.886 1.118-1.086 1.348-.2.228-.4.258-.744.086-.344-.172-1.452-.536-2.766-1.706-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.7.154-.154.344-.4.516-.6.172-.2.228-.344.344-.572.114-.228.058-.43-.028-.6-.086-.172-.773-1.864-1.058-2.552-.278-.672-.562-.58-.773-.59l-.658-.012a1.26 1.26 0 00-.914.43c-.314.344-1.2 1.172-1.2 2.858 0 1.686 1.228 3.316 1.4 3.544.172.228 2.416 3.692 5.854 5.178.818.354 1.456.566 1.952.724.82.262 1.568.224 2.158.136.658-.098 2.034-.83 2.32-1.634.286-.804.286-1.492.2-1.634-.086-.144-.314-.228-.658-.4z" />
          </svg>
        </div>

        {/* Online indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white border-[1.5px] border-[#25D366] flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-[#25D366]" />
        </span>
      </div>
    </a>
  );
}
