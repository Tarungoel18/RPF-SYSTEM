import axiosInstance from "../utils/axiosInstance.js";
import API from "../constants/ApiConst";

export const getVendors = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.get(API.VENDORS_LIST, config);
};

export const approveVendor = (payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.post(API.APPROVE_VENDOR, payload, config);
};

export const getVendorsByCategory = (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.get(`${API.VENDORS_LIST}/${id}`, config);
};
