"use server";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { TopSupplier } from "@/types/interface";

export async function getTopSuppliers() {
  return sendRequest<TopSupplier[]>({
    url: "/suppliers/top/3",
    method: "GET",
  });
}

export async function getSupplier({
  current,
  pageSize,
}: {
  current?: number;
  pageSize?: number;
} = {}) {
  return sendRequest<any>({
    url: "/suppliers",
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
  });
}

export async function getSuppliersForAdmin(params: any) {
  const res = await sendRequest<any>({
    url: `/suppliers/admin?sort=-createdAt`,
    method: "GET",
    queryParams: params,
  });
  return res;
}

export async function createSupplierForAdmin(formData: FormData) {
  try {
    const res = await sendRequestFile<any>({
      url: "/suppliers",
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

export async function updateSupplierForAdmin({
  _id,
  formData,
}: {
  _id: string;
  formData: FormData;
}) {
  return sendRequestFile<any>({
    url: `/suppliers/${_id}`,
    method: "PATCH",
    body: formData,
  });
}

export async function deleteSupplierForAdmin(_id: string) {
  return sendRequest<any>({
    url: `/suppliers/${_id}`,
    method: "DELETE",
  });
}
