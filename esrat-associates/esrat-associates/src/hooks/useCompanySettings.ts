import { useState, useEffect } from 'react';
import { COMPANY } from '../data';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type CompanySettings = typeof COMPANY & { logo_url?: string };

let cached: CompanySettings | null = null;

export function useCompanySettings(): CompanySettings {
  const [settings, setSettings] = useState<CompanySettings>(cached || COMPANY);

  useEffect(() => {
    if (cached) {
      setSettings(cached);
      return;
    }
    fetch(`${API_BASE}/api/company`)
      .then((r) => r.json())
      .then((data) => {
        const merged = { ...COMPANY, ...data } as CompanySettings;
        cached = merged;
        setSettings(merged);
      })
      .catch(() => {});
  }, []);

  return settings;
}
