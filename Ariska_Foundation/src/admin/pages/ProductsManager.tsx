import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Eye, EyeOff, Plus, Trash2, Upload, X } from 'lucide-react'
import { api, assetUrl, uploadFile } from '../api'

type Product = {
  id?: number
  slug: string
  title: string
  category: string | null
  summary: string
  description: string | null
  images: string[]
  active: boolean
}

const EMPTY: Product = {
  slug: '',
  title: '',
  category: '',
  summary: '',
  description: '',
  images: [],
  active: true,
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function ImageGallery({ images, onChange }: { images: string[]; onChange: (images: string[]) => void }) {
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

  const remove = (i: number) => onChange(images.filter((_, idx) => idx !== i))

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {images.map((src, i) => (
          <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden border border-teal-900/10 group">
            <img src={assetUrl(src)} alt="" className="h-full w-full object-cover" />
            {i === 0 && (
              <span className="absolute top-0.5 left-0.5 bg-teal-950 text-amber-400 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                Cover
              </span>
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute inset-0 bg-teal-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              <X size={16} className="text-white" />
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
        {uploading ? 'Uploading...' : 'Add images'}
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

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [openId, setOpenId] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const load = () => {
    api.get('/api/products/all').then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  useEffect(load, [])

  const startEdit = (p: Product) => {
    setDraft({ ...p })
    setOpenId(p.id ?? null)
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
        await api.put(`/api/products/${draft.id}`, draft)
      } else {
        await api.post('/api/products', draft)
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
    if (!confirm('Delete this product? This cannot be undone.')) return
    await api.delete(`/api/products/${id}`)
    load()
  }

  const toggle = async (id?: number) => {
    if (!id) return
    await api.patch(`/api/products/${id}/toggle`)
    load()
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-xl font-bold text-teal-950">Products</h1>
          <p className="text-sm text-teal-900/60 mt-1">
            Product showcase shown on the Products page — info + image gallery only, no pricing or checkout.
          </p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-1.5 rounded-lg bg-teal-950 hover:bg-teal-900 text-white text-sm font-semibold px-4 py-2 shrink-0 transition-colors"
        >
          <Plus size={16} /> Add Product
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
            <ProductEditor draft={draft} setDraft={setDraft} onCancel={cancel} onSave={save} saving={saving} />
          )}

          {products.map((p) => (
            <div key={p.id} className="rounded-xl border border-teal-900/10 bg-white overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                {p.images[0] && (
                  <img src={assetUrl(p.images[0])} alt="" className="h-12 w-12 rounded-lg object-cover shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-teal-950 truncate">{p.title}</p>
                  <p className="text-xs text-teal-900/50 truncate">{p.category}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggle(p.id)} className="text-teal-900/40 hover:text-teal-900 transition-colors p-1.5" aria-label="Toggle active">
                    {p.active ? <Eye size={17} /> : <EyeOff size={17} />}
                  </button>
                  <button onClick={() => remove(p.id)} className="text-teal-900/40 hover:text-rose-600 transition-colors p-1.5" aria-label="Delete">
                    <Trash2 size={17} />
                  </button>
                  <button
                    onClick={() => (openId === p.id ? cancel() : startEdit(p))}
                    className="flex items-center gap-1 text-sm font-medium text-teal-900/70 hover:text-amber-600 transition-colors px-2 py-1.5"
                  >
                    {openId === p.id ? (<>Close <ChevronUp size={16} /></>) : (<>Edit <ChevronDown size={16} /></>)}
                  </button>
                </div>
              </div>
              {openId === p.id && draft && (
                <div className="border-t border-teal-900/10 p-4">
                  <ProductEditor draft={draft} setDraft={setDraft} onCancel={cancel} onSave={save} saving={saving} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductEditor({
  draft,
  setDraft,
  onCancel,
  onSave,
  saving,
}: {
  draft: Product
  setDraft: (p: Product) => void
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
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Category</label>
        <input
          value={draft.category ?? ''}
          onChange={(e) => setDraft({ ...draft, category: e.target.value })}
          placeholder="e.g. Agro & Fresh Produce"
          className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />
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
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Full Description (shown on detail view)</label>
        <textarea
          value={draft.description ?? ''}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-teal-900/60 mb-2">Image Gallery (first image is the cover)</label>
        <ImageGallery images={draft.images} onChange={(images) => setDraft({ ...draft, images })} />
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
          {saving ? 'Saving...' : 'Save Product'}
        </button>
        <button onClick={onCancel} className="text-sm font-medium text-teal-900/60 hover:text-teal-950 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}
