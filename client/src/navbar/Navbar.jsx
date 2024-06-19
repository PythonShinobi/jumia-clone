// client/src/navbar/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Container } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import "./Navbar.css";

const Navbar = () => {
  const cartItemsCount = 0;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem component={NavLink} to="/">
          <ListItemText primaryTypographyProps={{ sx: { color: 'white' } }} primary="Home" />
        </ListItem>
        <ListItem component={NavLink} to="/products">
          <ListItemText primaryTypographyProps={{ sx: { color: 'white' } }} primary="Products" />
        </ListItem>
        <ListItem component={NavLink} to="/about">
          <ListItemText primaryTypographyProps={{ sx: { color: 'white' } }} primary="About" />
        </ListItem>
        <ListItem component={NavLink} to="/contact">
          <ListItemText primaryTypographyProps={{ sx: { color: 'white' } }} primary="Contact" />
        </ListItem>
        <ListItem component={NavLink} to="/login">
          <PersonIcon sx={{ mr: 1, color: "white" }} />
          <ListItemText primaryTypographyProps={{ sx: { color: 'white' } }} primary="Login" />
        </ListItem>
        <ListItem component={NavLink} to="/register">
          <PersonAddIcon sx={{ mr: 1, color: "white" }} />
          <ListItemText primaryTypographyProps={{ sx: { color: 'white' } }} primary="Register" />
        </ListItem>
        <ListItem component={NavLink} to="/cart">
          <ShoppingCartIcon sx={{ mr: 1, color: "white" }} />
          <ListItemText primaryTypographyProps={{ sx: { color: 'white' } }} primary={`Cart (${cartItemsCount})`} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" className="navbar">
      <Container>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Jumia-Clone
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component={NavLink} to="/" color="inherit" activeClassName="active">
              Home
            </Button>
            <Button component={NavLink} to="/products" color="inherit" activeClassName="active">
              Products
            </Button>
            <Button component={NavLink} to="/about" color="inherit" activeClassName="active">
              About
            </Button>
            <Button component={NavLink} to="/contact" color="inherit" activeClassName="active">
              Contact
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button component={NavLink} to="/login" color="inherit" sx={{ m: 1 }} activeClassName="active">
              <PersonIcon sx={{ mr: 1, color: "white" }} />
              Login
            </Button>
            <Button component={NavLink} to="/register" color="inherit" sx={{ m: 1 }} activeClassName="active">
              <PersonAddIcon sx={{ mr: 1, color: "white" }} />
              Register
            </Button>
            <Button component={NavLink} to="/cart" color="inherit" sx={{ m: 1 }} activeClassName="active">
              <ShoppingCartIcon sx={{ mr: 1, color: "white" }} />
              Cart ({cartItemsCount})
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawerItems}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;