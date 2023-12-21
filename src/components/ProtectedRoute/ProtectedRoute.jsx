import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...props }) => (
  props.isAuthenticated ? <Element {...props}/> : <Navigate to="/signin" replace/>
);

export default ProtectedRoute;
