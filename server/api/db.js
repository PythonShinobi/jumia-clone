// server/api/db.js
import pg from "pg";
import env from "dotenv";

env.config();

/**
 * Function to connect to the database with retry logic.
 * If the connection fails, it will retry after 5 seconds.
 * Also listens for 'error' events on the database connection.
 */
const connectWithRetry = () => {
  // Create a new PostgreSQL client using the connection string from environment variables.
  const db = new pg.Client({
    connectionString: process.env.POSTGRES_URL
  });

  // Attempt to connect to the database.
  db.connect((err) => {
    if (err) {
      // Log connection error and retry after 5 seconds.
      console.error('Could not connect to the database', err);
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds.
    } else {
      // Log successful connection.
      console.log('Connected to the database');
    }
  });

  // Listen for 'error' events on the database connection.
  db.on('error', (err) => {
    // Log the error.
    console.error('Database error:', err);
    // If the error is a connection reset, retry the connection.
    if (err.code === 'ECONNRESET') {
      connectWithRetry(); // Reconnect on connection reset.
    } else {
      // For other errors, close the database connection.
      db.end();
    }
  });

  return db;
};

// Initialize the database connection with retry logic.
const db = connectWithRetry();

export default db;
