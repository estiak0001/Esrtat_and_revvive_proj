import { useEffect, useState, type ReactNode } from 'react'
import { GripVertical, Plus, Trash2 } from 'lucide-react'

type ListManagerProps<T> = {
  title: string
  description: string
  fetchFn: () => Promise<{ data: T[] }>
  saveFn: (data: T[]) => Promise<unknown>
  emptyItem: T
  renderRow: (item: T, index: number, update: (index: number, value: T) => void) => ReactNode
}

export default function ListManager<T extends object>({
  title,
  description,
  fetchFn,
  saveFn,
  emptyItem,
  renderRow,
}: ListManagerProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchFn()
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const update = (index: number, value: T) => {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  const add = () => setItems((prev) => [...prev, { ...emptyItem }])
  const remove = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index))

  const save = async () => {
    setSaving(true)
    try {
      await saveFn(items)
      setMessage('Saved successfully!')
    } catch {
      setMessage('Error saving changes.')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-xl font-bold text-teal-950">{title}</h1>
          <p className="text-sm text-teal-900/60 mt-1">{description}</p>
        </div>
        <button
          onClick={add}
          className="flex items-center gap-1.5 rounded-lg bg-teal-950 hover:bg-teal-900 text-white text-sm font-semibold px-4 py-2 shrink-0 transition-colors"
        >
          <Plus size={16} /> Add
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
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-teal-900/10 bg-white p-4">
              <GripVertical size={18} className="text-teal-900/20 mt-2 shrink-0" />
              <div className="flex-1 min-w-0">{renderRow(item, i, update)}</div>
              <button
                onClick={() => remove(i)}
                className="text-teal-900/40 hover:text-rose-600 transition-colors shrink-0 mt-1.5"
                aria-label="Remove"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-teal-900/40 text-center py-8">No items yet — click "Add" to create one.</p>
          )}
        </div>
      )}

      <button
        onClick={save}
        disabled={saving || loading}
        className="mt-6 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-teal-950 font-semibold px-6 py-2.5 text-sm transition-colors"
      >
        {saving ? 'Saving...' : `Save ${title}`}
      </button>
    </div>
  )
}
