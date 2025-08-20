import axiosInstance from "../../utils/axiosInstance";

export const getNotifications = () =>
  axiosInstance.get("/notifications/recent").then((res) => res.data);

export const getNotificationCount = () =>
  axiosInstance.get("/notifications/count").then((res) => res.data);

export const patchNotificationsRead = () =>
  axiosInstance.patch("/notifications/read", {}).then((res) => res.data);
