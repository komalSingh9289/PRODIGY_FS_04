import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Change this to match your backend URL
    headers: {
        'Content-Type': 'application/json',
    }
});

// Attach the token from localStorage to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => Promise.reject(error));

export default api;
