import { getToken, removeToken } from "@/utils/token";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
    "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response?.status === 401) {
        removeToken();
    }

    return Promise.reject(error);
    },
);

export default axiosInstance;
