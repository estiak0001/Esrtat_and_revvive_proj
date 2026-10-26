/**
 * Generic list manager — used for Why Choose, Industries, Core Values, Partners
 */
import { useEffect, useState, type ReactNode } from 'react';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';

interface ListManagerProps<T> {
  title: string;
  description: string;
  fetchFn: () => Promise<{ data: T[] }>;
  saveFn: (data: T[]) => Promise<unknown>;
  emptyItem: T;
  renderRow: (item: T, idx: number, update: (idx: number, val: T) => void) => ReactNode;
}

export default function ListManager<T extends object>({
  title, description, fetchFn, saveFn, emptyItem, renderRow,
}: ListManagerProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchFn().then((r) => setItems(r.data)); }, []);

  const update = (idx: number, val: T) =>
    setItems((p) => p.map((it, i) => i === idx ? val : it));

  const add = () => setItems((p) => [...p, { ...emptyItem }]);
  const remove = (idx: number) => setItems((p) => p.filter((_, i) => i !== idx));

  const save = async () => {
    setSaving(true);
    try {
      await saveFn(items.map((it, order) => ({ ...it, order })));
      setMsg('Saved successfully!');
    } catch { setMsg('Error saving'); }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <button onClick={add}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold px-4 py-2 rounded-lg text-sm">
          <Plus size={15} /> Add
        </button>
      </div>

      {msg && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">{msg}</div>}

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <GripVertical size={14} className="text-gray-300 flex-shrink-0" />
            <div className="flex-1">{renderRow(item, i, update)}</div>
            <button onClick={() => remove(i)} className="p-1.5 text-gray-300 hover:text-red-500 flex-shrink-0">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving}
        className="mt-5 flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-50 text-[#0D1B2A] font-semibold px-6 py-2.5 rounded-lg text-sm">
        <Save size={15} /> {saving ? 'Saving…' : `Save ${title}`}
      </button>
    </div>
  );
}
