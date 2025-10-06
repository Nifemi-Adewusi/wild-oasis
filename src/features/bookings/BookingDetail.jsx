/* eslint-disable no-unused-vars */
import styled from "styled-components";

// import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBookings } from "./useDeleteBookings";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { HiTrash } from "react-icons/hi2";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const booking = {};
  // const status = "checked-in";

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();

  const { checkout } = useCheckout();
  const { deleteBooking } = useDeleteBookings();
  console.log(booking);
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (!booking) {
    return <Empty resourceName="Booking" />;
  }
  const { id: bookingId, status } = booking;
  console.log(booking);
  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button
              variation="primary"
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check In
            </Button>
          )}
          {status === "checked-in" && (
            <Button variation="primary" onClick={() => checkout(bookingId)}>
              Check Out
            </Button>
          )}

          {status === "checked-out" && (
            // <Button
            //   variation="primary"
            //   onClick={() => {
            //     deleteBooking(bookingId);
            //     navigate("/bookings");
            //   }}
            // >
            //   Delete Booking
            // </Button>

            <Modal.Open opens="delete">
              <Button variation="primary">Delete Booking</Button>
            </Modal.Open>

            // <Modal>
            //   <Menus>
            //     <Menus.List>
            //       <Modal.Open opens="delete-booking">
            //         <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            //       </Modal.Open>
            //     </Menus.List>
            //   </Menus>

            //   <Modal.Window name="delete-booking">
            //     <ConfirmDelete
            //       typeToDelete="booking"
            //       resourceName={bookingId}
            //       onConfirm={() => deleteBooking(bookingId)}
            //     />
            //   </Modal.Window>
            // </Modal>
          )}
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(bookingId);
                navigate("/bookings");
              }}
            />
          </Modal.Window>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
