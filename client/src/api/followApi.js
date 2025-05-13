import axiosInstance from "./axiosInstance";

export const unfollowUser = (followeeId) =>
  axiosInstance.delete(`/follow/${Number(followeeId)}`).then((res) => res.data);
