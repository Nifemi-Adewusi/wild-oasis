import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { type: "7", value: "Last 7 days" },
        { type: "30", value: "Last 30 days" },
        { type: "90", value: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
