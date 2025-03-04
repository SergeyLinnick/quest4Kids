import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import { axiosServerInstance } from "./axiosServerInstance";

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

export const clientRequestWithAuth = async <T = unknown, R = unknown>(
  options: AxiosRequestConfig<T>,
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await axiosInstance({
      ...options,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
    throw error;
  }
};

export const serverRequestWithAuth = async <T = unknown, R = unknown>(
  options: AxiosRequestConfig<T>,
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await axiosServerInstance({
      ...options,
      withCredentials: true,
    });
    console.log("response:", response);
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
    throw error;
  }
};
