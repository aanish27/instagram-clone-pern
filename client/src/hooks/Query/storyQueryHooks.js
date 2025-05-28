import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../api/storyApi";

export const useGetStories = (options = {}) => {
  return useQuery({
    queryKey: ["getStories"],
    queryFn: () => getStories(),
    ...options,
  });
};
