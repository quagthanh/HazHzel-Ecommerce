"use server";
import { sendRequest, sendRequestFile } from "@/utils/api";

export async function getCollectionsForAdmin(params: any) {
  return sendRequest<any>({
    url: `/collections?sort=-createdAt`,
    method: "GET",
    queryParams: params,
  });
}

export async function createCollection(formData: FormData) {
  try {
    const res = await sendRequestFile<any>({
      url: "/collections",
      method: "POST",
      body: formData,
    });
    return res;
  } catch (error: any) {
    console.error("Error acused by collection function", error);
    return {
      statusCode: error?.statusCode,
      message: error?.message,
      data: null,
    };
  }
}

export async function updateCollection({
  _id,
  formData,
}: {
  _id: string;
  formData: FormData;
}) {
  return sendRequestFile<any>({
    url: `/collections/${_id}`,
    method: "PATCH",
    body: formData,
  });
}

export async function deleteCollection(_id: string) {
  return sendRequest<any>({
    url: `/collections/${_id}`,
    method: "DELETE",
  });
}
