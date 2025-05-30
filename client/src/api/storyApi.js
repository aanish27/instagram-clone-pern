import axiosInstance from "./axiosInstance";

export const getStories = () =>
  axiosInstance.get("/story").then((res) => res.data);

export const deleteStory = (id) =>
  axiosInstance.delete(`/story/${id}`).then((res) => res.data);
