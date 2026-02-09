import axiosInstance from "../../../service/axiosInstance";

export const addCategory =  (payload,token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
 return axiosInstance.post("/categories", payload, config);
};
