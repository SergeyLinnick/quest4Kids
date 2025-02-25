import { useMutation } from "@tanstack/react-query";
import { authService } from "./services";

export const useLogin = (onSuccess: () => void, onError: () => void) => {
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      console.info("Successfully logged in");
      onSuccess();
    },
    onError: () => {
      console.error("Provided email or password are incorrect");
      onError();
    },
  });

  return { login, isLoading };
};
