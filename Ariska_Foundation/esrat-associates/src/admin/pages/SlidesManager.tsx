import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getSlides, createSlide, updateSlide, deleteSlide, toggleSlide, uploadFile } from '../api';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save } from 'lucide-react';

type Slide = {
  id?: number; order: number; badge: string; heading: string;
  highlight: string; sub: string; description: string;
  cta_label: string; cta_href: string; image_url?: string; active: boolean;
};

const EMPTY: Slide = {
  order: 0, badge: '', heading: '', highlight: '', sub: '',
  description: '', cta_label: '', cta_href: '', image_url: '', active: true,
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function SlidesManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [editing, setEditing] = useState<Slide | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const { register, handleSubmit, reset, setValue, watch } = useForm<Slide>({ defaultValues: EMPTY });
  const imageUrl = watch('image_url');

  const load = async () => {
    const res = await getSlides();
    setSlides(res.data);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(EMPTY); reset(EMPTY); };
  const openEdit = (s: Slide) => { setEditing(s); reset(s); };
  const closeForm = () => { setEditing(null); reset(EMPTY); };

  const onSubmit = async (data: Slide) => {
    setSaving(true);
    try {
      if (editing?.id) await updateSlide(editing.id, data);
      else await createSlide(data);
      setMsg('Saved successfully');
      await load();
      closeForm();
    } catch { setMsg('Error saving'); }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  const onDelete = async (id: number) => {
    if (!confirm('Delete this slide?')) return;
    await deleteSlide(id);
    await load();
  };

  const onToggle = async (id: number) => { await toggleSlide(id); await load(); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      setValue('image_url', `${API_BASE}${res.data.url}`);
    } catch { setMsg('Image upload failed'); }
    finally { setUploading(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hero Slides</h1>
          <p className="text-gray-500 text-sm">Manage homepage carousel slides</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> Add Slide
        </button>
      </div>

      {msg && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">{msg}</div>}

      {/* Slide cards */}
      <div className="space-y-3 mb-8">
        {slides.map((s) => (
          <div key={s.id} className={`bg-white border rounded-xl p-4 flex items-start gap-4 ${!s.active ? 'opacity-50' : ''}`}>
            {s.image_url && (
              <img src={s.image_url} alt="" className="w-20 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 rounded-full px-2 py-0.5">{s.badge}</span>
                {!s.active && <span className="text-xs text-gray-400">(hidden)</span>}
              </div>
              <p className="font-semibold text-gray-800 text-sm truncate">{s.heading} <span className="text-[#C9A84C]">{s.highlight}</span> {s.sub}</p>
              <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{s.description}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button onClick={() => onToggle(s.id!)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                {s.active ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50">
                <Pencil size={15} />
              </button>
              <button onClick={() => onDelete(s.id!)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit form modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-800">{editing.id ? 'Edit Slide' : 'New Slide'}</h2>
              <button onClick={closeForm}><X size={18} className="text-gray-400" /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Order" type="number" reg={register('order', { valueAsNumber: true })} />
                <Field label="Badge" reg={register('badge', { required: true })} placeholder="Legal Consultancy" />
              </div>
              <Field label="Heading" reg={register('heading', { required: true })} placeholder="Your Trusted Partner in" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Highlight (gold text)" reg={register('highlight', { required: true })} placeholder="Legal Advisory" />
                <Field label="Sub (after highlight)" reg={register('sub', { required: true })} placeholder="Services" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea {...register('description', { required: true })} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="CTA Button Label" reg={register('cta_label', { required: true })} placeholder="Learn More" />
                <Field label="CTA Link" reg={register('cta_href', { required: true })} placeholder="/services#legal" />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Banner Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 hover:border-[#C9A84C] rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors">
                    <Upload size={14} />
                    {uploading ? 'Uploading…' : 'Upload Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {imageUrl && <span className="text-xs text-gray-400 truncate max-w-xs">{imageUrl}</span>}
                </div>
                {imageUrl && (
                  <img src={imageUrl} alt="" className="mt-2 h-24 object-cover rounded-lg border" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" {...register('active')} className="rounded" />
                <label htmlFor="active" className="text-sm text-gray-600">Active (visible on site)</label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold text-sm disabled:opacity-50">
                  <Save size={14} /> {saving ? 'Saving…' : 'Save Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, reg, placeholder, type = 'text' }: { label: string; reg: object; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} {...reg} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
    </div>
  );
}
