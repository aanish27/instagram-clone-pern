import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getConnections, unfollowUser } from "../../api/followApi";

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

export const useGetConnectionsQuery = (options = {}) => {
  return useQuery({
    queryKey: ["getConnections"],
    queryFn: getConnections,
    onError: (error) => {
      console.log(`${error} error`);
    },
    ...options,
  });
};
