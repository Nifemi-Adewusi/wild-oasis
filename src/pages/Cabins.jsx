import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
// import CabinTable from "../ui/Table";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button onClick={toggleForm}>
          {showForm ? "Close Form" : "Add New Cabin"}
        </Button>
      </div>

      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
