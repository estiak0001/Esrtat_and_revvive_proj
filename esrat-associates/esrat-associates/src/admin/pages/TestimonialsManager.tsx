import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../api';
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, X, Star } from 'lucide-react';

type Testimonial = {
  id?: number;
  order: number;
  name: string;
  title: string;
  service: string;
  service_icon: string;
  review: string;
  rating: number;
  active: boolean;
};

const EMPTY: Testimonial = {
  order: 0, name: '', title: '', service: '', service_icon: 'Star',
  review: '', rating: 5, active: true,
};

const SERVICE_ICONS = [
  'Scale', 'Home', 'Building2', 'Globe', 'Landmark', 'FileText',
  'Star', 'Shield', 'CheckCircle', 'Briefcase',
];

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const { register, handleSubmit, reset } = useForm<Testimonial>({ defaultValues: EMPTY });

  const load = () =>
    api.get('/api/content/testimonials/all').then(r => setItems(r.data)).catch(() => {});

  useEffect(() => { load(); }, []);

  const openNew = () => { reset(EMPTY); setEditing(EMPTY); setMsg(''); };
  const openEdit = (t: Testimonial) => { reset(t); setEditing(t); setMsg(''); };
  const cancel = () => { setEditing(null); setMsg(''); };

  const onSubmit = async (data: Testimonial) => {
    setSaving(true);
    const payload = { ...data, order: Number(data.order), rating: Number(data.rating) };
    try {
      if (editing?.id) {
        await api.put(`/api/content/testimonials/${editing.id}`, payload);
      } else {
        await api.post('/api/content/testimonials', payload);
      }
      setMsg('Saved successfully');
      setEditing(null);
      load();
    } catch {
      setMsg('Error saving');
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (t: Testimonial) => {
    await api.put(`/api/content/testimonials/${t.id}`, { ...t, active: !t.active });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.delete(`/api/content/testimonials/${id}`);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Testimonials</h1>
          <p className="text-slate-500 text-sm mt-1">Manage client testimonials shown on the home page (first 3 active ones are displayed).</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {msg && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">{msg}</div>}

      {/* Form */}
      {editing !== null && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">{editing.id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <button onClick={cancel} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client Name *</label>
                <input {...register('name', { required: true })} placeholder="e.g. Rafiqul Islam" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title / Location *</label>
                <input {...register('title', { required: true })} placeholder="e.g. Business Owner, Dhaka" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service *</label>
                <input {...register('service', { required: true })} placeholder="e.g. Corporate Consultancy" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Icon</label>
                <select {...register('service_icon')} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40">
                  {SERVICE_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1–5)</label>
                <select {...register('rating')} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40">
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                <input type="number" {...register('order')} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Review Text *</label>
              <textarea {...register('review', { required: true })} rows={4} placeholder="Client review text..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 resize-none" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" {...register('active')} className="rounded" />
              <label htmlFor="active" className="text-sm text-slate-700">Active (visible on site)</label>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#162840] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
                <Save size={15} />{saving ? 'Saving...' : 'Save Testimonial'}
              </button>
              <button type="button" onClick={cancel} className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.length === 0 && <div className="text-slate-400 text-sm text-center py-12 bg-white rounded-2xl border border-slate-200">No testimonials yet. Add one above.</div>}
        {items.map(t => (
          <div key={t.id} className={`bg-white rounded-xl border p-5 flex gap-4 items-start ${t.active ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-800 text-sm">{t.name}</span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-slate-500 text-xs">{t.title}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={11} className="text-[#C9A84C] fill-current" />)}
                <span className="text-slate-400 text-xs ml-1">· {t.service}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">"{t.review}"</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full ${t.active ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                {t.active ? 'Active' : 'Hidden'}
              </span>
              <button onClick={() => toggle(t)} title={t.active ? 'Hide' : 'Show'} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                {t.active ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <Pencil size={15} />
              </button>
              <button onClick={() => remove(t.id!)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
