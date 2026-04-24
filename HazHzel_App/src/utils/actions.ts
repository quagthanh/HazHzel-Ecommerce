"use server";
import { signIn } from "@/auth";
import { FormData } from "@/components/common/auth/login-form/login-form";
import { auth } from "@/auth";

export async function authenticate(
  formData: FormData,
  callbackUrl?: string | null,
) {
  try {
    const { username, password } = formData;
    const r = await signIn("credentials", {
      username: username,
      password: password,
      redirectTo: callbackUrl || "/",
    });
    return r;
  } catch (error) {
    if ((error as any).message === "NEXT_REDIRECT") {
      throw error;
    }
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return { error: "Internal server error", code: 0 };
    }
  }
}
