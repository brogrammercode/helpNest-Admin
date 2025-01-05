import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../features/auth/presentation/pages/auth_page';
import HomePage from '../features/home/presentation/pages/home_page';
import ServiceForm from '../features/service/presentation/pages/add_service_form_page';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const RouteNames = {
    AUTH_PAGE: '/auth',
    HOME_PAGE: '/home',
    SERVICE_FORM: "/service_form",
};

export const AppRoutes = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={user ? <Navigate to={RouteNames.HOME_PAGE} /> : <Navigate to={RouteNames.AUTH_PAGE} />}
                />
                <Route path={RouteNames.AUTH_PAGE} element={<AuthPage />} />
                <Route path={RouteNames.HOME_PAGE} element={<HomePage />} />
                <Route path={RouteNames.SERVICE_FORM} element={<ServiceForm />} />
            </Routes>
        </Router>
    );
};
