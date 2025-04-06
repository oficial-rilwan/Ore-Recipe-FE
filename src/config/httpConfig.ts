import axios from "axios";
import configurations from "./configurations";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: configurations.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized, logging out...");
    }
    return Promise.reject(error);
  }
);

export default api;
