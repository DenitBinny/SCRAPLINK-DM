const express = require('express');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.error('Upload error: No image uploaded');
    return res.status(400).json({ error: 'No image uploaded' });
  }
  console.log(`Image uploaded successfully: ${req.file.path}`);

  res.json({ imageUrl: req.file.path }); // Returns Cloudinary URL
});

module.exports = router;
