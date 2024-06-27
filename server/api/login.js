// server/api/login.js
import { Router } from "express";
import passport from 'passport';

import { localStrategy } from './auth/password-local.js';
import { setLoginSession } from './auth/auth.js';
import setAdmin from "./middleware/setAdmin.js";

const router = Router();

// Register the local authentication strategy with Passport.
// This tells Passport how to authenticate users using a username and password 
// stored locally (e.g., in a database).
passport.use(localStrategy);

/**
 * Helper function to handle Passport authentication and return a Promise.
 *
 * @param {string} strategy - The name of the Passport strategy to use.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} A promise that resolves with the authenticated user object.
 */
const authenticate = (strategy, req, res) =>
  new Promise((resolve, reject) => {
    // Use Passport to authenticate with the specified method (strategy).
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      // If there's an error or the user is not authenticated, reject the promise with the specific error message.
      if (error || !user) {
        reject(info.message || 'Authentication Failed.');
      } else {
        // If authentication is successful, resolve the promise with the user object.
        resolve(user);
      }
    })(req, res); // Invoke the Passport authentication method with the request and response objects.
  });

// Define a POST request handler for the /login endpoint.
router.post('/login', async (req, res) => {  
  try {    
    // Attempt to authenticate the user using the local strategy.
    const user = await authenticate('local', req, res);        

    const updatedUser = await setAdmin(user);    

    // Create a session object with user information.
    const session = { ...updatedUser };    
    // console.log(session);

    // Set the login session using a custom function (likely setting a cookie or JWT)
    await setLoginSession(res, session);
    

    // Send a success response indicating the login was successful
    res.status(200).send("Login successful");
  } catch (error) {
    // Log any errors that occur during authentication or session setup
    console.error(error);

    // Send an unauthorized response with the error message
    res.status(401).json({ message: error });
  }
});

export default router;