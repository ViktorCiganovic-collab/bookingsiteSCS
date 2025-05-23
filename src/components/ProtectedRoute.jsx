
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ requiredRole }) => {

    const { isAuthenticated, role } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && role != requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />
}



export default ProtectedRoute;