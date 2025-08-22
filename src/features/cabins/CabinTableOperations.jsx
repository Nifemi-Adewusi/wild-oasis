import Filter from '../../ui/Filter'
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const options = [
  {
    type: "all",
    value: "All",
  },
  {
    type: "no-discount",
    value: "No Discount",
  },
  {
    type: "with-discount",
    value: "With Discount",
  },
];

const sortOptions = [
  { value: "name-asc", label: "Sort By Name(A-Z)" },
  { value: "name-desc", label: "Sort By Name(Z-A)" },
  {
    value: "regularPrice-asc",
    label: "Sort By Price (Low Price to High)",
  },
  {
    value: "regularPrice-desc",
    label: "Sort By Price (High Price to Low",
  },
  { value: "maxCapacity-desc", label: "Sort By Capacity (High to Low)" },
  {
    value: "maxCapacity-asc",
    label: "Sort By Capacity (Low to High)",
  },
];
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterKey="discount" options={options} />
      <SortBy filterKey="sortBy" options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations
