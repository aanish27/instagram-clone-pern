import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { deleteStory, getStories } from "./storyApi";

export const useGetStories = (options = {}) => {
  return useQuery({
    queryKey: ["getStories"],
    queryFn: () => getStories(),
    ...options,
  });
};

export const useDeleteStoryMutation = (options = {}) => {
  const user = useSelector((state) => state.auth.authUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", user.username],
      });
    },
    ...options,
  });
};
