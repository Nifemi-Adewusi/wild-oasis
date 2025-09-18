import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
// import { signup } from "../../services/apiAuth";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { signup, isLoading } = useSignUp();
  const { errors } = formState;
  const onSubmit = ({ fullName, email, password }) => {
    // console.log(data);
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          {...register("fullName", { required: "Full name is required" })}
          type="text"
          id="fullName"
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please Provide A Valid Email Address",
            },
          })}
          type="email"
          id="email"
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          type="password"
          id="password"
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.confirmPassword?.message}>
        <Input
          {...register("confirmPassword", {
            required: "Please Confirm your password",
            validate: (value) =>
              value === getValues().password || "Passwords needs to match",
          })}
          type="password"
          id="passwordConfirm"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
