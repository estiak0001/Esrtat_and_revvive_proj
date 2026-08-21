import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-6 z-50 w-11 h-11 rounded-full bg-[#0D1B2A] border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center shadow-lg hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-colors duration-200"
    >
      <ArrowUp size={18} />
    </button>
  );
}
