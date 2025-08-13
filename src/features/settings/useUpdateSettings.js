import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate:updateSettings, isLoading: isUpdatingSetting } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
            toast.success("Settings updated successfully");
        },
    })
    return { updateSettings, isUpdatingSetting };
}