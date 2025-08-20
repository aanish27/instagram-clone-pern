import axios from "axios";
import Cookies from "js-cookie";
const serverUrl = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
