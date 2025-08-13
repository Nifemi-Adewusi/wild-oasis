import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useDeleteCabin() {
  // QueryClient is used to manage the cache and refetch data after mutations
  // It allows us to invalidate queries and refetch data when a mutation occurs
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      // Invalidate the query to refetch the cabins list
      // This will trigger a refetch of the cabins data
      queryClient.invalidateQueries({
        queryKey: ["Cabin"],
      });
      toast.success("Cabin deleted successfully");
    },
    onError: (error) => toast.error(error.message),
  });
    return { isDeleting, deleteCabin };
}