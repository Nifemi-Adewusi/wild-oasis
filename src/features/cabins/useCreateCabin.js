import { useQueryClient, useMutation,  } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";
export function useCreateCabin() {
    const queryClient = useQueryClient();
    // const {reset} = useForm()
        const { mutate: create, isLoading: isCreating } = useMutation({
          mutationFn: createCabin,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["Cabin"],
            });
            toast.success("Cabin Added Successfully");
            // reset();
          },
          onError: (error) => toast.error(error.message),
        });
    return { create, isCreating };
}