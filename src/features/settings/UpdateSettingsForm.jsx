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
  const { register, handleSubmit } = useForm();

  // const { errors } = formState;
  const { updateSettings, isUpdatingSetting } = useUpdateSettings();
  const onSubmit = (data) => {
    console.log(data);
    updateSettings(data);
  };
  const handleBlurUpdate = function (e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSettings({ [field]: value });
  };
  const onError = (error) => {
    throw new Error("Form submission error:", error);
  };
  if (isLoading) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          onBlur={(e) => handleBlurUpdate(e, "minBookingLength")}
          // {...register("minBookingLength")}
          defaultValue={minBookingLength}
          id="min-nights"
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          // {...register("maxBookingLength")}
          onBlur={(e) => handleBlurUpdate(e, "maxBookingLength")}
          type="number"
          defaultValue={maxBookingLength}
          id="max-nights"
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          // {...register("maxGuestsPerBooking")}
          onBlur={(e) => handleBlurUpdate(e, "maxGuestsPerBooking")}
          defaultValue={maxGuestsPerBooking}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          // {...register("breakFastPrice")}
          onBlur={(e) => handleBlurUpdate(e, "breakFastPrice")}
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
