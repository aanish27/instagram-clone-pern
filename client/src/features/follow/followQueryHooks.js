import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFollowReq,
  deleteFollowReq,
  getConnections,
  getRequests,
  removeFollower,
  searchFollowers,
  sendFollowReq,
  unfollowUser,
} from "./followApi";

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

export const useGetRequestsQuery = (options = {}) => {
  return useQuery({
    queryKey: ["getRequests"],
    queryFn: getRequests,
    onError: (error) => {
      console.log(`${error} error`);
    },
    ...options,
  });
};

export const useSearchFollowersQuery = (username, options = {}) => {
  return useQuery({
    queryKey: ["followersSearch", username],
    queryFn: () => () => searchFollowers(username),
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

export const useAcceptFollowReqMutation = (options = {}) => {
  return useMutation({
    mutationFn: acceptFollowReq,
    onError: (error) => {
      console.log(`${error} error`);
    },
    ...options,
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

export const useRemoveFollowerMutation = (options = {}) => {
  return useMutation({
    mutationFn: removeFollower,
    onError: (error) => {
      console.log(`${error} error`);
    },
    ...options,
  });
};
