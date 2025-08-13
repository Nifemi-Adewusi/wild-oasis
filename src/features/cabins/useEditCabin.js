import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ cabinData, id }) => createCabin(cabinData, id),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["Cabin"],
          });
          toast.success("Cabin Successfully Edited");
        
        },
        onError: (error) => toast.error(error.message),
    });
    return { editCabin, isEditing };
}