import axiosInstance from "./axiosInstance";

export const getUser = (username) =>
  axiosInstance.get(`/user/${username}`).then((res) => res.data);

export const searchUsers = (username) =>
  axiosInstance
    .get("/user/search", { params: username })
    .then((res) => res.data);

export const getSuggestions = (limit) =>
  axiosInstance
    .get("/user", { params: { all: limit } })
    .then((res) => res.data);

export const getAuthUser = () =>
  axiosInstance.get("/user/auth").then((res) => res.data);

export const getProfile = (username) =>
  axiosInstance
    .get("/user/profile", { params: { search: username } })
    .then((res) => res.data);

export const updateUser = (data) =>
  axiosInstance.patch("/user", data).then((res) => res.data);

export const updateAvatar = (data) =>
  axiosInstance.patch("/user/avatar", data).then((res) => res.data);

export const deleteAvatar = () =>
  axiosInstance.delete("/user/avatar").then((res) => res.data);
