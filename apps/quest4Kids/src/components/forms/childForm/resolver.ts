import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const passwordResolver = yup
  .string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters")
  .matches(/[A-Z]/, "Password must contain at least one capital letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character",
  );

const childSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: passwordResolver,
});

export const childFormValidation = yupResolver(childSchema);
