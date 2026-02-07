import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rfpdemo.velsof.com",
});

export default axiosInstance;
