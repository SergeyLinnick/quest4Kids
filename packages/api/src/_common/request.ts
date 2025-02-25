import { axiosInstance } from "./axiosInstance";

export const request = async <T = unknown>(options: {
  method: string;
  url: string;
  data?: T;
}) => {
  const response = await axiosInstance(options);
  return response.data;
};
