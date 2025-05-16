import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPost,
  getPosts,
  savePost,
  storePost,
  unsavePost,
} from "../../api/postApi";
import { useSelector } from "react-redux";

export const usePostsQuery = (options = {}) => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getPosts,
    ...options,
  });
};

export const useGetPostQuery = (id, options = {}) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    ...options,
  });
};

export const useStorePostMutation = (options = {}) => {
  return useMutation({
    mutationFn: storePost,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      console.log(`${data} data`);
    },
    ...options,
  });
};

export const useUpdatePostMutation = (options = {}) => {
  const user = useSelector((state) => state.auth.authUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", user.username],
      });
      console.log(data);
    },
    ...options,
  });
};

export const useSavePostMutation = (options = {}) => {
  return useMutation({
    mutationFn: savePost,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      console.log(`${data} data`);
    },
    ...options,
  });
};

export const useUnsavePostMutation = (options = {}) => {
  return useMutation({
    mutationFn: unsavePost,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      console.log(`${data} data`);
    },
    ...options,
  });
};
