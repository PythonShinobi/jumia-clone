// client/src/checkout/Checkout.jsx
import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Checkout.css";
import Navbar from "../navbar/Navbar";
import { clearCart } from "../redux/action";

const Checkout = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const cart = useSelector((state) => state.handleCart); // Get cart items from Redux store.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      firstName,
      lastName,
      email,
      address,
      city,
      postalCode,
      cartItems: cart.map((item) => ({  // Send all the orders in the cart in a single request.
        id: item.id,
        name: item.name,
        quantity: item.qty,
        price: item.price,
      })), // Add cart items
      // Add additional fields as needed for your backend
    };

    try {
      const checkoutUrl = "http://localhost:5000/checkout";
      // Send order data to backend API
      const response = await axios.post(checkoutUrl, orderData, { withCredentials: true });
      console.log("Order placed successfully:", response.data);

      if (response.status === 200) {
        dispatch(clearCart());  // Clear items from the cart when order has been placed.
        navigate("/"); // Navigate to home page.
      }    
    } catch (error) {
      console.error("Error placing order:", error);      
    }
  };

  return (
    <div className="checkout-container">
      <Navbar />
      <Container maxWidth="sm">
        <Card className="checkout-card" sx={{ mt: 5, p: 3 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Checkout
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    variant="outlined"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained" color="primary">
                    Place Order
                  </Button>
                </Grid>
                <Grid item xs={12} className="text-center mt-2">
                  <Typography variant="body2">
                    <Link to="/cart">Back to Cart</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Checkout;