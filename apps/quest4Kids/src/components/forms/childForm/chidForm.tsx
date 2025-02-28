"use client";

import { PAGE_PATH_PARENT } from "@/consts/pagePath";
import { Flex } from "@radix-ui/themes";
import { ICreateChild, useAddChild } from "@repo/api";
import { Button, FormField } from "@repo/ui";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { childFormValidation } from "./resolver";

export const ChildForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateChild>({
    resolver: childFormValidation,
    reValidateMode: "onChange",
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { name: "", email: "", password: "" },
    // values,
  });

  const { addChild, isLoading } = useAddChild({
    onSuccess: () => {
      router.push(PAGE_PATH_PARENT.CHILDREN);
    },
  });

  const onSubmit = (data: ICreateChild) => {
    addChild(data);
  };

  return (
    <Form.Root className="FormRoot" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="5" maxWidth="300px">
        <FormField
          name="name"
          label="Name"
          placeholder="Enter Name"
          register={register("name")}
          isLoading={isLoading}
          error={errors.name?.message}
        />

        <FormField
          name="email"
          label="Email"
          placeholder="Enter Email"
          register={register("email")}
          isLoading={isLoading}
          error={errors.email?.message}
          type="email"
        />

        <FormField
          name="password"
          label="Password"
          placeholder="Enter Password"
          register={register("password")}
          isLoading={isLoading}
          error={errors.password?.message}
          type="password"
        />
        <Form.Submit asChild>
          <Button isLoading={isLoading}>Add Child</Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
};
