import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const num = searchParams.get("last") || 7;
  const numDays = Number(num);
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { isLoading, stays };
}
