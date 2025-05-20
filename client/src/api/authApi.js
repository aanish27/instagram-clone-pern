import axiosInstance from "./axiosInstance";

export const login = (data) =>
  axiosInstance.post("login", data).then((res) => res.data);

export const signup = (data) =>
  axiosInstance.post("signup", data).then((res) => res.data);
