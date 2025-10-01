/* eslint-disable no-unused-vars */
import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";

/* eslint-disable react/prop-types */
export default function Stats({ bookings, confirmedStays }) {
  const numBookings = bookings.length;
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
    </>
  );
}
