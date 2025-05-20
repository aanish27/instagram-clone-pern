import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi";

export const useLoginMutation = (options = {}) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};
