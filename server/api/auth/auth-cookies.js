// server/api/auth/auth-cookies.js

// This file manages operations related to HTTP cookies used for authentication tokens.

import { serialize, parse } from "cookie";  // Import the serialize and parse functions from the "cookie" library.

// Define the name of the token cookie.
const TOKEN_NAME = "login-token";

// Define the maximum age of the token in seconds (60 days).
export const MAX_AGE = 60 * 60 * 24 * 60;

/**
 * Sets a token cookie in the response header with specified options.
 * @param {object} res - The response object to set the cookie header.
 * @param {string} token - The token value to be set as the cookie.
 * @returns {void} Sets the token cookie in the response header.
 */
export const setTokenCookie = (res, token) => {
  // Create a cookie string with specified options and set it in the response header.
  const cookie = serialize(TOKEN_NAME, token, {
    domain: '.vercel.app', // Shared domain for both subdomains
    maxAge: MAX_AGE, // Cookie expiration time in seconds.
    expires: new Date(Date.now() + MAX_AGE * 1000), // Exact expiration date.
    httpOnly: true,
    secure: true,  // Only if using HTTPS
    path: "/", // Path where the cookie is accessible.
    same_site: "none",
  });

  console.log('Setting cookie:', cookie);

  // Set the cookie header in the response.
  res.setHeader("Set-Cookie", cookie);
}

/**
 * Removes the token cookie by setting an expired cookie in the response header.
 * @param {object} res - The response object to remove the cookie header.
 * @returns {void} Sets an expired cookie in the response header to remove the token cookie.
 */
export const removeTokenCookie = (res) => {
  // Create a cookie string that immediately expires.
  const cookie = serialize(TOKEN_NAME, "", {
    domain: ".vercel.app", // Match the domain used in setTokenCookie
    maxAge: -1, // Set maxAge to -1 to delete the cookie.
    path: "/", // Path where the cookie was accessible.
  });

  // Set the cookie header in the response to remove the cookie.
  res.setHeader("Set-Cookie", cookie);
}

/**
 * Parses cookies from the request object, prioritizing cookies directly available in req.cookies.
 * Falls back to parsing cookies from the request headers if req.cookies is unavailable.
 * @param {object} req - The request object containing cookies or cookie headers.
 * @returns {object} An object containing parsed cookies.
 */
export const parseCookies = (req) => {
  console.log('Cookies in request:', req.cookies);
  if (req.cookies) {
    return req.cookies;
  } else {
    console.log("No cookies parsed.")
  }

  // Otherwise, parse the cookies from the request headers.
  const cookie = req.headers?.cookie;
  // console.log('Cookie header:', cookie);

  return parse(cookie || req.cookies);
}

/**
 * Retrieves the token cookie value from the request cookies.
 * @param {object} req - The request object containing cookies.
 * @returns {string|null} The token cookie value if found, otherwise null.
 */
export const getTokenCookie = (req) => {
  const cookies = parseCookies(req);
  // console.log('Parsed cookies:', cookies);
  
  // Return the token cookie.
  return cookies[TOKEN_NAME];
}