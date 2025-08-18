import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
     const [showModal, setShowModal] = useState(false);
  return (
      <div>
           <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => setShowModal(!showModal)}>
                    {showModal ? "Close Form" : "Add New Cabin"}
                  </Button>
          </div>
          {showModal && <Modal>
             <CreateCabinForm/>
          </Modal>}
    </div>
  )
}
export default AddCabin