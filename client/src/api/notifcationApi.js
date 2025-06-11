import axiosInstance from "./axiosInstance";

export const getNotificationCount = () =>
  axiosInstance.get("/notifications/count").then((res) => res.data);

export const patchNotificationsRead = () =>
  axiosInstance.patch("/notifications/read", {}).then((res) => res.data);
