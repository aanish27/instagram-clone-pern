import axiosInstance from "./axiosInstance";

export const getConnections = () =>
  axiosInstance.get("/follow/connections").then((res) => res.data);

export const unfollowUser = (followeeId) =>
  axiosInstance.delete(`/follow/${Number(followeeId)}`).then((res) => res.data);
