import axiosInstance from "./axiosInstance";

export const storePostLike = (data) =>
  axiosInstance.post("/like/post", data).then((res) => res.data);

export const storeStoryLike = (data) =>
  axiosInstance.post("/like/story", data).then((res) => res.data);

export const deletePostLike = (id) =>
  axiosInstance.delete(`/like/post/${id}`).then((res) => res.data);

export const deleteStoryLike = (id) =>
  axiosInstance.delete(`/like/story/${id}`).then((res) => res.data);
