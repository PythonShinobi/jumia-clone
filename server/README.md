
# React Express Authentication App

This application provides authentication features using React for the front end and Express.js with PostgreSQL for the backend.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Endpoints](#endpoints)

## Introduction

This project demonstrates how to set up a full-stack web application with user authentication using React for the client-side and Express.js with PostgreSQL for the server-side. It includes features like user registration, login/logout, session management using cookies, and protected routes and many more.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js and npm installed on your machine.
* PostgreSQL installed and running locally or remotely.
* Basic knowledge of JavaScript, React, Express.js, and PostgreSQL.


## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   `https://github.com/PythonShinobi/jumia-clone.git`
2. Install dependencies:

   `npm install`
3. Set up the database:

   * Create a PostgreSQL database.
   * Copy `.env.example` to `.env` and update the database connection details.
4. Run database migrations:

`    npm run migrate`

5. Start the server:
   `npm start`

## Usage

Once the application is running, you can register a new user, log in, view user details, and log out. The application demonstrates how to secure routes and manage user sessions using cookies.


## Endpoints

### Authentication

#### POST `/api/auth/register`

* **Description** : Register a new user.
* **Request Body** :

   {
 	"username": "string",
  	"email": "string",
  	"password": "string"
   }

**Response** :

   {
     "message": "Registration successful"
   }

**Errors** :* 400: User already exists, or invalid data.


#### POST `/api/auth/login`

* **Description** : Authenticate and log in a user.
* **Request Body** :

  {
  "username": "string",
  "password": "string"
  }
* **Response** :

    {
     "message": "Login successful",
     "user": {
        "username": "string",
        "email": "string"
       }
    }

* **Errors** :
* 401: Invalid username or password.

#### GET `/api/auth/logout`

* **Description** : Logout the currently authenticated user.


### Development Setup

* `server`: Contains Express server files.
* `client`: Contains React client files.
* `db.js`: Database connection setup using `pg` library.
* `auth-cookies.js`: Functions for setting and removing authentication cookies.
* `passport-local.js`: Passport local strategy for username/password authentication.
* `user.js`: Functions for user management, including user creation and querying.

Note: The server includes additional features and functionalities beyond authentication, providing a robust backend infrastructure for various applications.
