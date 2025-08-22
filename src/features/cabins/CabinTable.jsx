/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
// import CabinRow from "./CabinRow";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  const { cabins, isLoading, error } = useCabins();

  const [searchParams] = useSearchParams() || "all";
  const filterBy = searchParams.get("discount") || "all";

  const sortBy = searchParams.get("sortBy") || "name-asc";

  let filteredCabins = cabins || [];

  // Filter
  if (filterBy === "all") {
    filteredCabins = cabins || [];
  }
  if (filterBy === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin?.discount === 0);
  }
  if (filterBy === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin?.discount > 0);
  }

  console.log(filteredCabins);
  // Sorting

  // let sortedCabins = [...filteredCabins];

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  // if (sortBy === "regularPrice-asc") {
  //   sortedCabins.sort((a, b) => a.regularPrice - b.regularPrice);
  // }

  // if (sortBy === "regularPrice-desc") {
  //   sortedCabins.sort((a, b) => b.regularPrice - a.regularPrice);
  // }

  // if (sortBy === "maxCapacity") {
  //   sortedCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
  // }

  // if (sortBy === "minCapacity") {
  //   sortedCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
  // }

  // if (sortBy === "name-asc") {
  //   sortedCabins.sort((a, b) => a.name.localeCompare(b.name));
  // }
  // if (sortBy === "name-desc") {
  //   sortedCabins.sort((a, b) => b.name.localeCompare(a.name));
  // }
  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resourceName="Cabins" />;
  if (!filteredCabins.length)
    return <Empty resourceName={`Cabins with ${filterBy} `} />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </Table.Header>
      {/* {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))} */}

      {/* {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))} */}

      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      ></Table.Body>
    </Table>
  );
}

export default CabinTable;
