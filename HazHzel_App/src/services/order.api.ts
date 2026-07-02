"use server";

import { sendRequest } from "@/utils/api";

export async function Checkout(checkoutDTO: any) {
  const res = await sendRequest<any>({
    url: `/order/checkout`,
    method: "POST",
    body: checkoutDTO,
  });
  return res;
}

export async function GetOrders(slug: string) {
  const res = await sendRequest<any>({
    url: `/order/${slug}`,
    method: "GET",
  });
  return res;
}

export async function GetMyOrders() {
  const res = await sendRequest<any>({
    url: `/order/me`,
    method: "GET",
  });
  return res;
}
