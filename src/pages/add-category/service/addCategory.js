import axiosInstance from "../../../service/axiosInstance";

export const addCategory = async (payload) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axiosInstance.post("/categories", payload, config);
};
