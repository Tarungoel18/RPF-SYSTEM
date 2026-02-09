import axiosInstance from "./axiosInstance.js";
import API from "../constants/ApiConst.js";

export const getCategories = async () => {
  return axiosInstance.get(API.CATEGORIES);
};

export const addCategory = (payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.post(API.CATEGORIES, payload, config);
};
