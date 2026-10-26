import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Eye, EyeOff, Plus, Trash2, Upload, X } from 'lucide-react'
import { api, assetUrl, uploadFile } from '../api'

type Highlight = {
  id?: number
  slug: string
  title: string
  date_label: string | null
  cover_image: string | null
  summary: string
  content: string | null
  images: string[]
  active: boolean
}

const EMPTY: Highlight = {
  slug: '',
  title: '',
  date_label: '',
  cover_image: null,
  summary: '',
  content: '',
  images: [],
  active: true,
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function CoverUpload({ cover, onChange }: { cover: string | null; onChange: (url: string) => void }) {
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
      {cover && <img src={assetUrl(cover)} alt="" className="h-16 w-16 rounded-lg object-cover border border-teal-900/10" />}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 text-xs font-medium text-teal-900/70 hover:text-amber-600 transition-colors"
      >
        <Upload size={13} />
        {uploading ? 'Uploading...' : 'Upload cover image'}
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

function GalleryUpload({ images, onChange }: { images: string[]; onChange: (images: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFiles = async (files: FileList) => {
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const res = await uploadFile(file)
        uploaded.push(res.data.url)
      }
      onChange([...images, ...uploaded])
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {images.map((src, i) => (
          <div key={i} className="relative h-16 w-16 rounded-lg overflow-hidden border border-teal-900/10 group">
            <img src={assetUrl(src)} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, idx) => idx !== i))}
              className="absolute inset-0 bg-teal-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 text-xs font-medium text-teal-900/70 hover:text-amber-600 transition-colors"
      >
        <Upload size={13} />
        {uploading ? 'Uploading...' : 'Add gallery images'}
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files)
        }}
      />
    </div>
  )
}

export default function HighlightsManager() {
  const [items, setItems] = useState<Highlight[]>([])
  const [openId, setOpenId] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState<Highlight | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const load = () => {
    api.get('/api/highlights/all').then((res) => {
      setItems(res.data)
      setLoading(false)
    })
  }

  useEffect(load, [])

  const startEdit = (h: Highlight) => {
    setDraft({ ...h })
    setOpenId(h.id ?? null)
  }
  const startNew = () => {
    setDraft({ ...EMPTY })
    setOpenId('new')
  }
  const cancel = () => {
    setDraft(null)
    setOpenId(null)
  }

  const save = async () => {
    if (!draft) return
    setSaving(true)
    try {
      if (draft.id) {
        await api.put(`/api/highlights/${draft.id}`, draft)
      } else {
        await api.post('/api/highlights', draft)
      }
      setMessage('Saved successfully!')
      cancel()
      load()
    } catch {
      setMessage('Error saving changes.')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const remove = async (id?: number) => {
    if (!id) return
    if (!confirm('Delete this highlight? This cannot be undone.')) return
    await api.delete(`/api/highlights/${id}`)
    load()
  }

  const toggle = async (id?: number) => {
    if (!id) return
    await api.patch(`/api/highlights/${id}/toggle`)
    load()
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-xl font-bold text-teal-950">Highlights</h1>
          <p className="text-sm text-teal-900/60 mt-1">
            The image-gallery updates section on the Home page (shown as "Highlights", not "News").
          </p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-1.5 rounded-lg bg-teal-950 hover:bg-teal-900 text-white text-sm font-semibold px-4 py-2 shrink-0 transition-colors"
        >
          <Plus size={16} /> Add Highlight
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2.5 text-sm font-medium ${
            message.startsWith('Error') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-teal-900/50">Loading...</p>
      ) : (
        <div className="space-y-3">
          {openId === 'new' && draft && (
            <HighlightEditor draft={draft} setDraft={setDraft} onCancel={cancel} onSave={save} saving={saving} />
          )}

          {items.map((h) => (
            <div key={h.id} className="rounded-xl border border-teal-900/10 bg-white overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                {h.cover_image && <img src={assetUrl(h.cover_image)} alt="" className="h-12 w-12 rounded-lg object-cover shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-teal-950 truncate">{h.title}</p>
                  <p className="text-xs text-teal-900/50 truncate">{h.date_label}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggle(h.id)} className="text-teal-900/40 hover:text-teal-900 transition-colors p-1.5" aria-label="Toggle active">
                    {h.active ? <Eye size={17} /> : <EyeOff size={17} />}
                  </button>
                  <button onClick={() => remove(h.id)} className="text-teal-900/40 hover:text-rose-600 transition-colors p-1.5" aria-label="Delete">
                    <Trash2 size={17} />
                  </button>
                  <button
                    onClick={() => (openId === h.id ? cancel() : startEdit(h))}
                    className="flex items-center gap-1 text-sm font-medium text-teal-900/70 hover:text-amber-600 transition-colors px-2 py-1.5"
                  >
                    {openId === h.id ? (<>Close <ChevronUp size={16} /></>) : (<>Edit <ChevronDown size={16} /></>)}
                  </button>
                </div>
              </div>
              {openId === h.id && draft && (
                <div className="border-t border-teal-900/10 p-4">
                  <HighlightEditor draft={draft} setDraft={setDraft} onCancel={cancel} onSave={save} saving={saving} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HighlightEditor({
  draft,
  setDraft,
  onCancel,
  onSave,
  saving,
}: {
  draft: Highlight
  setDraft: (h: Highlight) => void
  onCancel: () => void
  onSave: () => void
  saving: boolean
}) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-teal-900/60 mb-1">Title</label>
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value, slug: draft.slug || slugify(e.target.value) })}
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-teal-900/60 mb-1">Slug</label>
          <input
            value={draft.slug}
            onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })}
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Date Label</label>
        <input
          value={draft.date_label ?? ''}
          onChange={(e) => setDraft({ ...draft, date_label: e.target.value })}
          placeholder="e.g. 2024"
          className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Cover Image</label>
        <CoverUpload cover={draft.cover_image} onChange={(url) => setDraft({ ...draft, cover_image: url })} />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Summary (shown on the card)</label>
        <textarea
          value={draft.summary}
          onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
          rows={2}
          className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Full Content (shown on detail view)</label>
        <textarea
          value={draft.content ?? ''}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          rows={5}
          className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-teal-900/60 mb-2">Extra Gallery Images (optional)</label>
        <GalleryUpload images={draft.images} onChange={(images) => setDraft({ ...draft, images })} />
      </div>
      <label className="flex items-center gap-2 text-sm text-teal-900/70 mb-4">
        <input
          type="checkbox"
          checked={draft.active}
          onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
          className="rounded border-teal-900/30"
        />
        Visible on the public site
      </label>
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-teal-950 font-semibold px-6 py-2.5 text-sm transition-colors"
        >
          {saving ? 'Saving...' : 'Save Highlight'}
        </button>
        <button onClick={onCancel} className="text-sm font-medium text-teal-900/60 hover:text-teal-950 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}
