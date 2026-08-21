import { useEffect, useState } from 'react';
import { getAllServices, updateService } from '../api';
import { Pencil, X, Save, Plus, Trash2 } from 'lucide-react';

type Service = {
  id: number; order: number; slug: string; title: string;
  icon: string; description: string; active: boolean; items: string[];
};

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => getAllServices().then((r) => setServices(r.data));
  useEffect(() => { load(); }, []);

  const openEdit = (s: Service) => setEditing({ ...s, items: [...s.items] });

  const updateField = (field: keyof Service, val: unknown) =>
    setEditing((p) => p ? { ...p, [field]: val } : p);

  const updateItem = (idx: number, val: string) =>
    setEditing((p) => p ? { ...p, items: p.items.map((it, i) => i === idx ? val : it) } : p);

  const addItem = () => setEditing((p) => p ? { ...p, items: [...p.items, ''] } : p);
  const removeItem = (idx: number) => setEditing((p) => p ? { ...p, items: p.items.filter((_, i) => i !== idx) } : p);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const payload = {
        ...editing,
        items: editing.items.map((item, order) => ({ item, order })),
      };
      await updateService(editing.id, payload);
      setMsg('Service updated!');
      await load();
      setEditing(null);
    } catch { setMsg('Error saving'); }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Services</h1>
      <p className="text-gray-500 text-sm mb-6">Edit service titles, descriptions, and sub-items</p>

      {msg && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">{msg}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800 text-sm">{s.title}</span>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {s.active ? 'Active' : 'Hidden'}
                </span>
                <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-amber-500">
                  <Pencil size={14} />
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-xs line-clamp-2">{s.description}</p>
            <p className="text-gray-400 text-xs mt-1">{s.items.length} items</p>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">Edit: {editing.title}</h2>
              <button onClick={() => setEditing(null)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input value={editing.title} onChange={(e) => updateField('title', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Icon (Lucide name)</label>
                  <input value={editing.icon} onChange={(e) => updateField('icon', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
                <input value={editing.slug} onChange={(e) => updateField('slug', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={editing.description} onChange={(e) => updateField('description', e.target.value)} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="svc_active" checked={editing.active}
                  onChange={(e) => updateField('active', e.target.checked)} className="rounded" />
                <label htmlFor="svc_active" className="text-sm text-gray-600">Active</label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-600">Service Items</label>
                  <button onClick={addItem} className="flex items-center gap-1 text-xs text-[#C9A84C] hover:underline">
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {editing.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={it} onChange={(e) => updateItem(i, e.target.value)}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
                      <button onClick={() => removeItem(i)} className="text-gray-300 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600">Cancel</button>
                <button onClick={save} disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold text-sm">
                  <Save size={14} /> {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
