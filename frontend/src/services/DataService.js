import axios from "axios";
import { getWithExpiry } from "../utils/store";

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getWithExpiry("x-access-token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally here when needed
    return Promise.reject(error);
  }
);

export default api;
