import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account created successfully! Please check your email to verify your account."
      );
    },
  });
  return { signup, isLoading };
}
