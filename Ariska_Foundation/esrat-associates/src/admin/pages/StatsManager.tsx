import { useEffect, useState } from 'react';
import { getStats, updateStats } from '../api';
import { Plus, Trash2, Save } from 'lucide-react';

type Stat = { id?: number; order: number; value: number; suffix: string; label: string };

export default function StatsManager() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { getStats().then((r) => setStats(r.data)); }, []);

  const update = (idx: number, field: keyof Stat, val: string | number) => {
    setStats((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s));
  };

  const add = () => setStats((p) => [...p, { order: p.length, value: 0, suffix: '', label: '' }]);
  const remove = (idx: number) => setStats((p) => p.filter((_, i) => i !== idx));

  const save = async () => {
    setSaving(true);
    try {
      const data = stats.map((s, i) => ({ ...s, order: i }));
      await updateStats(data);
      setMsg('Saved!');
    } catch { setMsg('Error saving'); }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stats</h1>
          <p className="text-gray-500 text-sm">Homepage statistics counter section</p>
        </div>
        <button onClick={add}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold px-4 py-2 rounded-lg text-sm">
          <Plus size={15} /> Add Stat
        </button>
      </div>

      {msg && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">{msg}</div>}

      <div className="space-y-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <div className="flex-1 grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Value</label>
                <input type="number" value={s.value}
                  onChange={(e) => update(i, 'value', parseInt(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Suffix (e.g. +, %)</label>
                <input value={s.suffix} onChange={(e) => update(i, 'suffix', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Label</label>
                <input value={s.label} onChange={(e) => update(i, 'label', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
            </div>
            <button onClick={() => remove(i)} className="p-2 text-gray-300 hover:text-red-500">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving}
        className="mt-5 flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-50 text-[#0D1B2A] font-semibold px-6 py-2.5 rounded-lg text-sm">
        <Save size={15} /> {saving ? 'Saving…' : 'Save Stats'}
      </button>
    </div>
  );
}
