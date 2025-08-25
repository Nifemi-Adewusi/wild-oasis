import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterKey="status"
        options={[
          { type: "all", value: "All" },
          { type: "checked-out", value: "Checked out" },
          { type: "checked-in", value: "Checked in" },
          { type: "unconfirmed", value: "Unconfirmed" },
        ]}
      />

      <SortBy
        filterKey="date"
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
