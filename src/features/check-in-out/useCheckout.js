import { useMutation } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

import { useQueryClient } from "@tanstack/react-query"
// import { useNavigate } from "react-router-dom"

export const useCheckout = () => {
    const queryClient = useQueryClient()
    // const navigate = useNavigate()
    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
      mutationFn: ( bookingId) =>
        updateBooking(bookingId, {
          status: "checked-out",
          isPaid: true,
        
        }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} checked out successfully`);
        queryClient.invalidateQueries({ active: true });
        // navigate("/");
      },
      onError: () => {
        toast.error("Error checking out booking");
      },
    });

   return { checkout, isCheckingOut  };
}