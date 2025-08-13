/* eslint-disable no-unused-vars */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useForm } from "react-hook-form";
import { formatCurrency } from "../../utils/helpers";
import { updateSetting } from "../../services/apiSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const { settings, isLoading, error } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakFastPrice,
  } = settings || {};
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;
  const { updateSettings, isUpdatingSetting } = useUpdateSettings();
  const onSubmit = (data) => {
    console.log(data);
    updateSettings(data);
  };
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          {...register("minBookingLength")}
          defaultValue={minBookingLength}
          id="min-nights"
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          {...register("maxBookingLength")}
          type="number"
          defaultValue={maxBookingLength}
          id="max-nights"
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          {...register("maxGuestsPerBooking")}
          defaultValue={maxGuestsPerBooking}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          {...register("breakFastPrice")}
          defaultValue={breakFastPrice}
          id="breakfast-price"
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <Button type="submit" disabled={isUpdatingSetting}>
        Update Settings
      </Button>
    </Form>
  );
}

export default UpdateSettingsForm;
