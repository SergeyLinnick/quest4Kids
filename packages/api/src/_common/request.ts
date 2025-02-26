import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";

export const request = async <T = unknown, R = unknown>(
  options: AxiosRequestConfig<T>,
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await axiosInstance(options);

    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
    throw error;
  }
};
