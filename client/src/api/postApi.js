import axiosInstance from "./axiosInstance";

export const getPosts = () => axiosInstance.get("/post").then((res) => res.data);
