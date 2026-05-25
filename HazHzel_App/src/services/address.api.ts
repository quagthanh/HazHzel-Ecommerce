"use server";
import { sendRequestFile } from "@/utils/api";

export async function createAddress(value: any) {
  const res = await sendRequestFile<any>({
    url: "/address",
    method: "POST",
    body: value,
  });
  return res;
}

export async function getAddress() {
  const res = await sendRequestFile<any>({
    url: "/address",
    method: "GET",
  });
  return res;
}
