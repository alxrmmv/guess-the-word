import { useEffect } from "react";
import { useSignUpMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";

function SignUpForm() {
  const [
    signUp,
    {
      data: user,
      error: signUpError,
      isSuccess,
      isError: isSignUpError,
      isLoading,
    },
  ] = useSignUpMutation();
  const { register, formState, handleSubmit, reset, getValues, setError } =
    useForm();

  const isAuthenticated = user?.user.role === "authenticated";

  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      reset();
      navigate("/");
    }
  }, [isSuccess, isAuthenticated, navigate, reset]);

  useEffect(() => {
    if (isSignUpError) {
      setError("email", { type: "manual", message: signUpError?.message });
    }
  }, [isSignUpError, signUpError, setError]);

  function onSubmit({ name, email, password }) {
    signUp({ name, email, password });
  }

  console.log(isSuccess, user);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.FormRowVertical>
        <Form.Input
          {...register("name")}
          placeholder="Name (optional)"
          type="text"
          id="name"
          autoComplete="name"
          disabled={isLoading}
        />
      </Form.FormRowVertical>
      <Form.FormRowVertical error={errors?.email?.message}>
        <Form.Input
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Entered value does not match email format",
            },
          })}
          placeholder="Email"
          type="email"
          id="email"
          autoComplete="username"
          disabled={isLoading}
        />
      </Form.FormRowVertical>
      <Form.FormRowVertical error={errors?.password?.message}>
        <Form.Input
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          placeholder="Password (min 8 characters)"
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isLoading}
        />
      </Form.FormRowVertical>
      <Form.FormRowVertical error={errors?.passwordConfirm?.message}>
        <Form.Input
          {...register("passwordConfirm", {
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
          placeholder="Repeat password"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          disabled={isLoading}
        />
      </Form.FormRowVertical>
      <Form.FormRowVertical>
        <Button size="large" disabled={isLoading}>
          Sign up
        </Button>
      </Form.FormRowVertical>
      <Form.FormRowVertical justify="center">
        <p>
          Already have an account?{" "}
          <span>
            <LinkButton to="/login">Login</LinkButton>
          </span>
        </p>
      </Form.FormRowVertical>
    </Form>
  );
}

export default SignUpForm;
