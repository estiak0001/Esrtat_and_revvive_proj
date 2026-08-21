import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let cachedLogoUrl: string | null = null;

export function useCompanyLogo(fallback: string): string {
  const [logoUrl, setLogoUrl] = useState<string>(cachedLogoUrl || fallback);

  useEffect(() => {
    if (cachedLogoUrl) {
      setLogoUrl(cachedLogoUrl);
      return;
    }
    fetch(`${API_BASE}/api/company`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.logo_url) {
          cachedLogoUrl = data.logo_url;
          setLogoUrl(data.logo_url);
        }
      })
      .catch(() => {});
  }, [fallback]);

  return logoUrl;
}
