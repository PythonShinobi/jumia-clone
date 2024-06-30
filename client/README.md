# React Application README

This README provides an overview of the structure and functionality of the React application.

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Components and Pages](#components-and-pages)
4. [Redux State Management](#redux-state-management)
5. [Routing](#routing)
6. [Authentication](#authentication)
7. [API Integration](#api-integration)

---

## 1. Overview

This React application is designed to provide a comprehensive e-commerce experience, featuring user authentication, product browsing, cart management, and checkout functionality. It leverages modern web technologies including React, Redux for state management, Axios for HTTP requests, and React Router for navigation.

---

## 2. Folder Structure

├── public/
├── src/
│   ├── about

 |    ├── admin/
│   ├── cart/
│   ├── checkout/
│   ├── components/
│   ├── contact/
│   ├── home/
│   ├── login/
│   ├── navbar/
│   ├── product/
│   ├── profile/
│   ├── register/
│   ├── redux/
│   │   ├── action/
│   │   ├── hooks.js
│   │   ├── reducer/
│   │   │   ├── handleCart.js
│   │   │   └── index.js
│   │   └── store.js
│   ├── 404-page/
│   ├── App.js
│   ├── index.js
│   └── setupTests.js
├── .gitignore
├── package.json
└── README.md

* **src/** : Contains all application source code.
* **redux/** : Manages application state using Redux.
* **components/** : Reusable UI components.
* **hooks.js** : Custom hooks for managing user authentication and API calls.
* **store.js** : Configures Redux store with combined reducers.

---

## 3. Components and Pages

* **Components** : Reusable UI elements like forms (`Form.jsx`), navigation bar (`Navbar.jsx`), and private route handler (`PrivateRoute.jsx`).
* **Pages** : Main components for different routes, including `Home.jsx`, `About.jsx`, `ProductsPage.jsx`, `ProductDetailsPage.jsx`, `ContactPage.jsx`, `Cart.jsx`, `Login.jsx`, `Register.jsx`, `UserProfile.jsx`, `Checkout.jsx`, `AdminPage.jsx`, `AdminForm.jsx` and `PageNotFound.jsx`.

## 4. Redux State Management

Redux is used for centralized state management:

* **Actions** : Defined in `action/index.js` for adding, deleting, and clearing items in the shopping cart.
* **Reducers** : `handleCart.js` manages the shopping cart state.
* **Store** : Configured in `store.js` using `configureStore`.

## 5. Routing

Routing is handled using React Router (`BrowserRouter`):

* Routes defined in `App.js` include public routes (`/`, `/about`, `/contact`, `/login`, `/register, `) and private routes (`/profile`, `/checkout`, `/admin`, `/cart`).
* `PrivateRoute.jsx` ensures certain routes are accessible only to authenticated users.

## 6. Authentication

Authentication is managed via a custom `useUser` hook (`hooks.js`):

* Uses `useSWR` and Axios for fetching user data (`fetcher` function).
* Redirects users based on authentication status (`redirectTo` and `redirectIfFound` options).

## 7. API Integration

* Axios is used for making HTTP requests to the backend API (`localhost:5000`).
* Endpoints include `/user` for user data, `/register` for user registration, and `/orders` for fetching user-specific orders.



This README provides a high-level overview of the React application structure and functionality. Detailed documentation for each component, hook, and feature can be found within their respective files.
