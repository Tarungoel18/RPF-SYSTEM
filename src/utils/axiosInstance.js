import axios from "axios";
import { ROUTES } from "../constants/RoutesConst";
import { ROLE, TOKEN, USER } from "../constants/AppConst";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
      localStorage.removeItem(ROLE);
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
