"use server";

import { sendRequest } from "@/utils/api";

export async function getOrdersForAdmin(params: any) {
  const res = await sendRequest<any>({
    url: `/order`,
    method: "GET",
    queryParams: params,
  });
  return res;
}

export async function Checkout(checkoutDTO: any) {
  const res = await sendRequest<any>({
    url: `/order/checkout`,
    method: "POST",
    body: checkoutDTO,
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

export async function getOrderByIdForAdmin(id: string) {
  return sendRequest<any>({
    url: `/order/${id}`,
    method: "GET",
  });
}

export async function updateOrderStatusForAdmin({
  _id,
  status,
}: {
  _id: string;
  status: string;
}) {
  return sendRequest<any>({
    url: `/order/${_id}/status`,
    method: "PATCH",
    body: { status },
  });
}

export async function updatePaymentStatusForAdmin({
  _id,
  paymentStatus,
}: {
  _id: string;
  paymentStatus: string;
}) {
  return sendRequest<any>({
    url: `/order/${_id}/payment-status`,
    method: "PATCH",
    body: { paymentStatus },
  });
}