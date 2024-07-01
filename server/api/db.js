// server/api/db.js
import pg from "pg";
import env from "dotenv";

// Import the environment variables.
env.config();

const db = new pg.Client({
  connectionString: process.env.POSTGRES_URL
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

export default db;