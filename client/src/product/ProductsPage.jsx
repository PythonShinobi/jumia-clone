// client/src/product/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

import Navbar from "../navbar/Navbar";

const ProductsPage = () => {
  // State variables to manage products, filter, loading status, and original products.
  const [products, setProducts] = useState([]); // State to store products fetched from the API.
  const [filter, setFilter] = useState("All"); // State to store the current filter category.
  const [loading, setLoading] = useState(true); // State to manage loading status.
  const [originalProducts, setOriginalProducts] = useState([]); // State to store the original list of products.

  // useEffect hook to fetch products from the API when the component mounts.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from the API.
        const response = await axios.get('http://192.168.0.17:5000/products');
        // Update state with fetched products and original products.
        setProducts(response.data);        
        setOriginalProducts(response.data);
        // Set loading state to false after fetching products.
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Set loading state to false if there's an error fetching products.
        setLoading(false);
      }
    };
    // Call fetchProducts function when the component mounts.
    fetchProducts();
  }, []);

  // Function to filter products based on the selected category.
  const filterProducts = (category) => {
    // Update the filter state.
    setFilter(category);
    // Filter products based on the selected category.
    if (category === "All") {
      // If the category is "All", set products to the original list of products.
      setProducts(originalProducts);
    } else {
      // Otherwise, filter the original products based on the selected category.
      const filtered = originalProducts.filter(product => product.category === category);
      // Update products state with the filtered list.
      setProducts(filtered);
    }
  };
  // JSX rendering
  return (
    <div className="products-container">
      <Navbar />
      <Container>    
        {/* Filter buttons */}
        <div style={{ marginBottom: '20px' }}>
          <Button onClick={() => filterProducts("All")} variant={filter === "All" ? "contained" : "outlined"}>All</Button>
          <Button onClick={() => filterProducts("hoodies")} variant={filter === "hoodies" ? "contained" : "outlined"}>Hoodies</Button>
          <Button onClick={() => filterProducts("light lamp")} variant={filter === "light lamp" ? "contained" : "outlined"}>Light Lamps</Button>
          <Button onClick={() => filterProducts("accessories")} variant={filter === "accessories" ? "contained" : "outlined"}>Accessories</Button>
          {/* You can add more categories dynamically */}
        </div>
        {/* Grid to display products */}
        <Grid container spacing={4}>
          {loading
            // If loading, display skeleton loaders
            ? Array(4)
                .fill()
                .map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <Skeleton height={140} />
                      <CardContent>
                        <Skeleton count={3} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
            // If not loading, display products
            : products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card>
                    {/* Product image */}
                    <CardMedia
                      component="img"
                      height="350"
                      image={`http://192.168.0.17:5000/uploads/${product.image}`}
                      alt={product.name}
                      style={{ objectFit: 'cover', width: '100%' }}
                    />
                    {/* Product details */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name.substring(0, 23)}...
                      </Typography>                    
                      {/* Action buttons */}
                      <div className="d-flex justify-content-between mt-2">
                        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                          <Button variant="contained" color="primary">
                            Buy Now
                          </Button>
                        </Link>
                        <Button variant="outlined" color="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductsPage;