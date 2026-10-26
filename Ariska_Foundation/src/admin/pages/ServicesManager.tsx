import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import { api } from '../api'

type ServiceItem = { title: string; description: string }
type ServiceGroup = { heading: string; items: ServiceItem[] }
type ClientGroup = { category: string; names: string[] }
type Service = {
  id?: number
  slug: string
  title: string
  tagline: string
  intro: string
  groups: ServiceGroup[]
  clientGroups: ClientGroup[] | null
}

const EMPTY_SERVICE: Service = {
  slug: '',
  title: '',
  tagline: '',
  intro: '',
  groups: [{ heading: '', items: [{ title: '', description: '' }] }],
  clientGroups: null,
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [openId, setOpenId] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const load = () => {
    api.get('/api/content/services').then((res) => {
      setServices(res.data)
      setLoading(false)
    })
  }

  useEffect(load, [])

  const startEdit = (service: Service) => {
    setDraft(JSON.parse(JSON.stringify(service)))
    setOpenId(service.id ?? null)
  }

  const startNew = () => {
    setDraft(JSON.parse(JSON.stringify(EMPTY_SERVICE)))
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
        await api.put(`/api/content/services/${draft.id}`, draft)
      } else {
        await api.post('/api/content/services', draft)
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
    if (!confirm('Delete this service division? This cannot be undone.')) return
    await api.delete(`/api/content/services/${id}`)
    load()
  }

  // ---- draft mutation helpers ----
  const updateDraft = (patch: Partial<Service>) => setDraft((d) => (d ? { ...d, ...patch } : d))

  const updateGroup = (gi: number, patch: Partial<ServiceGroup>) => {
    if (!draft) return
    const groups = draft.groups.map((g, i) => (i === gi ? { ...g, ...patch } : g))
    updateDraft({ groups })
  }
  const addGroup = () => draft && updateDraft({ groups: [...draft.groups, { heading: '', items: [] }] })
  const removeGroup = (gi: number) => draft && updateDraft({ groups: draft.groups.filter((_, i) => i !== gi) })

  const updateItem = (gi: number, ii: number, patch: Partial<ServiceItem>) => {
    if (!draft) return
    const groups = draft.groups.map((g, i) =>
      i === gi ? { ...g, items: g.items.map((it, j) => (j === ii ? { ...it, ...patch } : it)) } : g,
    )
    updateDraft({ groups })
  }
  const addItem = (gi: number) => {
    if (!draft) return
    const groups = draft.groups.map((g, i) => (i === gi ? { ...g, items: [...g.items, { title: '', description: '' }] } : g))
    updateDraft({ groups })
  }
  const removeItem = (gi: number, ii: number) => {
    if (!draft) return
    const groups = draft.groups.map((g, i) => (i === gi ? { ...g, items: g.items.filter((_, j) => j !== ii) } : g))
    updateDraft({ groups })
  }

  const clientGroups = draft?.clientGroups ?? []
  const setClientGroups = (cg: ClientGroup[]) => updateDraft({ clientGroups: cg.length ? cg : null })
  const addClientGroup = () => setClientGroups([...clientGroups, { category: '', names: [] }])
  const removeClientGroup = (ci: number) => setClientGroups(clientGroups.filter((_, i) => i !== ci))
  const updateClientGroup = (ci: number, category: string, namesText: string) => {
    const names = namesText.split(',').map((s) => s.trim()).filter(Boolean)
    setClientGroups(clientGroups.map((c, i) => (i === ci ? { category, names } : c)))
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-xl font-bold text-teal-950">Services</h1>
          <p className="text-sm text-teal-900/60 mt-1">
            The 4 service divisions shown on the Services and Products pages, with their sub-groups and items.
          </p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-1.5 rounded-lg bg-teal-950 hover:bg-teal-900 text-white text-sm font-semibold px-4 py-2 shrink-0 transition-colors"
        >
          <Plus size={16} /> Add Division
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
            <ServiceEditor
              draft={draft}
              updateDraft={updateDraft}
              updateGroup={updateGroup}
              addGroup={addGroup}
              removeGroup={removeGroup}
              updateItem={updateItem}
              addItem={addItem}
              removeItem={removeItem}
              clientGroups={clientGroups}
              addClientGroup={addClientGroup}
              removeClientGroup={removeClientGroup}
              updateClientGroup={updateClientGroup}
              onCancel={cancel}
              onSave={save}
              saving={saving}
            />
          )}

          {services.map((service) => (
            <div key={service.id} className="rounded-xl border border-teal-900/10 bg-white overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-display font-semibold text-teal-950 truncate">{service.title}</p>
                  <p className="text-xs text-teal-900/50 truncate">{service.tagline}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => remove(service.id)}
                    className="text-teal-900/40 hover:text-rose-600 transition-colors p-1.5"
                    aria-label="Delete"
                  >
                    <Trash2 size={17} />
                  </button>
                  <button
                    onClick={() => (openId === service.id ? cancel() : startEdit(service))}
                    className="flex items-center gap-1 text-sm font-medium text-teal-900/70 hover:text-amber-600 transition-colors px-2 py-1.5"
                  >
                    {openId === service.id ? (
                      <>
                        Close <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        Edit <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {openId === service.id && draft && (
                <div className="border-t border-teal-900/10 p-4">
                  <ServiceEditor
                    draft={draft}
                    updateDraft={updateDraft}
                    updateGroup={updateGroup}
                    addGroup={addGroup}
                    removeGroup={removeGroup}
                    updateItem={updateItem}
                    addItem={addItem}
                    removeItem={removeItem}
                    clientGroups={clientGroups}
                    addClientGroup={addClientGroup}
                    removeClientGroup={removeClientGroup}
                    updateClientGroup={updateClientGroup}
                    onCancel={cancel}
                    onSave={save}
                    saving={saving}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ServiceEditor({
  draft,
  updateDraft,
  updateGroup,
  addGroup,
  removeGroup,
  updateItem,
  addItem,
  removeItem,
  clientGroups,
  addClientGroup,
  removeClientGroup,
  updateClientGroup,
  onCancel,
  onSave,
  saving,
}: {
  draft: Service
  updateDraft: (patch: Partial<Service>) => void
  updateGroup: (gi: number, patch: Partial<ServiceGroup>) => void
  addGroup: () => void
  removeGroup: (gi: number) => void
  updateItem: (gi: number, ii: number, patch: Partial<ServiceItem>) => void
  addItem: (gi: number) => void
  removeItem: (gi: number, ii: number) => void
  clientGroups: ClientGroup[]
  addClientGroup: () => void
  removeClientGroup: (ci: number) => void
  updateClientGroup: (ci: number, category: string, namesText: string) => void
  onCancel: () => void
  onSave: () => void
  saving: boolean
}) {
  return (
    <div className={draft.id || draft.slug === '' ? '' : 'rounded-xl border border-teal-900/10 bg-white p-4'}>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-teal-900/60 mb-1">Slug (URL id, unique)</label>
          <input
            value={draft.slug}
            onChange={(e) => updateDraft({ slug: e.target.value })}
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-teal-900/60 mb-1">Title</label>
          <input
            value={draft.title}
            onChange={(e) => updateDraft({ title: e.target.value })}
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Tagline</label>
        <input
          value={draft.tagline}
          onChange={(e) => updateDraft({ tagline: e.target.value })}
          className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-teal-900/60 mb-1">Intro</label>
        <textarea
          value={draft.intro}
          onChange={(e) => updateDraft({ intro: e.target.value })}
          rows={2}
          className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600">Sub-Groups &amp; Items</h4>
        <button onClick={addGroup} type="button" className="text-xs font-medium text-teal-900/70 hover:text-amber-600 flex items-center gap-1">
          <Plus size={14} /> Add Group
        </button>
      </div>
      <div className="space-y-4 mb-6">
        {draft.groups.map((group, gi) => (
          <div key={gi} className="rounded-lg border border-teal-900/10 p-3 bg-teal-950/[0.02]">
            <div className="flex items-center gap-2 mb-2">
              <input
                value={group.heading}
                onChange={(e) => updateGroup(gi, { heading: e.target.value })}
                placeholder="Group heading"
                className="flex-1 rounded-lg border border-teal-900/15 px-3 py-1.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
              <button onClick={() => removeGroup(gi)} className="text-teal-900/40 hover:text-rose-600 transition-colors p-1">
                <Trash2 size={15} />
              </button>
            </div>
            <div className="space-y-2 pl-2">
              {group.items.map((item, ii) => (
                <div key={ii} className="flex items-start gap-2">
                  <div className="flex-1 grid sm:grid-cols-2 gap-2">
                    <input
                      value={item.title}
                      onChange={(e) => updateItem(gi, ii, { title: e.target.value })}
                      placeholder="Item title"
                      className="w-full rounded-lg border border-teal-900/15 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                    />
                    <input
                      value={item.description}
                      onChange={(e) => updateItem(gi, ii, { description: e.target.value })}
                      placeholder="Item description"
                      className="w-full rounded-lg border border-teal-900/15 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                    />
                  </div>
                  <button onClick={() => removeItem(gi, ii)} className="text-teal-900/40 hover:text-rose-600 transition-colors p-1.5 shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addItem(gi)}
                type="button"
                className="text-xs font-medium text-teal-900/50 hover:text-amber-600 flex items-center gap-1"
              >
                <Plus size={13} /> Add item
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600">
          Key Partners / Clients (optional)
        </h4>
        <button onClick={addClientGroup} type="button" className="text-xs font-medium text-teal-900/70 hover:text-amber-600 flex items-center gap-1">
          <Plus size={14} /> Add Category
        </button>
      </div>
      <div className="space-y-3 mb-6">
        {clientGroups.map((cg, ci) => (
          <div key={ci} className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <input
                value={cg.category}
                onChange={(e) => updateClientGroup(ci, e.target.value, cg.names.join(', '))}
                placeholder="Category (e.g. Beverage & Pharmaceuticals)"
                className="w-full rounded-lg border border-teal-900/15 px-3 py-1.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
              <input
                defaultValue={cg.names.join(', ')}
                onBlur={(e) => updateClientGroup(ci, cg.category, e.target.value)}
                placeholder="Client names, comma separated"
                className="w-full rounded-lg border border-teal-900/15 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>
            <button onClick={() => removeClientGroup(ci)} className="text-teal-900/40 hover:text-rose-600 transition-colors p-1.5 shrink-0">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-teal-950 font-semibold px-6 py-2.5 text-sm transition-colors"
        >
          {saving ? 'Saving...' : 'Save Service'}
        </button>
        <button onClick={onCancel} className="text-sm font-medium text-teal-900/60 hover:text-teal-950 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}
