import axiosInstance from "../utils/axiosInstance";

export const getComments = (id) =>
  axiosInstance.get(`/comment/post/${Number(id)}`).then((res) => res.data);

export const storeComment = (data) =>
  axiosInstance.post("/comment", data).then((res) => res.data);

export const deleteComment = (id) =>
  axiosInstance.delete(`/comment/${id}`).then((res) => res.data);
