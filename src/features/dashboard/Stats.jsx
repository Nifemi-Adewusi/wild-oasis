/* eslint-disable no-unused-vars */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

/* eslint-disable react/prop-types */
export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBookings = bookings.length;
  console.log(numDays, cabinCount);
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const checkins = confirmedStays.length;

  const totalNights = confirmedStays.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );

  const occupancy = totalNights / (numDays * cabinCount);
  // const occupancy = confirmedStays.reduce(
  //   (acc, curr) => (acc + curr.numNights, 0) / (numDays * cabinCount)
  // );
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check-Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}
