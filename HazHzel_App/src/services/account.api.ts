"use server";
import { sendRequestFile } from "@/utils/api";

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
