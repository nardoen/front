import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

// Function to get a cookie by name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Create an axios instance
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // To send cookies with cross-origin requests
});

// Add a request interceptor to attach the CSRF token
authAxios.interceptors.request.use((config) => {
  // We only need to add the CSRF token for methods that can change state.
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method.toUpperCase())) {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
  return config;
});


export default authAxios;
