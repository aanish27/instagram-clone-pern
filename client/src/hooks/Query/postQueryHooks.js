import { useMutation, useQuery } from "@tanstack/react-query";
import { getPosts, savePost, unsavePost } from "../../api/postApi";

export const usePostsQuery = (options = {}) => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getPosts,
    ...options,
  });
};

export const useSavePostMutation = (options = {}) => {
  return useMutation({
    mutationFn: savePost,
    ...options,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      console.log(`${data} data`);
    },
  });
};

export const useUnsavePostMutation = (options = {}) => {
  return useMutation({
    mutationFn: unsavePost,
    ...options,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      console.log(`${data} data`);
    },
  });
};
