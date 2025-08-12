/* eslint-disable no-unused-vars */
import styled from "styled-components";

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

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isLoading: isAdding } = useMutation({
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

  const onSubmit = (data) => {
    console.log(data);

    mutate(data);
    // Here you would typically send t\he data to your API
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
          {...register("description", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </StyledFormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding}>Edit cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
