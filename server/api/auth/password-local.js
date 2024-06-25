// server/api/auth/passport-local.js

// In the `password-local.js` file, the strategy is created and takes care of finding a user based off of 
// their username and validating their password. If a user object is found it will be returned via the 
// `done callback`. If not, an error will be thrown.

import Local from "passport-local";
import bcrypt from "bcrypt";

import { findUser } from "./user.js";

// Define and export the local strategy for Passport authentication.
export const localStrategy = new Local.Strategy(async (username, password, done) => {
  try {
    const user = await findUser({ username });
    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: "Invalid password" });
    }

    // If authentication is successful, return the user object via done.
    return done(null, user);
  } catch (error) {
    // If an error occurs, pass it to done
    return done(error);
  }
});