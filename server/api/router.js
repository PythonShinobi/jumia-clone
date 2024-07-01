// sever/api/router.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import env from "dotenv";

import db from "./db.js";
import { getUser } from "./getUser.js";
import register from "./register.js";
import logout from "./auth/logout.js";
import Login from "./login.js";
import Checkout from "./checkout.js";
import Orders from "./orders.js";

env.config();

const router = Router();

// Create a Nodemailer transporter.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

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

// Verify the transporter configuration.
transporter.verify((error, success) => {
  if (error) {
      console.error(`Transporter verification failed: ${error}`);
  } else {
      console.log("Transporter is ready to send emails");
  }
});

// POST endpoint to send emails.
router.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  console.log(`Received email request: ${name}, ${email}, ${message}`);

  try {
      // Send email using Nodemailer.
      let info = await transporter.sendMail({
          from: email,
          to: process.env.GMAIL,
          subject: "New Contact Message",
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });

      console.log('Email sent:', info.messageId);
      res.send("Email has been sent🙂.");
  } catch (error) {
      console.error(`Error sending email: ${error}`);
      res.status(500).send("Failed to send email😞.");
  }
});

// Message to check if the server is working as expected.
router.get("/", (req, res) => {
  res.send("Backend server is running🙂");
});

// Define the route for fetching user data.
router.get('/user', getUser);

// Define the POST /register endpoint
router.post('/register', register);

// Define the GET /logout endpoint.
router.get("/logout", logout);

// Define the POST /login endpoint
router.post("/login", Login);

router.post("/checkout", Checkout);

router.get("/orders", Orders);

// GET endpoint to retrieve products.
router.get("/products", async (req, res) => {
  try {
    // Fetch data from the database.
    const products = await db.query("SELECT * FROM products");
    // Return the fetched products data.
    res.json(products.rows);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    // Send an error response with a status code of 500 (Internal Server Error) and an error message.
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve a product by it's ID.
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    res.json(product.rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE endpoint to delete a product by its ID
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Perform database query to delete product by ID
    await db.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: `Product with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve a product details by it's category.
router.get("/products/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await db.query("SELECT * FROM products WHERE category = $1", [category]);
    res.json(products.rows);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

    // Sending a JSON response back to the client with the details 
    // of newly created product data.
    res.json({
      id: product.id, // Unique identifier for the product.
      title: product.name, // Name of the product.
      price: product.price, // Price of the product.
      description: product.description, // Description of the product.
      category: product.category, // Category of the product.
      // Constructing the image URL using the server's port and the filename of the uploaded image.
      image: `${process.env.BACKEND_URL}/uploads/${product.image}`,
      rating: product.rating, // Rating of the product.
    });

  } catch (error) {
    // Handling errors by logging them and sending a server error response.
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;