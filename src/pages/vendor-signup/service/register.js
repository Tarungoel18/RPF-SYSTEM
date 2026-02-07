import axiosInstance from "../../../service/axiosInstance";

export const register = async (payload) => {
  return axiosInstance.post("/registervendor", payload);
};
