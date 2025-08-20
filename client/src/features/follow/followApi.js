import axiosInstance from "../../utils/axiosInstance";

export const getConnections = () =>
  axiosInstance.get("/follow/connections").then((res) => res.data);

export const getRequests = () =>
  axiosInstance.get("/follow/req").then((res) => res.data);

export const searchFollowers = (username) =>
  axiosInstance
    .get("/follow/search", { params: username })
    .then((res) => res.data);

export const sendFollowReq = (data) =>
  axiosInstance.post("/follow/req", data).then((res) => res.data);

export const removeFollower = (followeeId) =>
  axiosInstance
    .delete(`/follow/remove/${Number(followeeId)}`)
    .then((res) => res.data);

export const unfollowUser = (followeeId) =>
  axiosInstance.delete(`/follow/${Number(followeeId)}`).then((res) => res.data);

export const acceptFollowReq = (reqId) =>
  axiosInstance.post("/follow", { id: reqId }).then((res) => res.data);

export const deleteFollowReq = (reqId) =>
  axiosInstance.delete(`/follow/req/${Number(reqId)}`).then((res) => res.data);
