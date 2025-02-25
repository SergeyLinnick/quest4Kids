"use client";

import { useLogin } from "@repo/api";
import { Button, Input } from "@repo/ui";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const onSuccess = () => {
    console.log("onSuccess");
  };
  const onError = () => {
    console.log("onError");
  };
  const { login, isLoading } = useLogin(onSuccess, onError);

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        id="email"
        placeholder="Type Email"
        disabled={isLoading}
        {...register("email")}
      />
      <Input
        label="Password"
        id="password"
        placeholder="Type Password"
        disabled={isLoading}
        {...register("password")}
      />

      <Button type="submit" style={{ width: "100%" }}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
