import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordResolver } from "@repo/utils";
import * as yup from "yup";

const childSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: PasswordResolver,
});

export const childFormValidation = yupResolver(childSchema);
