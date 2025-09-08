import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
export function useUser() {
    const { isLoading, error, data: user } = useQuery({
        queryKey: ["user"],
        queryFn:getCurrentUser
    })
    return { user, isLoading, error, isAuthenticated: user?.role === "authenticated" }
}
