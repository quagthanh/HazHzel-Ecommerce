import { auth } from "@/auth";
import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.INTERNAL_BACKEND_URL
  : process.env.NEXT_PUBLIC_BACKEND_URL;

const http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    'x-app-id': process.env.NEXT_PUBLIC_CHAT_APP_ID,
  },
});

http.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const session = await auth();
      if (session?.user.access_token) {
        config.headers.Authorization = `Bearer ${session?.user?.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    console.error("Can not connect to server:", error?.response?.data);
    const customResponse = {
      message:
        error?.response?.data?.message ||
        "Can not get message of querry response",
      error:
        error?.response?.data?.error ||
        "Internal Server Error At Base - Can not connect to server",
      statusCode: error?.response?.data?.statusCode || "500",
    };
    return Promise.reject(customResponse);
  },
);

export default http;
