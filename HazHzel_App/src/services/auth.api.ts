"use server";
import {
  checkCodeDTO,
  retryActiveDTO,
  loginDTO,
  registerDTO,
} from "@/types/auth";
import { sendRequest } from "@/utils/api";
import http from "@/utils/axios-server";

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

export async function handleSignIn(registerDTO: registerDTO) {
  const res = await sendRequest<any>({
    url: `/auth/register`,
    method: "POST",
    body: registerDTO,
  });
  return res;
}

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
  const res = await sendRequest<any>({
    url: `/auth/check-code`,
    method: "POST",
    body: checkCode,
  });
  return res;
}
