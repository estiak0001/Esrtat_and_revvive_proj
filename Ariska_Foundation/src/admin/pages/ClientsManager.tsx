import { useRef, useState } from 'react'
import { Building2, Upload } from 'lucide-react'
import { api, assetUrl, uploadFile } from '../api'
import ListManager from '../components/ListManager'

type Item = { name: string; category: string; logo_url: string | null }

function LogoCell({ item, onChange }: { item: Item; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    setUploading(true)
    try {
      const res = await uploadFile(file)
      onChange(res.data.url)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-lg bg-teal-50 border border-teal-900/[0.06] flex items-center justify-center overflow-hidden shrink-0">
        {item.logo_url ? (
          <img src={assetUrl(item.logo_url)} alt="" className="h-full w-full object-contain p-1" />
        ) : (
          <div className="h-full w-full bg-teal-700 flex items-center justify-center">
            <Building2 size={18} className="text-amber-400" />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 text-xs font-medium text-teal-900/70 hover:text-amber-600 transition-colors"
      >
        <Upload size={13} />
        {uploading ? 'Uploading...' : 'Upload logo'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </div>
  )
}

export default function ClientsManager() {
  return (
    <ListManager<Item>
      title="Clients"
      description="Client companies shown on the Clients page and the Home page partner marquee, grouped by category. Upload a real logo to replace the placeholder icon."
      fetchFn={() => api.get('/api/content/clients')}
      saveFn={(data) => api.put('/api/content/clients', data)}
      emptyItem={{ name: '', category: '', logo_url: null }}
      renderRow={(item, i, update) => (
        <div className="space-y-3">
          <LogoCell item={item} onChange={(url) => update(i, { ...item, logo_url: url })} />
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              value={item.name}
              onChange={(e) => update(i, { ...item, name: e.target.value })}
              placeholder="Client name"
              className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
            <input
              value={item.category}
              onChange={(e) => update(i, { ...item, category: e.target.value })}
              placeholder="Category (e.g. Beverage & Pharmaceuticals)"
              className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>
        </div>
      )}
    />
  )
}
