import axios from "axios";
import { getWithExpiry } from "../utils/store";

const apis = axios.create({
  baseURL: import.meta.env.VITE_APP_PROD_URL,
  headers: {
    Accept: "application/json",
  },
});

apis.interceptors.request.use(
  async (config) => {
    const token = await getWithExpiry("l-access-token");
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `${token}`;
      } else {
        config.headers = { Authorization: `${token}` };
      }
    }
    return config;
  },
  (error) => {
    throw error;
  },
);

export default apis;
