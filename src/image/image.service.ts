import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { imageTypeSettings } from './image.config';

@Injectable()
export class ImageService {
  async handleUpload(file: Express.Multer.File, type: string) {
    const inputPath = file.path;
    const outputDir = 'processed';
    fs.mkdirSync(outputDir, { recursive: true });

    const baseName = path.basename(file.originalname, path.extname(file.originalname));
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath).toFormat('webp').toFile(webpPath);

    const variations: string[] = [];

    const config = imageTypeSettings[type];
    if (config) {
      for (const variation of config.variations) {
        const variationPath = path.join(outputDir, `${baseName}-${variation.name}.webp`);
        await sharp(inputPath)
          .resize(variation.width, variation.height)
          .toFormat('webp')
          .toFile(variationPath);
        variations.push(variationPath);
      }
    }

    return {
      original: webpPath,
      variations,
    };
  }

  async cropImage(
    file: Express.Multer.File,
    cropOptions: {
      x: any;
      y: any;
      width: any;
      height: any;
      outputFormat?: string;
    },
  ) {
    const outputDir = path.resolve(__dirname, '../../cropped');
    fs.mkdirSync(outputDir, { recursive: true });
  
    const baseName = path.basename(file.originalname, path.extname(file.originalname));
    const outputFormat = cropOptions.outputFormat || 'webp';
    const outputPath = path.join(outputDir, `${baseName}-cropped.${outputFormat}`);
  
    // Convert string values to numbers
    const x = parseInt(cropOptions.x, 10);
    const y = parseInt(cropOptions.y, 10);
    const width = parseInt(cropOptions.width, 10);
    const height = parseInt(cropOptions.height, 10);
  
    console.log('[CROPPING]', { file: file.path, x, y, width, height, outputPath });
  
    // Validation
    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
      throw new Error('Crop coordinates must be valid numbers');
    }
    if (width <= 0 || height <= 0 || x < 0 || y < 0) {
      throw new Error('Invalid crop dimensions or coordinates');
    }
  
    await sharp(file.path)
      .extract({ left: x, top: y, width, height })
      .toFormat(outputFormat as keyof sharp.FormatEnum)
      .toFile(outputPath);
  
    return { cropped: outputPath };
  }
}
