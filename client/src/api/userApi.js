import axiosInstance from "./axiosInstance";

export const getProfile = (username) =>
  axiosInstance
    .get("/user/profile", { params: { search: username } })
    .then((res) => res.data);

export const updateAvatar = (data) =>
  axiosInstance.patch("/user/avatar", data).then((res) => res.data);

export const deleteAvatar = () =>
  axiosInstance.delete("/user/avatar").then((res) => res.data);
