import axiosInstance from "./axiosInstance";

export const getStories = () =>
  axiosInstance.get("/story").then((res) => res.data);
