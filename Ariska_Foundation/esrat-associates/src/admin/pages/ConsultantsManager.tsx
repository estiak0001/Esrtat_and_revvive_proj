import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api, uploadFile } from '../api';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save, Crown, User, ChevronUp, ChevronDown } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type Consultant = {
  id?: number;
  order: number;
  name: string;
  title: string;
  bio: string;
  photo_url: string;
  expertise: string;   // JSON string in form, array from API
  education: string;   // JSON string in form, array from API
  phone: string;
  email: string;
  is_founder: boolean;
  active: boolean;
};

const EMPTY: Consultant = {
  order: 0, name: '', title: '', bio: '', photo_url: '',
  expertise: '', education: '', phone: '', email: '',
  is_founder: false, active: true,
};

// Helpers to convert between JSON array and multi-line textarea
function arrayToText(val: unknown): string {
  if (Array.isArray(val)) return val.join('\n');
  if (typeof val === 'string') return val;
  return '';
}

function textToJson(val: string): string {
  const lines = val.split('\n').map(l => l.trim()).filter(Boolean);
  return JSON.stringify(lines);
}

export default function ConsultantsManager() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [editing, setEditing] = useState<Consultant | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const { register, handleSubmit, reset, setValue, watch } = useForm<Consultant>({ defaultValues: EMPTY });
  const photoUrl = watch('photo_url');

  const load = async () => {
    const res = await api.get('/api/consultants/all');
    // Convert arrays back to newline strings for form display
    setConsultants(res.data.map((c: Consultant & { expertise: unknown; education: unknown }) => ({
      ...c,
      expertise: arrayToText(c.expertise),
      education: arrayToText(c.education),
    })));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(EMPTY); reset(EMPTY); };
  const openEdit = (c: Consultant) => { setEditing(c); reset(c); };
  const closeForm = () => { setEditing(null); reset(EMPTY); };

  const onSubmit = async (data: Consultant) => {
    setSaving(true);
    const payload = {
      ...data,
      expertise: textToJson(data.expertise),
      education: textToJson(data.education),
    };
    try {
      if (editing?.id) await api.put(`/api/consultants/${editing.id}`, payload);
      else await api.post('/api/consultants', payload);
      setMsg('Saved successfully');
      await load();
      closeForm();
    } catch { setMsg('Error saving'); }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  const onDelete = async (id: number) => {
    if (!confirm('Delete this consultant?')) return;
    await api.delete(`/api/consultants/${id}`);
    await load();
  };

  const onToggle = async (id: number) => {
    await api.patch(`/api/consultants/${id}/toggle`);
    await load();
  };

  // Swap this consultant's serial position with its neighbor above/below and
  // persist both — works regardless of gaps/duplicates in the raw order values,
  // since it always swaps between whatever is logically adjacent on screen.
  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= consultants.length) return;
    const a = consultants[index];
    const b = consultants[target];
    const reordered = [...consultants];
    reordered[index] = b;
    reordered[target] = a;
    setConsultants(reordered); // optimistic UI update
    try {
      await Promise.all([
        api.put(`/api/consultants/${a.id}`, { ...a, order: b.order, expertise: textToJson(a.expertise), education: textToJson(a.education) }),
        api.put(`/api/consultants/${b.id}`, { ...b, order: a.order, expertise: textToJson(b.expertise), education: textToJson(b.education) }),
      ]);
      await load();
    } catch {
      setMsg('Error reordering');
      await load();
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      setValue('photo_url', `${API_BASE}${res.data.url}`);
    } catch { setMsg('Photo upload failed'); }
    finally { setUploading(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Consultants</h1>
          <p className="text-gray-500 text-sm">Manage consultant profiles shown on the Consultant page</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> Add Consultant
        </button>
      </div>

      {msg && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">{msg}</div>}

      {/* Consultant cards */}
      <div className="space-y-3 mb-8">
        {consultants.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-xl border">
            No consultants yet. Click "Add Consultant" to create one.
          </div>
        )}
        {consultants.map((c, i) => (
          <div key={c.id} className={`bg-white border rounded-xl p-4 flex items-start gap-4 ${!c.active ? 'opacity-50' : ''}`}>
            {/* Serial number + reorder controls */}
            <div className="flex flex-col items-center gap-0.5 flex-shrink-0 pt-0.5">
              <button onClick={() => move(i, -1)} disabled={i === 0}
                title="Move up" aria-label="Move up"
                className="p-0.5 rounded text-gray-300 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-300">
                <ChevronUp size={16} />
              </button>
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#0D1B2A] text-white text-xs font-bold">
                {i + 1}
              </span>
              <button onClick={() => move(i, 1)} disabled={i === consultants.length - 1}
                title="Move down" aria-label="Move down"
                className="p-0.5 rounded text-gray-300 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-300">
                <ChevronDown size={16} />
              </button>
            </div>
            {/* Avatar / photo */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0D1B2A] flex-shrink-0 flex items-center justify-center">
              {c.photo_url ? (
                <img src={c.photo_url} alt={c.name} className="w-full h-full object-cover" />
              ) : (
                <User size={24} className="text-[#C9A84C]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-gray-800 text-sm">{c.name}</span>
                {c.is_founder && (
                  <span className="flex items-center gap-1 text-xs bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 rounded-full px-2 py-0.5">
                    <Crown size={10} /> Founder
                  </span>
                )}
                {!c.active && <span className="text-xs text-gray-400">(hidden)</span>}
              </div>
              <p className="text-gray-500 text-xs">{c.title}</p>
              {c.email && <p className="text-gray-400 text-xs mt-0.5">{c.email}</p>}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button onClick={() => onToggle(c.id!)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                {c.active ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50">
                <Pencil size={15} />
              </button>
              <button onClick={() => onDelete(c.id!)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-800">{editing.id ? 'Edit Consultant' : 'New Consultant'}</h2>
              <button onClick={closeForm}><X size={18} className="text-gray-400" /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
              {/* Photo upload */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#0D1B2A] flex items-center justify-center flex-shrink-0">
                    {photoUrl ? (
                      <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-[#C9A84C]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 hover:border-[#C9A84C] rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors">
                      <Upload size={14} />
                      {uploading ? 'Uploading…' : 'Upload Photo'}
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                    {photoUrl && (
                      <button type="button" onClick={() => setValue('photo_url', '')}
                        className="text-xs text-red-400 hover:text-red-600 text-left">Remove photo</button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name" reg={register('name', { required: true })} placeholder="Md. Shahinur Islam" />
                <div>
                  <Field label="Serial No." type="number" reg={register('order', { valueAsNumber: true })} />
                  <p className="text-[11px] text-gray-400 mt-1">Lower shows first. Tip: use the ↑↓ arrows on the list instead of editing this by hand.</p>
                </div>
              </div>

              <Field label="Title / Designation" reg={register('title', { required: true })} placeholder="Founder & Principal Consultant" />

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bio</label>
                <textarea {...register('bio')} rows={4} placeholder="Short biography..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Areas of Expertise <span className="text-gray-400 font-normal">(one per line)</span>
                </label>
                <textarea {...register('expertise')} rows={4} placeholder="Legal Advisory & Documentation&#10;Property Consultancy&#10;..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] font-mono" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Education <span className="text-gray-400 font-normal">(one per line, e.g. "LL.M – University of Dhaka, 2012")</span>
                </label>
                <textarea {...register('education')} rows={3} placeholder="LL.M – University of Dhaka, 2012&#10;LL.B – University of Dhaka, 2010"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] font-mono" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Phone" reg={register('phone')} placeholder="+880 1835 058471" />
                <Field label="Email" reg={register('email')} placeholder="info@esratassociates.com" />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" {...register('is_founder')} className="rounded" />
                  <Crown size={14} className="text-[#C9A84C]" /> Mark as Founder
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" {...register('active')} className="rounded" />
                  Active (visible on site)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold text-sm disabled:opacity-50">
                  <Save size={14} /> {saving ? 'Saving…' : 'Save Consultant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, reg, placeholder, type = 'text' }: {
  label: string; reg: object; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} {...reg} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
    </div>
  );
}
