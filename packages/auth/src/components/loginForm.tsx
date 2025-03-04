"use client";

import { useLogin } from "@repo/api";
import { Button, Input } from "@repo/ui";
import { useForm } from "react-hook-form";
import { navigate } from "./actions";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const onSuccess = () => {
    reset();
    navigate("/tasks");
  };
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
        error={errors.email?.message}
        {...register("email", { required: "Email is required" })}
      />
      <Input
        label="Password"
        id="password"
        placeholder="Type Password"
        disabled={isLoading}
        error={errors.password?.message}
        type="password"
        {...register("password", { required: "Password is required" })}
      />

      <Button
        style={{ width: "100%" }}
        disabled={isValidationError || isLoading}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
