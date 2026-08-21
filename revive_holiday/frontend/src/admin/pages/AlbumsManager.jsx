import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAlbums, createAlbum, updateAlbum,
  deleteAlbum, toggleAlbum, uploadFile,
} from "../api";
import { LuPlus, LuPencil, LuTrash2, LuEye, LuEyeOff, LuUpload, LuX, LuSave, LuImages } from "react-icons/lu";

const EMPTY = { order: 0, title: "", short_note: "", cover_image_url: "", active: true, photos: [] };

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function AlbumsManager() {
  const [albums, setAlbums] = useState([]);
  const [editing, setEditing] = useState(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const { register, handleSubmit, reset, setValue, watch } = useForm({ defaultValues: EMPTY });
  const coverImageUrl = watch("cover_image_url");
  const photos = watch("photos") || [];

  const load = async () => {
    const res = await getAlbums();
    setAlbums(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(EMPTY);
    reset(EMPTY);
  };
  const openEdit = (a) => {
    setEditing(a);
    reset(a);
  };
  const closeForm = () => {
    setEditing(null);
    reset(EMPTY);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = { ...data, photos: data.photos.map((p, order) => ({ ...p, order })) };
      if (editing?.id) await updateAlbum(editing.id, payload);
      else await createAlbum(payload);
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
    if (!confirm("Delete this album and all its photos?")) return;
    await deleteAlbum(id);
    await load();
  };

  const onToggle = async (id) => {
    await toggleAlbum(id);
    await load();
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const res = await uploadFile(file);
      setValue("cover_image_url", `${API_BASE}${res.data.url}`);
    } catch {
      setMsg("Cover image upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleAddPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const res = await uploadFile(file);
      setValue("photos", [...photos, { image_url: `${API_BASE}${res.data.url}` }]);
    } catch {
      setMsg("Photo upload failed");
    } finally {
      setUploadingPhoto(false);
      e.target.value = "";
    }
  };

  const removePhoto = (idx) => {
    setValue("photos", photos.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Albums</h1>
          <p className="text-gray-500 text-sm">Manage photo albums shown on the homepage</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#f98f0e] hover:bg-[#dd6c08] text-white font-semibold px-4 py-2 rounded-lg text-sm"
        >
          <LuPlus size={16} /> Add Album
        </button>
      </div>

      {msg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 text-sm">
          {msg}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {albums.map((a) => (
          <div key={a.id} className={`bg-white border rounded-xl overflow-hidden ${!a.active ? "opacity-50" : ""}`}>
            <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
              {a.cover_image_url ? (
                <img src={a.cover_image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <LuImages className="text-gray-300" size={28} />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-800 text-sm truncate flex-1">{a.title}</p>
                {!a.active && <span className="text-xs text-gray-400 flex-shrink-0">(hidden)</span>}
              </div>
              <p className="text-gray-500 text-xs line-clamp-2 mb-2">{a.short_note}</p>
              <p className="text-gray-400 text-xs mb-3">{a.photos.length} photo{a.photos.length !== 1 ? "s" : ""}</p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => onToggle(a.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                  {a.active ? <LuEye size={15} /> : <LuEyeOff size={15} />}
                </button>
                <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50">
                  <LuPencil size={15} />
                </button>
                <button onClick={() => onDelete(a.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                  <LuTrash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">{editing.id ? "Edit Album" : "New Album"}</h2>
              <button onClick={closeForm}>
                <LuX size={18} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Order</label>
                  <input type="number" {...register("order", { valueAsNumber: true })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f98f0e]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input {...register("title", { required: true })} placeholder="Maldives Getaway 2026"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f98f0e]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Short Note</label>
                <textarea {...register("short_note", { required: true })} rows={2}
                  placeholder="A quick highlight reel from our latest group trip."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f98f0e]" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Cover Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 hover:border-[#f98f0e] rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors">
                    <LuUpload size={14} />
                    {uploadingCover ? "Uploading…" : "Upload Cover"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                  </label>
                  {coverImageUrl && <span className="text-xs text-gray-400 truncate max-w-xs">{coverImageUrl}</span>}
                </div>
                {coverImageUrl && <img src={coverImageUrl} alt="" className="mt-2 h-20 object-cover rounded-lg border" />}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-600">Photos ({photos.length})</label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-[#f98f0e] hover:underline">
                    <LuUpload size={12} />
                    {uploadingPhoto ? "Uploading…" : "Add Photo"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} disabled={uploadingPhoto} />
                  </label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="relative group">
                      <img src={p.image_url} alt="" className="w-full h-20 object-cover rounded-lg border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <LuX size={12} />
                      </button>
                    </div>
                  ))}
                  {photos.length === 0 && (
                    <p className="col-span-4 text-xs text-gray-400 py-4 text-center border border-dashed border-gray-200 rounded-lg">
                      No photos yet — add at least one.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="album_active" {...register("active")} className="rounded" />
                <label htmlFor="album_active" className="text-sm text-gray-600">Active (visible on site)</label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f98f0e] hover:bg-[#dd6c08] text-white font-semibold text-sm disabled:opacity-50">
                  <LuSave size={14} /> {saving ? "Saving…" : "Save Album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
