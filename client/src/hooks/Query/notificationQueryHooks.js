import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationCount,
  getNotifications,
  patchNotificationsRead,
} from "../../api/notifcationApi";

export const useGetNotificationsQuery = (reload, options = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["notifications", reload],
    queryFn: getNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRequests"] });
    },
    ...options,
  });
};

export const useNotificationCountQuery = (reload, options = {}) => {
  return useQuery({
    queryKey: ["notificationCount", reload],
    queryFn: getNotificationCount,
    ...options,
  });
};

export const useMarkNotificationsReadMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
    },
    ...options,
  });
};
