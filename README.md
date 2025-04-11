# Image Processing Service
A NestJS-based backend service that performs image processing for CMS platforms. It supports image upload, conversion to WebP, cropping based on coordinates, and generating type-specific variations such as game thumbnails or promotional banners.

## Project Background
In CMS-driven platforms—especially casino, game, or e-commerce systems—uploaded images often need to be optimized, resized, and formatted for performance and consistency. This microservice standardizes that process by providing RESTful endpoints that handle:
- Conversion to WebP
- Auto-generation of thumbnails/resized versions based on image type
- Cropping by pixel coordinates (x, y, width, height)
- Simple API integration with any frontend or CMS

### Features
- Upload JPEG/PNG and auto-convert to WebP
- Generate custom variations (thumbnail, resized) by type (game, promotion)
- Crop images using coordinates and size
- Output format customization (e.g., WebP, JPEG, PNG)
- Clean REST API for CMS/frontend integration

## Project clone
```
git clone https://github.com/
cd image-processing-service
```

## Project setup
To get started with this project, you need to install dependencies using **Yarn**:

```
# Install dependencies
yarn install
# or
npm install
```

### Compiles and hot-reloads for development
```
# Start the development server
yarn start
# or
npm run start
```

### Endpoints & Parameters
#### POST /image/upload
Upload an image and generate variations based on type.
Content Type: multipart/form-data
Form Fields:
- file (File) - Upload an image (JPEG, PNG)
- type (Text) - game or promotion

#### POST /image/crop
Crop an image using specified coordinates.
Content Type: multipart/form-data
Form Fields:
- file (File) - Image to crop
- x (Text) - X position in pixels
- y (Text) - Y position in pixels
- width (Text) - Crop width
- height (Text) - Crop height
- outputFormat (Text) - Optional (e.g., webp, jpeg)

### Run Unit Tests
```
yarn test
# or
npm run test
```
