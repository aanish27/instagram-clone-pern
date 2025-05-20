import axiosInstance from "./axiosInstance";

export const login = (data) =>
  axiosInstance.post("login", data).then((res) => res.data);
