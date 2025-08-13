/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import StyledFormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm(
      {
        defaultValues: isEditSession ? editValues : {},
      }
  );
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate: create, isLoading: isAdding } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Cabin"],
      });
      toast.success("Cabin Added Successfully");
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabinData, id }) => createCabin(cabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Cabin"],
      });
      toast.success("Cabin Successfully Edited");
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const isWorking = isEditing || isAdding;

  const onSubmit = (data) => {
    // console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin({ cabinData: { ...data, image }, id: editId });
    } else {
      create({ ...data, image: image });
    }

    // mutate({ ...data, image: data.image[0] });
  };

  const onError = (error) => {
    console.error("Form submission error:", error);
  };
  // const cabinName = watch("name");
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}

      <StyledFormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </StyledFormRow>

      {/* <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity Should Be At Least 1",
            },
          })}
        />
      </FormRow> */}
      <StyledFormRow
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity Should Be At Least 1",
            },
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Regular Price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price Should be at least 1",
            },
          })}
        />
      </StyledFormRow>

      <StyledFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount Should be less than or equal to Regular Price",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Description of cabin"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Cabin photo">
        <FileInput
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          id="image"
          accept="image/*"
          disabled={isWorking}
        />
      </StyledFormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
