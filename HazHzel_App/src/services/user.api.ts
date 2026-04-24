"use server";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { IUserTable } from "@/types/backend";
import { auth } from "@/auth";
import { ResponseData } from "@/types/interface";

export async function getUser({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) {
  return sendRequest<ResponseData<IUserTable>>({
    url: "/users",
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
  });
}

export async function handleCreateUser(formData: any) {
  return sendRequestFile<any>({
    url: "/users",
    method: "POST",
    body: formData,
  });
}

export async function handleEditUser({
  _id,
  formData,
}: {
  _id: any;
  formData: any;
}) {
  return sendRequestFile<any>({
    url: `/users/${_id}`,
    method: "PATCH",
    body: formData,
  });
}

export async function handleDeleteUserForAdmin(id: string) {
  return sendRequest<any>({
    url: `/users/${id}`,
    method: "DELETE",
  });
}
