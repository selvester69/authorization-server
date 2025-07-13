import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import NotFound from './pages/NotFound.jsx';

// Simple auth check (replace with real auth logic as needed)
function isAuthenticated() {
    return !!localStorage.getItem('token'); // or use your auth context/provider
}

// AuthGuard component
function AuthGuard({ children }) {
    const location = useLocation();
    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected routes example */}
            <Route
                path="/"
                element={
                    <AuthGuard>
                        {/* Replace with your protected home/dashboard component */}
                        <div>Home (Protected)</div>
                    </AuthGuard>
                }
            />
            {/* Add more protected routes here using <AuthGuard> */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}

export default AppRoutes;