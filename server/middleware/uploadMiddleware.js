import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const uploadDir = process.env.UPLOAD_DIR || './uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export const processImage = async (fileBuffer, filenamePrefix = 'product') => {
  const timestamp = Date.now();
  const filename = `${filenamePrefix}-${timestamp}.webp`;
  const thumbFilename = `${filenamePrefix}-${timestamp}-thumb.webp`;

  const targetPath = path.join(uploadDir, filename);
  const thumbPath = path.join(uploadDir, thumbFilename);

  // Main high-res webp image (max width 1200)
  await sharp(fileBuffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .toFormat('webp', { quality: 85 })
    .toFile(targetPath);

  // Thumbnail webp image (width 400)
  await sharp(fileBuffer)
    .resize(400, 400, { fit: 'cover' })
    .toFormat('webp', { quality: 80 })
    .toFile(thumbPath);

  return {
    url: `/uploads/${filename}`,
    thumbUrl: `/uploads/${thumbFilename}`
  };
};
