import axiosInstance from "../../../service/axiosInstance.js";

export const getCategories = async () => {
    return axiosInstance.get("/categories");
}
