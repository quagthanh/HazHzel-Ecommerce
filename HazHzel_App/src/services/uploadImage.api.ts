"use server";

import { revalidatePath } from "next/cache";

export async function UploadImages(formData: FormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloudinary/multiple`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.log("Upload Error:", res.status, errorText);
      return {
        statusCode: res.status,
        message: errorText || "Upload failed from Backend",
        data: null,
      };
    }

    const payload = await res.json();
    revalidatePath("/admin/dashboard/product/list");
    console.log("Payload from BE:", payload);
    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    console.log("Network/System Error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error (NextJS)",
      data: null,
    };
  }
}
