import { useForm } from "react-hook-form";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
  useUpdateCurrentUserMutation,
} from "../authentication/authSlice";

import Button from "../../ui/Button";

import { useEffect } from "react";
import Form from "../../ui/Form";

function UserProfile() {
  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery();

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [updateCurrentUser, { isLoading: isUpdatingUser }] =
    useUpdateCurrentUserMutation();

  const {
    register,
    formState,
    getValues,
    handleSubmit,
    reset,
    isSubmitSuccessful,
  } = useForm({
    defaultValues: {
      name: user?.user_metadata?.name,
      email: user?.email,
      password: "",
      passwordConfirm: "",
    },
  });

  useEffect(() => {
    reset({
      name: user?.user_metadata?.name,
      email: user?.email,
      password: "",
      passwordConfirm: "",
    });
  }, [isSubmitSuccessful, reset, user]);

  const isLoading = isLoadingUser || isUpdatingUser || isLoggingOut;

  const { errors, isDirty, isValid } = formState;

  function onSubmit({ name, email, password }) {
    updateCurrentUser({ name, email, password });
    // reset();
  }

  function handleLogout() {
    logout();
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.FormRowVertical label="Name">
          <Form.Input
            {...register("name")}
            // placeholder=""
            type="text"
            id="name"
            autoComplete="name"
            disabled={isLoading}
          />
        </Form.FormRowVertical>
        <Form.FormRowVertical label="Email" error={errors?.email?.message}>
          <Form.Input
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Entered value does not match email format",
              },
            })}
            //   placeholder={user.email}
            type="email"
            id="email"
            autoComplete="username"
            disabled={isLoading}
          />
        </Form.FormRowVertical>
        <Form.FormRowVertical
          label="New password"
          error={errors?.password?.message}
        >
          <Form.Input
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            placeholder=""
            type="password"
            id="password"
            autoComplete="new-password"
            disabled={isLoading}
          />
        </Form.FormRowVertical>
        <Form.FormRowVertical
          label="Confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <Form.Input
            {...register("passwordConfirm", {
              validate: (value) =>
                value === getValues("password") || "The passwords do not match",
            })}
            placeholder=""
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            disabled={isLoading}
          />
        </Form.FormRowVertical>

        <Form.FormRowVertical justify="center">
          <Button
            $variation="primary"
            size="medium"
            disabled={isLoading || !isDirty || !isValid}
          >
            Save changes
          </Button>
        </Form.FormRowVertical>
        <Form.FormRowVertical justify="center">
          <Button onClick={handleLogout} type="button" $variation="link">
            Logout
          </Button>
        </Form.FormRowVertical>
      </Form>
    </>
  );
}

export default UserProfile;
