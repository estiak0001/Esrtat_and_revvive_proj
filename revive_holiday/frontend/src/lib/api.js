const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function getJSON(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.message || `Request failed (${res.status})`);
  }

  return res.json();
}

export function submitInquiry({ inquiryType, ...rest }) {
  return postJSON("/inquiry", { ...rest, inquiry_type: inquiryType });
}

export function submitContact(payload) {
  return postJSON("/contact", payload);
}

export function getDestinations() {
  return getJSON("/destinations");
}

export function getServices() {
  return getJSON("/content/services");
}

export function getCoreValues() {
  return getJSON("/content/core-values");
}

export function getWhyChoose() {
  return getJSON("/content/why-choose");
}

export function getCorporateServices() {
  return getJSON("/content/corporate-services");
}

export function getVisaSupport() {
  return getJSON("/content/visa-support");
}

export function getSettings() {
  return getJSON("/settings");
}

export function getAlbums() {
  return getJSON("/albums");
}

export function getAlbum(id) {
  return getJSON(`/albums/${id}`);
}
