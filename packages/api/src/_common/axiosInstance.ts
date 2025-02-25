import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance
const instance: AxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Add authorization token to headers if available
    // if (typeof window !== "undefined" && window.localStorage) {
    // 	const token = localStorage.getItem("token");
    // 	if (token) {
    // 		config.headers.Authorization = `Bearer ${token}`;
    // 	}
    // }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors here
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Process successful responses
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response) {
      const { status, data }: AxiosResponse = error.response;

      switch (status) {
        case 401:
          console.error("Unauthorized (401): Please log in again.");
          // Optional: Redirect to login or refresh token
          // localStorage.removeItem("token");
          window.location.href = "/login";
          break;

        case 404:
          console.error(
            `Not Found (404): ${data?.message || "The requested resource was not found."}`,
          );
          break;

        case 500:
          console.error(
            "Internal Server Error (500): Something went wrong on the server.",
          );
          break;

        default:
          console.error(
            `HTTP Error (${status}): ${data?.message || "An unexpected error occurred."}`,
          );
      }
    } else if (error.request) {
      // No response was received
      console.error("Network Error: Unable to connect to the server.");
    } else {
      // Something else caused the error
      console.error(`Error: ${error.message}`);
    }

    // Optionally, reject the promise with custom error message or details
    return Promise.reject(error);
  },
);

export { instance as axiosInstance };
