import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../features/auth/presentation/pages/auth_page';
import HomePage from '../features/home/presentation/pages/home_page';
import { useSelector } from 'react-redux'; // Redux selector to get authentication state

export const AppRoutes = () => {
    // Accessing the current authentication state from Redux store
    const { status, error, user } = useSelector((state) => state.auth); // Adjust based on your Redux state

    return (
        <Router>
            <Routes>
                {/* If user is authenticated, redirect to HomePage, otherwise to AuthPage */}
                <Route
                    path="/"
                    element={user ? <HomePage /> : <Navigate to="/authPage" />}
                />
                <Route path="/authPage" element={<AuthPage />} />
                <Route
                    path="/home"
                    element={user ? <HomePage /> : <Navigate to="/authPage" />}
                />
            </Routes>
        </Router>
    );
};
