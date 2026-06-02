const API_BASE = import.meta.env.VITE_API_URL || '';

const getToken = () => localStorage.getItem('token');

const headers = (auth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (auth) h.Authorization = `Bearer ${getToken()}`;
  return h;
};

export const api = {
  get: async (path, auth = false) => {
    const res = await fetch(`${API_BASE}${path}`, { headers: auth ? headers(true) : {} });
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Erreur réseau'); }
    return res.json();
  },
  post: async (path, body, auth = false) => {
    const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers: headers(auth), body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur réseau');
    return data;
  },
  put: async (path, body) => {
    const res = await fetch(`${API_BASE}${path}`, { method: 'PUT', headers: headers(true), body: JSON.stringify(body) });
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Erreur réseau'); }
    return res.json();
  },
  delete: async (path) => {
    const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE', headers: headers(true) });
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Erreur réseau'); }
    return res.json();
  },
};
