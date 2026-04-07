import axios from 'axios';

let rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 1. Remove trailing slashes
rawApiUrl = rawApiUrl.replace(/\/+$/, '');

// 2. Add protocol if missing (prevents relative path issues)
if (!rawApiUrl.startsWith('http')) {
  rawApiUrl = `https://${rawApiUrl}`;
}

// 3. Ensure it ends with /api but avoid duplicating it
const normalizedApiUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

const api = axios.create({
  baseURL: normalizedApiUrl,
});

// Automatically add JWT token to all requests if it exists
api.interceptors.request.use((config) => {
  const session = localStorage.getItem('user_session');
  if (session) {
    const { token } = JSON.parse(session);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
