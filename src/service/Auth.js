import axiosInstance from "../utils/axiosInstance.js";
import API from "../constants/ApiConst.js";

export const login = async (payload) => {
  return axiosInstance.post(API.LOGIN, payload);
};

export const register = async (payload) => {
  return axiosInstance.post(API.REGISTER_VENDOR, payload);
};


