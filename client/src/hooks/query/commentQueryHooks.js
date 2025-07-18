import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment, getComments, storeComment } from "../../api/commentApi";

export const useGetCommentsQuery = (id, options = {}) => {
  return useQuery({
    queryKey: ["post/comments", id],
    queryFn: () => getComments(id),
    ...options,
  });
};

export const useStoreCommentMutation = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeComment,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["post/comments"], id });
      console.log(`${data} data`);
    },
    ...options,
  });
};

export const useDeleteCommentMutation = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    ...options,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["post/comments"], id });
      console.log(`${data} data`);
    },
  });
};
