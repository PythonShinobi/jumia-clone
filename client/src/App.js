// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css"
import AdminForm from './admin/AdminForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/admin" element={<AdminForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;