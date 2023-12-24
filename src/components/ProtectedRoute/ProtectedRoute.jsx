import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, isAuthenticated, ...props }) => (
  isAuthenticated ? <Element {...props} /> : <Navigate to="/" replace />
);
export default ProtectedRoute;
