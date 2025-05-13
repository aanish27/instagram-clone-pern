import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/postApi";

export const usePostsQuery = (options = {}) => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getPosts,
    ...options,
  });
};
