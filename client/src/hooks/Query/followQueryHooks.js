import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteFollowReq,
  getConnections,
  sendFollowReq,
  unfollowUser,
} from "../../api/followApi";

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

export const useSendFollowReqMutation = (options = {}) => {
  return useMutation({
    mutationFn: sendFollowReq,
    ...options,
    onError: (error) => {
      console.log(`${error} error`);
    },
  });
};

export const useDeleteFollowReqMutation = (options = {}) => {
  return useMutation({
    mutationFn: deleteFollowReq,
    ...options,
    onError: (error) => {
      console.log(`${error} error`);
    },
  });
};
