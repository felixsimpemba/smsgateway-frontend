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
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401) {
            // Avoid loops: check if error came from /logout or /login
            const isAuthEndpoint = originalRequest.url.includes('/logout') || originalRequest.url.includes('/login');
            
            if (!isAuthEndpoint && localStorage.getItem('token')) {
                // Clear state
                store.commit('auth/LOGOUT');
                
                // Redirect only if not already on login
                if (!window.location.pathname.startsWith('/login')) {
                    const currentPath = window.location.pathname;
                    const redirect = currentPath.startsWith('/dashboard') ? `?redirect=${encodeURIComponent(currentPath)}` : '';
                    window.location.href = `/login${redirect}`;
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
