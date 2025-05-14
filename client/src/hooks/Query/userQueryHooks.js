import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAvatar, getProfile, updateAvatar } from "../../api/userApi";
import { useSelector } from "react-redux";

export const useUpdateAvatarMutation = (options) =>
  useAvatarMutation(updateAvatar, options);

export const useDeleteAvatarMutation = (options) =>
  useAvatarMutation(deleteAvatar, options);

export const useGetProfileQuery = (username, options = {}) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
    ...options,
  });
};

const useAvatarMutation = (mutationFn, options = {}) => {
  const authUser = useSelector((state) => state.auth.authUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    ...options,
    onError: (error) => {
      console.log(`${error} error`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", authUser.username],
      });
    },
  });
};
