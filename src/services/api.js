import axios from 'axios';
import store from '../store';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Attach Bearer token on every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Global 401 handler — clear session and redirect to login
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Only act if we actually had a token (avoids loops on the login page itself)
            if (localStorage.getItem('token')) {
                await store.dispatch('auth/logout');
                // Redirect while preserving intended destination
                const currentPath = window.location.pathname;
                const redirect = currentPath.startsWith('/dashboard') ? `?redirect=${encodeURIComponent(currentPath)}` : '';
                window.location.href = `/login${redirect}`;
            }
        }
        return Promise.reject(error);
    }
);

export default api;
