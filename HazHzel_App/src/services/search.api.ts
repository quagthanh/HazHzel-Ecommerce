"use server";

import { sendRequest } from "@/utils/api";

export const getTopViewedProducts = async () => {
  const rel = await sendRequest<any>({
    url: `/products/actions/top-viewed`,
    method: "GET",
  });
  return rel;
};

export const searchProducts = async (keyword: string) => {
  return sendRequest<any>({
    url: `/products/actions/search`,
    method: "GET",
    queryParams: { keyword },
  });
};

export const searchCollections = async (keyword: string) => {
  return sendRequest<any>({
    url: `/collections/actions/search`,
    method: "GET",
    queryParams: { keyword },
  });
};
