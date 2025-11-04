import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance
const authAxios = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the token
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
export function setAuth401Handler(on401) {
  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('accessToken');
        if (typeof on401 === 'function') on401();
      }
      return Promise.reject(error);
    }
  );
}

export default authAxios;
