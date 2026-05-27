"use server";
import type { AccountData } from "@/types/account/index";
import { sendRequestFile } from "@/utils/api";

// Replace with real API/DB calls in production
export async function getAccountData(): Promise<AccountData> {
  return {
    user: {
      name: "Đinh",
      email: "dinhquangthanh11@gmail.com",
      phone: "+84987364536",
    },
    latestOrder: null,
  };
}

export async function getMyAccountOverview() {
  const res = await sendRequestFile<any>({
    url: "/users/me/overview",
    method: "GET",
  });
  return res;
}

export async function getMyAccount() {
  const res = await sendRequestFile<any>({
    url: "/users/me",
    method: "GET",
  });
  return res;
}
