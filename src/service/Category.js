import axiosInstance from "../utils/axiosInstance.js";
import API from "../constants/ApiConst.js";

export const getCategories = async () => {
  return axiosInstance.get(API.CATEGORIES);
};

export const addCategory = (payload) => {

  return axiosInstance.post(API.CATEGORIES, payload);
};
