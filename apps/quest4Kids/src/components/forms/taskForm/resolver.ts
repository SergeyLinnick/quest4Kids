import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateTask } from "@repo/api";
import * as yup from "yup";

const taskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(200, "Description must be less than 200 characters"),
  points: yup.number().required("Points is required"),
  status: yup.string().required("Status is required"),
});

export const taskFormValidation = yupResolver<ICreateTask>(taskSchema);
