import axiosInstance from "../../../service/axiosInstance.js";

export const login = async (payload) => {
  //TODO -> Move endpoints in a single file
  return axiosInstance.post("/api/login", payload);
};
