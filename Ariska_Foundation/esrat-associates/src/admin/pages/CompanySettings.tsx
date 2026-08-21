import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCompany, updateCompany, uploadFile } from '../api';
import { Save, Upload } from 'lucide-react';

type CompanyData = Record<string, string>;

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function CompanySettings() {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const { register, handleSubmit, reset, setValue, watch } = useForm<CompanyData>();
  const logoUrl = watch('logo_url');

  useEffect(() => {
    getCompany().then((r) => reset(r.data));
  }, [reset]);

  const onSubmit = async (data: CompanyData) => {
    setSaving(true);
    try {
      await updateCompany(data);
      setMsg('Settings saved successfully');
    } catch { setMsg('Error saving settings'); }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      setValue('logo_url', `${API_BASE}${res.data.url}`);
    } catch { setMsg('Logo upload failed'); }
    finally { setUploading(false); }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Company Settings</h1>
      <p className="text-gray-500 text-sm mb-6">Update your company information and branding</p>

      {msg && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">{msg}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Logo */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Logo & Branding</h2>
          <div className="flex items-center gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-20 h-20 object-contain rounded-lg border border-gray-100" />
            ) : (
              <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-xs">No logo</div>
            )}
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 hover:border-[#C9A84C] rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors">
              <Upload size={14} />
              {uploading ? 'Uploading…' : 'Upload Logo'}
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

        {/* Basic info */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-gray-700">Basic Information</h2>
          <SettingField label="Company Name" name="name" register={register} />
          <SettingField label="Tagline" name="tagline" register={register} />
          <SettingField label="Address" name="address" register={register} />
          <div className="grid grid-cols-2 gap-4">
            <SettingField label="Founded (Practice)" name="foundedPractice" register={register} />
            <SettingField label="Founded (Registered)" name="foundedRegistered" register={register} />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-gray-700">Contact Details</h2>
          <SettingField label="Phone (with country code)" name="phone" register={register} placeholder="+8801835058471" />
          <SettingField label="Phone Display" name="phoneDisplay" register={register} placeholder="+880 1835 058471" />
          <SettingField label="WhatsApp Number (digits only)" name="whatsapp" register={register} />
          <SettingField label="Email" name="email" register={register} type="email" />
          <SettingField label="Website" name="website" register={register} />
        </div>

        <button type="submit" disabled={saving}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-50 text-[#0D1B2A] font-semibold px-6 py-2.5 rounded-lg text-sm">
          <Save size={15} /> {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}

function SettingField({ label, name, register, placeholder, type = 'text' }: {
  label: string; name: string; register: Function; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} {...register(name)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]" />
    </div>
  );
}
