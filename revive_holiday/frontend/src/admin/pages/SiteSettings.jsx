import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSettings, updateSettings, uploadFile } from "../api";
import { LuSave, LuUpload } from "react-icons/lu";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function SiteSettings() {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const heroImage = watch("hero_home_image");

  useEffect(() => {
    getSettings().then((r) => reset(r.data));
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateSettings(data);
      setMsg("Settings saved successfully");
    } catch {
      setMsg("Error saving settings");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleHeroUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      setValue("hero_home_image", `${API_BASE}${res.data.url}`);
    } catch {
      setMsg("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Site Settings</h1>
      <p className="text-gray-500 text-sm mb-6">Update site-wide text, contact details, and banner images</p>

      {msg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Homepage Hero</h2>
          <div className="flex items-center gap-4 mb-4">
            {heroImage ? (
              <img src={heroImage} alt="Hero" className="w-24 h-16 object-cover rounded-lg border border-gray-100" />
            ) : (
              <div className="w-24 h-16 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-xs">
                No image
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 hover:border-[#f98f0e] rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors">
              <LuUpload size={14} />
              {uploading ? "Uploading…" : "Upload Hero Image"}
              <input type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
            </label>
          </div>
          <SettingField label="Headline" name="hero_headline" register={register} />
          <SettingField label="Subtext" name="hero_subtext" register={register} />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-gray-700">Basic Information</h2>
          <SettingField label="Tagline" name="tagline" register={register} />
          <SettingField label="Strength Line" name="strength" register={register} />
          <SettingField label="Address" name="address" register={register} />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-gray-700">Contact Details</h2>
          <SettingField label="Phone" name="phone" register={register} />
          <SettingField label="WhatsApp Number" name="whatsapp" register={register} />
          <SettingField label="Email" name="email" register={register} type="email" />
          <SettingField label="Website" name="website" register={register} />
          <div className="grid grid-cols-2 gap-4">
            <SettingField label="Office Hours (Weekdays)" name="hours_weekdays" register={register} />
            <SettingField label="Office Hours (Friday)" name="hours_friday" register={register} />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#f98f0e] hover:bg-[#dd6c08] disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg text-sm"
        >
          <LuSave size={15} /> {saving ? "Saving…" : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

function SettingField({ label, name, register, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f98f0e]"
      />
    </div>
  );
}
