import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Public, ResponseMessage } from '@/shared/decorators/customize';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  // @UseGuards(PermissionGuard)
  // @Permission(Resources.PERMISSION, 'read')
  @ResponseMessage('Upload images successful')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
  @Public()
  @Post('multiple')
  @ResponseMessage('Upload images successful')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.cloudinaryService.uploadMultiFiles(files);
  }
}
