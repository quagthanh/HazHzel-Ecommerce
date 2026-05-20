import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponse } from '@/shared/interfaces/cloudinary-response';
import { Model } from 'mongoose';
import { IImage } from '@/shared/interfaces/image';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'mono-store',
        },
        (error, result) => {
          if (error || !result) {
            return reject(
              new HttpException(
                {
                  statusCode: error?.http_code || 500,
                  message: error?.message || 'Upload image failed',
                  error: error?.name,
                },
                error?.http_code || 500,
              ),
            );
          }
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  uploadMultiFiles(
    files: Express.Multer.File[],
  ): Promise<CloudinaryResponse[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }
  async deleteFile(_id: string) {
    return await cloudinary.uploader.destroy(_id);
  }
  async deleteFiles(_ids: string[]): Promise<any> {
    const deleteFiles = _ids.map((id) => this.deleteFile(id));
    return Promise.all(deleteFiles);
  }
  //oldImage fetch from db.product
  //keptImage take from DTO
  //new images take from FE/files
  async synImages(
    currentImages: IImage[],
    keptImages: IImage[],
    files: Express.Multer.File[],
  ): Promise<IImage[]> {
    for (const oldImage of currentImages) {
      const isStillUsed = keptImages.find(
        (img: IImage) => img.public_id === oldImage.public_id,
      );

      if (!isStillUsed) {
        await this.deleteFile(oldImage.public_id);
      }
    }

    let uploadedImages = [];
    if (files && files.length > 0) {
      uploadedImages = await this.uploadMultiFiles(files);
    }

    const finalImages = [...keptImages, ...uploadedImages];
    return finalImages;
  }
}
