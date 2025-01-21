import axios from "axios";
import { getWithExpiry } from "../utils/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    // console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
    const token = await getWithExpiry("x-access-token");
    // console.log('Token:', token);
    if (token) {
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // console.log(`Response from ${response.config.url}:`, response.data);
    if (response.data && !('success' in response.data)) {
      response.data = { success: true, data: response.data };
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Error', error)
      localStorage.clear();
      window.location.href = '/login';
    }
    const errorMessage = error.response?.data?.error || error.message;
    return Promise.reject({ ...error, message: errorMessage });
  }
);

export default api;
