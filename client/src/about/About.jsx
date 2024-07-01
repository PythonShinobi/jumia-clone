// client/src/about/About.jsx
import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Paper, Avatar } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import "./about.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const About = () => {
  return (
    <div className="about-container">
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>About Us</Typography>
        <hr />
        <Typography variant="body1" paragraph>
          Welcome to our website! We are dedicated to providing high-quality products and excellent customer service.
          Here, you'll find a wide range of products to meet your needs, from electronics to fashion and beyond.
          Explore our collections and shop with confidence. We aim to make your shopping experience enjoyable and convenient.
        </Typography>
        <Typography variant="body1" paragraph>
          Our commitment is to deliver products that exceed your expectations. With fast shipping and easy returns,
          we ensure that every purchase is a seamless experience. Whether you're looking for the latest tech gadgets
          or trendy fashion items, we've got you covered.
        </Typography>

        <Typography
          variant="h3"
          gutterBottom
          className="products-section"
          style={{ marginTop: '50px', marginBottom: '30px' }}
        >
          Our Products
        </Typography>        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Hoodies"
                height="300"
                image="http://192.168.0.17:5000/uploads/image-1718700238.jpeg"
                title="Hoodies"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Hoodies
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Light Lamps"
                height="300"
                image="http://192.168.0.17:5000/uploads/image-1718697211.jpeg"
                title="Light Lamps"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Light Lamps
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Accessories"
                height="300"
                image="http://192.168.0.17:5000/uploads/image-1718699719.jpeg"
                title="Accessories"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Accessories
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Shoes"
                height="300"
                image="http://192.168.0.17:5000/uploads/image-1718864281.jpeg"
                title="Shoes"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Shoes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Shoes"
                height="300"
                image="http://192.168.0.17:5000/uploads/image-1718865948.jpeg"
                title="Shoes"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Cosplay
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Shoes"
                height="300"
                image="http://192.168.0.17:5000/uploads/image-1718867958.jpeg"
                title="Shoes"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  T-Shirts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Testimonials Section */}
        <Typography variant="h3" gutterBottom style={{ marginTop: '50px', marginBottom: '30px' }}>Testimonials</Typography>        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" paragraph>This is the best shopping experience I've ever had!</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Jane Smith</Typography>
              <Typography variant="body2" paragraph>Amazing products and fast delivery. Highly recommend!</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Michael Johnson</Typography>
              <Typography variant="body2" paragraph>Great customer service and fantastic quality.</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Team Section */}
        <Typography variant="h3" gutterBottom style={{ marginTop: '50px', marginBottom: '30px' }}>Our Team</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Avatar alt="Team Member" src="http://192.168.0.17:5000/uploads/alice-brown.jpg" style={{ margin: 'auto', width: '100px', height: '100px' }} />
              <Typography variant="h6">Alice Brown</Typography>
              <Typography variant="body2">CEO & Founder</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Avatar alt="Team Member" src="http://192.168.0.17:5000/uploads/david-green.jpg" style={{ margin: 'auto', width: '100px', height: '100px' }} />
              <Typography variant="h6">David Green</Typography>
              <Typography variant="body2">Head of Marketing</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Avatar alt="Team Member" src="http://192.168.0.17:5000/uploads/emma-white.jpeg" style={{ margin: 'auto', width: '100px', height: '100px' }} />
              <Typography variant="h6">Emma White</Typography>
              <Typography variant="body2">Lead Developer</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Contact Section */}
        <Typography variant="h3" gutterBottom style={{ marginTop: '50px', marginBottom: '30px' }}>Contact Us</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Email />
              <Typography variant="h6">Email</Typography>
              <Typography variant="body2">info@example.com</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Phone />
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body2">+123 456 7890</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <LocationOn />
              <Typography variant="h6">Address</Typography>
              <Typography variant="body2">123 Main Street, City, Country</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default About;