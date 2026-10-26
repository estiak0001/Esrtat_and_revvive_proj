import { useState } from 'react';
import ListManager from '../components/ListManager';
import { getPartners, updatePartners, uploadFile } from '../api';
import { Upload } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type Item = { id?: number; order: number; name: string; initials: string; color: string; logo_url?: string };

function LogoUploadCell({ item, idx, update }: { item: Item; idx: number; update: (i: number, v: Item) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      update(idx, { ...item, logo_url: `${API_BASE}${res.data.url}` });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 items-center">
      {/* Logo preview / upload */}
      <div className="flex items-center gap-1.5">
        {item.logo_url ? (
          <img src={item.logo_url} alt="" className="w-10 h-10 object-contain rounded border border-gray-100 bg-gray-50" />
        ) : (
          <div className="w-10 h-10 rounded flex items-center justify-center text-white text-xs font-bold border"
            style={{ backgroundColor: item.color }}>
            {item.initials?.slice(0, 3)}
          </div>
        )}
        <label className="cursor-pointer p-1 text-gray-400 hover:text-[#C9A84C] transition-colors" title="Upload logo">
          <Upload size={13} />
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      {/* Name */}
      <div className="col-span-2">
        <input value={item.name}
          onChange={(e) => update(idx, { ...item, name: e.target.value })}
          placeholder="Partner name"
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
      </div>
      {/* Initials */}
      <input value={item.initials}
        onChange={(e) => update(idx, { ...item, initials: e.target.value })}
        placeholder="Initials"
        className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
      {/* Color */}
      <div className="flex items-center gap-1">
        <input type="color" value={item.color}
          onChange={(e) => update(idx, { ...item, color: e.target.value })}
          className="w-8 h-8 rounded cursor-pointer border-0" title="Fallback color" />
      </div>
    </div>
  );
}

export default function PartnersManager() {
  return (
    <ListManager<Item>
      title="Partners & Clients"
      description="Upload logos for the 'Our Valued Clients' carousel. Use the upload icon next to each entry."
      fetchFn={getPartners}
      saveFn={updatePartners}
      emptyItem={{ order: 0, name: '', initials: '', color: '#C9A84C', logo_url: '' }}
      renderRow={(item, idx, update) => (
        <LogoUploadCell item={item} idx={idx} update={update} />
      )}
    />
  );
}
