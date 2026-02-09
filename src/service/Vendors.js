import axiosInstance from "./axiosInstance";
import API from "../constants/ApiConst";

export const getVendors = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.get(API.VENDORS_LIST, config);
};

export const approveVendor = (payload,token) => {
     const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.post(API.APPROVE_VENDOR,payload,config)
}
