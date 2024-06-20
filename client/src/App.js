// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import "./App.css"
import store from './redux/store';
import AdminForm from './admin/AdminForm';
import ProductsPage from './product/ProductsPage';
import ProductDetailsPage from './product/ProductsDetailsPage';
import Home from './home/Home';
import About from './about/About';
import ContactPage from './contact/Contact';
import Cart from './cart/Cart';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;