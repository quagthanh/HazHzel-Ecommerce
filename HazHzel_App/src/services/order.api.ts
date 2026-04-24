"use server";

import { sendRequest } from "@/utils/api";

export async function Checkout(checkoutDTO: any) {
  const res = await sendRequest<any>({
    url: `/order/checkout`,
    method: "POST",
    body: checkoutDTO,
  });
  console.log("Check checkout:", res);
  return res;
}
