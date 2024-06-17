// sever/api/router.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import env from "dotenv";

import db from "./db.js";

env.config();

const router = Router();

// Mutler setup for handling file uploads.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {    
    cb(null, 'uploads/');  // Directory to store the uploaded files.
  },
  filename: (req, file, cb) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    // Define the filename for uploaded files using the current time in seconds.
    cb(null, file.fieldname + '-' + currentTime + path.extname(file.originalname));
  },
});

// Create a middleware that can be used to handle file uploads in Express routes.
const upload = multer({ storage: storage });

// Message to check if the server is working as expected.
router.get("/", (req, res) => {
  res.send("Backend server is running🙂");
});

// Define the POST `/products` endpoint to handle product creation requests from the frontend.
router.post("/products", upload.single('image'), async (req, res) => {
  // Extracting data from the request body.
  const { name, description, price, category, rating } = req.body;

  // Checking if an image file was uploaded then extract the filename.
  const image = req.file ? req.file.filename : null;

  try {
    // Insert a new product(row) into the database and return the inserted row.
    const newProduct = await db.query(
      'INSERT INTO products (name, description, price, category, image, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category, image, rating]
    );    

    // Extracting the inserted product data from the database response.
    // Accessing rows[0] gives you the first (and only) row in the result set.
    const product = newProduct.rows[0];

    // Sending a JSON response with the newly created product data.
    res.json({
      id: product.id, // Unique identifier for the product.
      title: product.name, // Name of the product.
      price: product.price, // Price of the product.
      description: product.description, // Description of the product.
      category: product.category, // Category of the product.
      // Constructing the image URL using the server's port and the filename of the uploaded image.
      image: `http://localhost:${process.env.SERVER_PORT}/uploads/${product.image}`,
      rating: product.rating, // Rating of the product.
    });

  } catch (error) {
    // Handling errors by logging them and sending a server error response.
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;