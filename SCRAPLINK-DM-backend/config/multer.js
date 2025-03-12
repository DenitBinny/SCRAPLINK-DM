const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); // Import Cloudinary config

// Configure Multer storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'scraplink-products', // Cloudinary folder
    format: async (req, file) => 'png', // Set format
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique filename
  },
});

const upload = multer({ storage });

module.exports = upload;
