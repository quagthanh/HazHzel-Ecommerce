import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type ISingleImage = {
  public_id: string;
  secure_url: string;
};
export type CloudinaryResponse =
  | UploadApiResponse
  | UploadApiErrorResponse
  | ISingleImage;
