import React from "react";
import { Route, Navigate } from "react-router-dom";

// PrivateRoute to protect routes that require login
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is authenticated
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;

