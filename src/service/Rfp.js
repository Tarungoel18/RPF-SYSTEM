import axiosInstance from "../utils/axiosInstance.js";
import API from "../constants/ApiConst";

export const getRfps = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.get(API.RFP_LIST, config);
};

export const closeRfp = (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.get(`${API.CLOSE_RFP}/${id}`, config);
};

export const getRfpQuotes = (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.get(`${API.RFP_QUOTES}/${id}`, config);
};

export const addRpf = (payload, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosInstance.post(API.CREATE_RPF, payload, config);
};
