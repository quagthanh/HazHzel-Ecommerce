"use server";

import { AddToCartDTO } from "@/types/cart";
import { sendRequest } from "@/utils/api";

export async function addToCart({ userId, payload }: AddToCartDTO) {
  const res = await sendRequest<any>({
    url: `/cart/${userId}`,
    method: "POST",
    body: payload,
  });
  return res;
}
export async function getCartByUserId() {
  const res = await sendRequest<any>({
    url: `/cart`,
    method: "GET",
  });
  return res;
}
export async function updateCartItem(cartItemId: string, quantity: number) {
  const res = await sendRequest<any>({
    url: `/cart-item/${cartItemId}`,
    method: "PATCH",
    body: { quantity },
  });
  return res;
}
export async function deleteCartItem(cartItemId: string) {
  const res = await sendRequest<any>({
    url: `/cart-item`,
    method: "DELETE",
    body: { cartItemId },
  });
  return res;
}
