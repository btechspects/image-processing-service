// src/image/image.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from './image.service';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
};

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body: { type: 'game' | 'promotion' }) {
    return this.imageService.handleUpload(file, body.type);
  }

  @Post('crop')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  cropImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { x: number; y: number; width: number; height: number; outputFormat?: string },
  ) {
    return this.imageService.cropImage(file, body);
  }
}
