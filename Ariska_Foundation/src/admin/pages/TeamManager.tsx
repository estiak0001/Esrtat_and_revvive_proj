import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { api, assetUrl, uploadFile } from '../api'
import ListManager from '../components/ListManager'

type Item = { name: string; role: string; color: string; photo_url: string | null }

const COLORS = [
  { value: 'bg-teal-700', label: 'Teal' },
  { value: 'bg-amber-500', label: 'Amber' },
  { value: 'bg-sky-500', label: 'Sky' },
  { value: 'bg-emerald-500', label: 'Emerald' },
  { value: 'bg-violet-500', label: 'Violet' },
  { value: 'bg-rose-500', label: 'Rose' },
]

function PhotoCell({ item, onChange }: { item: Item; onChange: (url: string) => void }) {
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
      <div className={`h-12 w-12 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${item.color}`}>
        {item.photo_url ? (
          <img src={assetUrl(item.photo_url)} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-white text-xs font-bold">{item.name.charAt(0) || '?'}</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 text-xs font-medium text-teal-900/70 hover:text-amber-600 transition-colors"
      >
        <Upload size={13} />
        {uploading ? 'Uploading...' : 'Upload photo'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </div>
  )
}

export default function TeamManager() {
  return (
    <ListManager<Item>
      title="Team Members"
      description="Team member cards shown on the About page. Upload a real photo to replace the placeholder icon."
      fetchFn={() => api.get('/api/content/team-members')}
      saveFn={(data) => api.put('/api/content/team-members', data)}
      emptyItem={{ name: '', role: '', color: 'bg-teal-700', photo_url: null }}
      renderRow={(item, i, update) => (
        <div className="space-y-3">
          <PhotoCell item={item} onChange={(url) => update(i, { ...item, photo_url: url })} />
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              value={item.name}
              onChange={(e) => update(i, { ...item, name: e.target.value })}
              placeholder="Name"
              className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
            <input
              value={item.role}
              onChange={(e) => update(i, { ...item, role: e.target.value })}
              placeholder="Role"
              className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>
          <select
            value={item.color}
            onChange={(e) => update(i, { ...item, color: e.target.value })}
            className="rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition bg-white"
          >
            {COLORS.map((c) => (
              <option key={c.value} value={c.value}>
                Avatar color: {c.label}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  )
}
