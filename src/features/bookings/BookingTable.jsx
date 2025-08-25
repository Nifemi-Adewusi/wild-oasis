import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
// import { useSearchParams } from "react-router-dom";

function BookingTable() {
  // const bookings = [];
  const { bookings, isLoading } = useBookings();
  // const [searchParams] = useSearchParams();
  // const status = searchParams.get("status") || "all";

  // const sortBy = searchParams.get("date") || "startDate-desc";

  // // Filtering
  // let filteredBookings = bookings || [];

  // if (status === "all") {
  //   filteredBookings = bookings;
  // }

  // if (status === "checked-out") {
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-out"
  //   );
  // }

  // if (status === "checked-in") {
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-in"
  //   );
  // }

  // if (status === "unconfirmed") {
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "unconfirmed"
  //   );
  // }

  // // Sorting

  // let filtered = [...filteredBookings];

  // if (sortBy === "startDate-desc") {
  //   filtered.sort((a, b) => b.startDate - a.startDate);
  // }

  // if (sortBy === "startDate-asc") {
  //   filtered.sort((a, b) => a.startDate - b.startDate);
  // }

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="Bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
