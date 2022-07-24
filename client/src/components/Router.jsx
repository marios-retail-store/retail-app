import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import App from './App.jsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/products/:productId"
          element={<App />}
        />
        <Route
          path="*"
          element={<Navigate to="/products/40344" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
