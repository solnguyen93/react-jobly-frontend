import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProtectedRoute = () => {
    const { user } = useContext(UserContext);
    return user ? <Outlet /> : <Navigate to="/login" />;
};

const AdminProtectedRoute = () => {
    const { user } = useContext(UserContext);
    return user && user.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

const AuthenticatedRoute = () => {
    const { user } = useContext(UserContext);
    return user ? <Navigate to="/" /> : <Outlet />;
};

export { ProtectedRoute, AdminProtectedRoute, AuthenticatedRoute };
