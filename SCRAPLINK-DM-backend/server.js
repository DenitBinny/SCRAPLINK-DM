require('dotenv').config({ path: __dirname + '/.env' }); // Explicitly load .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const uploadRoutes = require('./routes/upload');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensures form-data is parsed

app.use('/api', uploadRoutes);

// ✅ Debugging: Check Environment Variables
console.log("✅ Checking Environment Variables...");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Configure Multer to Upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'scraplink-products',
    format: async () => 'png',
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

const upload = multer({ storage });

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Increase connection timeout
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 🔹 Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: { type: String, enum: ['Scrap Metal', 'Wooden Scraps', 'Electronics', 'Other'] },
  subcategory: { type: String, enum: ['Reusable', 'Non-Reusable', 'Eco-Friendly'] },
  size: { type: String, enum: ['F', 'H', 'R'] },
  date: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

// 🟢 Create a New Product
app.post('/products', upload.single('image'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'File not uploaded' });
    }

    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Use req.file.secure_url for the Cloudinary URL
    const productData = {
      ...req.body,
      image: req.file.secure_url, // Use secure_url instead of path
    };

    // Log the product data for debugging
    console.log('Product data:', productData);

    // Save the product to the database
    const product = new Product(productData);
    await product.save();

    // Send the saved product as the response
    res.status(201).json(product);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Failed to add product. Please try again.', error });
  }
});

// 🔵 Get All Products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 🟢 Get Product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// 🔴 Delete Product
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});