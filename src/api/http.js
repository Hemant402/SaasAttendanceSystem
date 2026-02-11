import axios from "axios";
import authStorage from "../auth/authStorage";

const http = axios.create({
  baseURL: "https://client.z1nepal.com.np/api",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Response interceptor (IMPORTANT CHANGE)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❌ DO NOT auto logout on 401
    // Because many APIs may return 401 temporarily
    if (error.response?.status === 401) {
      console.warn("401 received, but user not logged out automatically");
    }
    return Promise.reject(error);
  },
);

export default http;
