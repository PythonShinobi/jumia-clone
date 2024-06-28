-- Create the user table.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  isadmin BOOLEAN NOT NULL DEFAULT FALSE,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the products table.
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category VARCHAR(50),
  image VARCHAR(255),
  rating JSONB
);

-- Delete all records from the users table.
DELETE FROM users;

-- Reset the id sequence to start from 1.
ALTER SEQUENCE users_id_seq RESTART WITH 1;