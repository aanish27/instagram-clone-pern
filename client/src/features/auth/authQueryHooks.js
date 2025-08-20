import { useMutation } from "@tanstack/react-query";
import { login, signup } from "./authApi";

export const useLoginMutation = (options = {}) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};

export const useSignupMutation = (options = {}) => {
  return useMutation({
    mutationFn: signup,
    ...options,
  });
};
