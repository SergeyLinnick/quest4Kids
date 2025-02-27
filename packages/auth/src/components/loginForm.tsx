"use client";

import { useLogin } from "@repo/api";
import { Button, Input } from "@repo/ui";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<LoginFormData>();

  const onSuccess = () => reset();
  const onError = () => null;

  const { login, isLoading } = useLogin(onSuccess, onError);

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const isValidationError = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        id="email"
        placeholder="Type Email"
        disabled={isLoading}
        {...register("email", { required: "Email is required" })}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        id="password"
        placeholder="Type Password"
        disabled={isLoading}
        {...register("password", { required: "Password is required" })}
        error={errors.password?.message}
        type="password"
      />

      <Button
        style={{ width: "100%" }}
        disabled={isValidationError || isLoading || !isDirty}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
