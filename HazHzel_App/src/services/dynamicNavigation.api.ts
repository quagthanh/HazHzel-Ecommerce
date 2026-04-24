"use server";
import { sendRequest } from "@/utils/api";

//dynamic navigation
export async function getNavMetadata() {
  const res = await sendRequest<any>({
    url: `/categories/nav-metadata`,
    method: "GET",
  });
  return res;
}
