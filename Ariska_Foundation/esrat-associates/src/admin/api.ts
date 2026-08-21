import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({ baseURL: API_BASE });

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (username: string, password: string) => {
  const form = new URLSearchParams();
  form.append('username', username);
  form.append('password', password);
  return api.post('/api/auth/login', form, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
};

export const changePassword = (current_password: string, new_password: string) =>
  api.post('/api/auth/change-password', { current_password, new_password });

// ── Slides ────────────────────────────────────────────────────────────────────
export const getSlides = () => api.get('/api/slides/all');
export const createSlide = (data: object) => api.post('/api/slides', data);
export const updateSlide = (id: number, data: object) => api.put(`/api/slides/${id}`, data);
export const deleteSlide = (id: number) => api.delete(`/api/slides/${id}`);
export const toggleSlide = (id: number) => api.patch(`/api/slides/${id}/toggle`);

// ── Company ───────────────────────────────────────────────────────────────────
export const getCompany = () => api.get('/api/company');
export const updateCompany = (data: object) => api.put('/api/company', data);

// ── Content ───────────────────────────────────────────────────────────────────
export const getStats = () => api.get('/api/content/stats');
export const updateStats = (data: object) => api.put('/api/content/stats', data);

export const getAllServices = () => api.get('/api/content/services/all');
export const updateService = (id: number, data: object) => api.put(`/api/content/services/${id}`, data);

export const getWhyChoose = () => api.get('/api/content/why-choose');
export const updateWhyChoose = (data: object) => api.put('/api/content/why-choose', data);

export const getIndustries = () => api.get('/api/content/industries');
export const updateIndustries = (data: object) => api.put('/api/content/industries', data);

// ── Consultants ───────────────────────────────────────────────────────────────
export const getConsultants = () => api.get('/api/consultants/all');
export const createConsultant = (data: object) => api.post('/api/consultants', data);
export const updateConsultant = (id: number, data: object) => api.put(`/api/consultants/${id}`, data);
export const deleteConsultant = (id: number) => api.delete(`/api/consultants/${id}`);
export const toggleConsultant = (id: number) => api.patch(`/api/consultants/${id}/toggle`);

// ── Upload ────────────────────────────────────────────────────────────────────

export const getCoreValues = () => api.get('/api/content/core-values');
export const updateCoreValues = (data: object) => api.put('/api/content/core-values', data);

export const getPartners = () => api.get('/api/content/partners');
export const updatePartners = (data: object) => api.put('/api/content/partners', data);

// ── Upload ────────────────────────────────────────────────────────────────────
export const uploadFile = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/api/upload', form);
};
