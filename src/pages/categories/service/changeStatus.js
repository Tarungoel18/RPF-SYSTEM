import axiosInstance from "../../../service/axiosInstance";
//TODO-> Doubt-> Api for activate and deactivate Will be change
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const changeStatus = async (payload,id) => {
    axiosInstance.post(`/categories/${id}`)

}