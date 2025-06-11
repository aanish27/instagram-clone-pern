import axiosInstance from "./axiosInstance";

export const getConnections = () =>
  axiosInstance.get("/follow/connections").then((res) => res.data);

export const sendFollowReq = (data) =>
  axiosInstance.post("/follow/req", data).then((res) => res.data);

export const unfollowUser = (followeeId) =>
  axiosInstance.delete(`/follow/${Number(followeeId)}`).then((res) => res.data);

export const acceptFollowReq = (reqId) =>
  axiosInstance.post("/follow", { id: reqId }).then((res) => res.data);

export const deleteFollowReq = (reqId) =>
  axiosInstance.delete(`/follow/req/${Number(reqId)}`).then((res) => res.data);
