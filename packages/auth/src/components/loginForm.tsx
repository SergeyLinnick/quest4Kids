"use client";

import { Button, Input } from "@repo/ui";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        id="email"
        placeholder="Type Email"
        disabled={false}
        {...register("email")}
      />
      <Input
        label="Password"
        id="password"
        placeholder="Type Password"
        disabled={false}
        {...register("password")}
      />

      <Button type="submit" style={{ width: "100%" }}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
