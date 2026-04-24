"use server";

import { sendRequest, sendRequestFile } from "@/utils/api";

export async function getCategory({
  current,
  pageSize,
}: {
  current?: number;
  pageSize?: number;
} = {}) {
  return sendRequest<any>({
    url: "/categories",
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
  });
}
export async function getCategoriesForAdmin(params: any) {
  return sendRequest<any>({
    url: `/categories?sort=-createdAt`,
    method: "GET",
    queryParams: params,
  });
}

export async function createCategory(formData: FormData) {
  try {
    const res = await sendRequestFile<any>({
      url: "/categories",
      method: "POST",
      body: formData,
    });
    return res;
  } catch (error: any) {
    console.error("Error acused by login function", error);
    return {
      statusCode: error?.statusCode,
      message: error?.message,
      data: null,
    };
  }
}

export async function updateCategory({
  _id,
  formData,
}: {
  _id: string;
  formData: FormData;
}) {
  return sendRequestFile<any>({
    url: `/categories/${_id}`,
    method: "PATCH",
    body: formData,
  });
}

export async function deleteCategory(_id: string) {
  return sendRequest<any>({
    url: `/categories/${_id}`,
    method: "DELETE",
  });
}
