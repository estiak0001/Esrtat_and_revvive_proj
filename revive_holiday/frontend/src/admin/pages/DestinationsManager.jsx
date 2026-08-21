import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getDestinations, createDestination, updateDestination,
  deleteDestination, toggleDestination, uploadFile,
} from "../api";
import { LuPlus, LuPencil, LuTrash2, LuEye, LuEyeOff, LuUpload, LuX, LuSave } from "react-icons/lu";

const EMPTY = { order: 0, name: "", description: "", image_url: "", active: true };

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function DestinationsManager() {
  const [destinations, setDestinations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const { register, handleSubmit, reset, setValue, watch } = useForm({ defaultValues: EMPTY });
  const imageUrl = watch("image_url");

  const load = async () => {
    const res = await getDestinations();
    setDestinations(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(EMPTY);
    reset(EMPTY);
  };
  const openEdit = (d) => {
    setEditing(d);
    reset(d);
  };
  const closeForm = () => {
    setEditing(null);
    reset(EMPTY);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (editing?.id) await updateDestination(editing.id, data);
      else await createDestination(data);
      setMsg("Saved successfully");
      await load();
      closeForm();
    } catch {
      setMsg("Error saving");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this destination?")) return;
    await deleteDestination(id);
    await load();
  };

  const onToggle = async (id) => {
    await toggleDestination(id);
    await load();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      setValue("image_url", `${API_BASE}${res.data.url}`);
    } catch {
      setMsg("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Destinations</h1>
          <p className="text-gray-500 text-sm">Manage destination cards shown on the site</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#f98f0e] hover:bg-[#dd6c08] text-white font-semibold px-4 py-2 rounded-lg text-sm"
        >
          <LuPlus size={16} /> Add Destination
        </button>
      </div>

      {msg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">
          {msg}
        </div>
      )}

      <div className="space-y-3 mb-8">
        {destinations.map((d) => (
          <div
            key={d.id}
            className={`bg-white border rounded-xl p-4 flex items-start gap-4 ${!d.active ? "opacity-50" : ""}`}
          >
            {d.image_url && (
              <img src={d.image_url} alt="" className="w-20 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-800 text-sm">{d.name}</p>
                {!d.active && <span className="text-xs text-gray-400">(hidden)</span>}
              </div>
              <p className="text-gray-500 text-xs line-clamp-1">{d.description}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button onClick={() => onToggle(d.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                {d.active ? <LuEye size={15} /> : <LuEyeOff size={15} />}
              </button>
              <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50">
                <LuPencil size={15} />
              </button>
              <button onClick={() => onDelete(d.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                <LuTrash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-gray-800">{editing.id ? "Edit Destination" : "New Destination"}</h2>
              <button onClick={closeForm}>
                <LuX size={18} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Order" type="number" reg={register("order", { valueAsNumber: true })} />
                <Field label="Name" reg={register("name", { required: true })} placeholder="Maldives" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f98f0e]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 hover:border-[#f98f0e] rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors">
                    <LuUpload size={14} />
                    {uploading ? "Uploading…" : "Upload Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {imageUrl && <span className="text-xs text-gray-400 truncate max-w-xs">{imageUrl}</span>}
                </div>
                {imageUrl && <img src={imageUrl} alt="" className="mt-2 h-24 object-cover rounded-lg border" />}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" {...register("active")} className="rounded" />
                <label htmlFor="active" className="text-sm text-gray-600">
                  Active (visible on site)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f98f0e] hover:bg-[#dd6c08] text-white font-semibold text-sm disabled:opacity-50"
                >
                  <LuSave size={14} /> {saving ? "Saving…" : "Save Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, reg, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        {...reg}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f98f0e]"
      />
    </div>
  );
}
