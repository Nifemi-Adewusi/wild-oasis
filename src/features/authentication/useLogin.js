import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate()
    const { mutate: login, isLoading } = useMutation({
      //   Mutation function takes the email and password and calls the login API
      mutationFn: ({ email, password }) => loginApi({ email, password }),
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (err) => {
        console.log("Error", err);
        toast.error("Provided email or password are incorrect");
      },
    });
    return {login, isLoading}
}