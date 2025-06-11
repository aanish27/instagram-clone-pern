import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationCount,
  patchNotificationsRead,
} from "../../api/notifcationApi";

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
