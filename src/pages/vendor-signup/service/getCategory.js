import axiosInstance from "../../../service/axiosInstance";

export const getCategory = async () => {
  return axiosInstance.get("/categories");
};
