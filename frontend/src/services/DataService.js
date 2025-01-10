import axios from "axios";
import { getWithExpiry } from "../utils/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:5000",
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
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
    // Add success flag if not present
    if (response.data && !('success' in response.data)) {
      response.data = { success: true, data: response.data };
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    const errorMessage = error.response?.data?.error || error.message;
    return Promise.reject({ ...error, message: errorMessage });
  }
);

export default api;
