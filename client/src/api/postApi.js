import axiosInstance from "./axiosInstance";

export const getPosts = () =>
  axiosInstance.get("/post").then((res) => res.data);

export const getPost = (id) =>
  axiosInstance.get(`/post/${id}`).then((res) => res.data);

export const storePost = (data) =>
  axiosInstance.post("post", data).then((res) => res.data);

export const updatePost = (id, data) =>
  axiosInstance.patch(`post/${id}`, data).then((res) => res.data);

export const deletePost = (id, data) =>
  axiosInstance.delete(`post/${id}`, data).then((res) => res.data);

// User Save Posts
export const savePost = (id) =>
  axiosInstance.post(`/post/saved/${id}`, {}).then((res) => res.data);

export const unsavePost = (id) =>
  axiosInstance.delete(`/post/saved/${id}`).then((res) => res.data);
