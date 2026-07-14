"use server";
import { ResponseData } from "@/types/interface";
import { IProductQueryParams, ProductResponseData } from "@/types/product";
import { sendRequest, sendRequestFile } from "@/utils/api";

export async function getProductsForAdmin({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) {
  return sendRequest<ResponseData<any>>({
    url: "/products/admin",
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
  });
}

//Product by gender
export async function getProducts(sendParams: IProductQueryParams) {
  if (sendParams.gender && sendParams.gender.toUpperCase() !== "UNDEFINED") {
    sendParams.gender = sendParams.gender.toUpperCase();
  }
  const res = await sendRequest<ResponseData<any>>({
    url: "/products",
    method: "GET",
    queryParams: sendParams,
  });
  return res;
}
//GET detail product
export async function getDetailProduct(
  slug: string,
  state: { color: string; size: string },
) {
  return sendRequest<ProductResponseData>({
    url: `/products/${slug}?color=${state.color}&size=${state.size}`,
    method: "GET",
    queryParams: {},
  });
}
//Product by store(supplier)
export async function getProductsByStore(
  slug: string,
  sendParams: IProductQueryParams,
) {
  const res = await sendRequest<ProductResponseData>({
    url: `/products/by-supplier/${slug}`,
    method: "GET",
    queryParams: sendParams,
  });

  return res;
}
//Product by category
export async function getProductsByCategory(
  slug: string,
  params: {
    current: number;
    pageSize: number;
    minPrice?: string | number;
    maxPrice?: string | number;
    sort?: string;
    size?: string;
    brand?: string;
  },
) {
  return sendRequest<ProductResponseData>({
    url: `/products/by-category/${slug}`,
    method: "GET",
    queryParams: params,
  });
}
//Product by collection
export async function getProductsByCollection(
  slug: string,
  params: {
    current: number;
    pageSize: number;
    minPrice?: string | number;
    maxPrice?: string | number;
    sort?: string;
    size?: string;
    brand?: string;
  },
) {
  return sendRequest<ProductResponseData>({
    url: `/products/by-collection/${slug}`,
    method: "GET",
    queryParams: params,
  });
}

export async function getHomeProductBySupplier() {
  const slug = "nike";
  const res = await sendRequest<ProductResponseData>({
    url: `/products/home-new-brand/${slug}`,
    method: "GET",
  });
  return res;
}

export async function createProductsForAdmin(formData: FormData) {
  try {
    const res = await sendRequestFile<any>({
      url: "/products",
      method: "POST",
      body: formData,
    });
    return res;
  } catch (error: any) {
    console.error("Error acused by products function", error);
    return {
      statusCode: error?.statusCode,
      message: error?.message,
      data: null,
    };
  }
}

export async function updateProductsForAdmin({
  _id,
  formData,
}: {
  _id: string;
  formData: FormData;
}) {
  const res = await sendRequestFile<any>({
    url: `/products/${_id}`,
    method: "PATCH",
    body: formData,
  });
  return res;
}
export async function deleteProductsForAdmin(_id: string) {
  return sendRequest<any>({
    url: `/products/${_id}`,
    method: "DELETE",
  });
}
