import axiosInstance from "../utils/axiosInstance.js";
import API from "../constants/ApiConst.js";

export const login = async (payload) => {
  return axiosInstance.post(API.LOGIN, payload);
};

export const register = async (payload) => {
  return axiosInstance.post(API.REGISTER_VENDOR, payload);
};

export const registerAdmin = async (payload) => {
  return axiosInstance.post(API.REGISTER_ADMIN, payload);
};

export const forgotPassword = async (payload) => {
  return axiosInstance.post(API.FORGET_PASSWORD, payload);
};

export const resetPassword = async (payload) => {
  return axiosInstance.post(API.RESET_PASSWORD, payload);
};
