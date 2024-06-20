// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css"
import AdminForm from './admin/AdminForm';
import ProductsPage from './product/ProductsPage';
import ProductDetailsPage from './product/ProductsDetailsPage';
import Home from './home/Home';
import About from './about/About';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminForm />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;