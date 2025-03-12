const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'scraplink-images', 
    format: async (req, file) => 'png', 
    public_id: (req, file) => file.originalname
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9_.-]/g, '') // Remove special characters
      .split('.')[0], // Remove file extension
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ Set 5MB size limit
  fileFilter: (req, file, cb) => {
    if (!file) return cb(new Error('❌ No file uploaded!'), false);

    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
    console.error('Upload error: Invalid file type. Only PNG, JPG, and WebP allowed!');

    if (!allowedFormats.includes(file.mimetype)) {
      return cb(new Error('❌ Invalid file type. Only PNG, JPG, and WebP allowed!'), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
