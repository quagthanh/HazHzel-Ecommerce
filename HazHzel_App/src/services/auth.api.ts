"use server";
import { loginDTO } from "@/types/backend";
import { sendRequest } from "@/utils/api";
import http from "@/utils/axios-server";

export type retryActiveDTO = {
  email: string;
};
export async function handleLogin(loginDTO: loginDTO) {
  try {
    const res = await sendRequest<any>({
      url: `/auth/login`,
      method: "POST",
      body: loginDTO,
    });
    return res;
  } catch (error: any) {
    console.error("Error acused by login function", error);
    return {
      statusCode: error?.statusCode,
      message: error?.message,
      data: null,
    };
  }
}

type checkCodeDTO = {
  _id: string;
  code: string;
};
export async function handleRetryActive(
  retryActive: retryActiveDTO,
): Promise<any> {
  try {
    const result = await http.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/retry-active`,
      retryActive,
    );
    return result;
  } catch (error) {
    throw error;
  }
}
export async function handleCheckCode(checkCode: checkCodeDTO): Promise<any> {
  try {
    const result = await http.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-code`,
      checkCode,
    );
    return result;
  } catch (error) {
    return error;
  }
}
