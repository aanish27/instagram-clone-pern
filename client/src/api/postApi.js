import axiosInstance from "./axiosInstance";

export const getPosts = () =>
  axiosInstance.get("/post").then((res) => res.data);

// User Save Posts
export const savePost = (id) =>
  axiosInstance.post(`/post/saved/${id}`, {}).then((res) => res.data);
export const unsavePost = (id) =>
  axiosInstance.delete(`/post/saved/${id}`).then((res) => res.data);
