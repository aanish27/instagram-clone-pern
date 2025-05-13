import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowUser } from "../../api/followApi";

export const useUnfollowUserMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,
    ...options,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      console.log(`${data} data`);
    },
  });
};
