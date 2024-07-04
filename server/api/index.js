// server/api/index.js
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";

import router from "./router.js";

// Configure the server.
env.config();

// Create an express application.
const app = express();
const PORT = process.env.SERVER_PORT || 5001

// Define the origins from which the frontend will be making requests.
const allowedOrigins = [ process.env.HOST, process.env.PROJECT_URL ];

// Create CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is included in the allowedOrigins array or 
	// if it's undefined (which happens with same-origin requests).
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request.
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the request.
    }
  },
  credentials: true, // Allow cookies to be sent along with the request.
  exposedHeaders: ['Set-Cookie'], // This will expose the Set-Cookie header.
  optionSuccessStatus: 200,
  Headers: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  withCredentials: true,
};

// Configure CORS middleware using the corsOptions object.
app.use(cors(corsOptions));

// Logging middleware: Log HTTP requests to the console in a development-friendly format.
app.use(logger('dev'));

// Parse incoming JSON requests.
app.use(bodyParser.json());

// Set up body-parser middleware to parse URL-encoded request bodies.
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies attached to the HTTP requests.
app.use(cookieParser());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Use the router.
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
