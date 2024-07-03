// client/src/register/register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./register.css";
import { useUser } from "../redux/hooks.js";
import Navbar from "../navbar/Navbar";
import Form from "../components/Form";
import config from "../config";

const Register = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      if (body.password !== e.currentTarget.rpassword.value) {
        setError("The passwords don't match");
        return;
      }

      // Make a POST request to the /register route to the backend.
      const response = await axios.post(`${config.serverEndpoint}/register`, body, { withCredentials: true });

      if (response.status === 200) {
        // If registration is successful, set the success message.
        setSuccess(response.data.message);

        // Redirect to the login page after a short delay.
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        // If registration fails, throw an error with the response data.
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Handle specific error messages from backend.
      setError(error.response?.data?.message || error.message || "Unknown error occurred.");
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <Form isLogin={false} errorMessage={error} successMessage={success}  onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
