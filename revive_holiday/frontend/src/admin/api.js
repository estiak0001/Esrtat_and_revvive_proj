import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
export { API_BASE };

export const api = axios.create({ baseURL: API_BASE });

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (username, password) => {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);
  return api.post("/api/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const changePassword = (current_password, new_password) =>
  api.post("/api/auth/change-password", { current_password, new_password });

// ── Site Settings ─────────────────────────────────────────────────────────────
export const getSettings = () => api.get("/api/settings");
export const updateSettings = (data) => api.put("/api/settings", data);

// ── Destinations ──────────────────────────────────────────────────────────────
export const getDestinations = () => api.get("/api/destinations/all");
export const createDestination = (data) => api.post("/api/destinations", data);
export const updateDestination = (id, data) => api.put(`/api/destinations/${id}`, data);
export const deleteDestination = (id) => api.delete(`/api/destinations/${id}`);
export const toggleDestination = (id) => api.patch(`/api/destinations/${id}/toggle`);

// ── Services ──────────────────────────────────────────────────────────────────
export const getAllServices = () => api.get("/api/content/services/all");
export const updateService = (id, data) => api.put(`/api/content/services/${id}`, data);

// ── Core Values ───────────────────────────────────────────────────────────────
export const getCoreValues = () => api.get("/api/content/core-values");
export const updateCoreValues = (data) => api.put("/api/content/core-values", data);

// ── Why Choose Us ─────────────────────────────────────────────────────────────
export const getWhyChoose = () => api.get("/api/content/why-choose");
export const updateWhyChoose = (data) => api.put("/api/content/why-choose", data);

// ── Corporate Services ────────────────────────────────────────────────────────
export const getCorporateServices = () => api.get("/api/content/corporate-services");
export const updateCorporateServices = (data) => api.put("/api/content/corporate-services", data);

// ── Visa Support ──────────────────────────────────────────────────────────────
export const getVisaSupport = () => api.get("/api/content/visa-support");
export const updateVisaSupport = (data) => api.put("/api/content/visa-support", data);

// ── Messages / Inquiries ──────────────────────────────────────────────────────
export const getContactMessages = () => api.get("/api/messages/contact");
export const toggleContactRead = (id) => api.patch(`/api/messages/contact/${id}/read`);
export const deleteContactMessage = (id) => api.delete(`/api/messages/contact/${id}`);

export const getInquiries = () => api.get("/api/messages/inquiry");
export const toggleInquiryRead = (id) => api.patch(`/api/messages/inquiry/${id}/read`);
export const deleteInquiry = (id) => api.delete(`/api/messages/inquiry/${id}`);

// ── Albums ────────────────────────────────────────────────────────────────────
export const getAlbums = () => api.get("/api/albums/admin/all");
export const createAlbum = (data) => api.post("/api/albums", data);
export const updateAlbum = (id, data) => api.put(`/api/albums/${id}`, data);
export const deleteAlbum = (id) => api.delete(`/api/albums/${id}`);
export const toggleAlbum = (id) => api.patch(`/api/albums/${id}/toggle`);

// ── Upload ────────────────────────────────────────────────────────────────────
export const uploadFile = (file) => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/api/upload", form);
};
