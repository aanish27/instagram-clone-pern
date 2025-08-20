import { useMutation } from "@tanstack/react-query";
import {
  deletePostLike,
  deleteStoryLike,
  storePostLike,
  storeStoryLike,
} from "../../api/likeApi";

export const useStorePostLikeMutation = (options = {}) => {
  return useMutation({
    mutationFn: storePostLike,
    ...options,
  });
};

export const useStoreStoryLikeMutation = (options = {}) => {
  return useMutation({
    mutationFn: storeStoryLike,
    ...options,
  });
};

export const useUnlikePostMutation = (options = {}) => {
  return useMutation({
    mutationFn: deletePostLike,
    ...options,
  });
};

export const useUnlikeStoryMutation = (options = {}) => {
  return useMutation({
    mutationFn: deleteStoryLike,
    ...options,
  });
};
