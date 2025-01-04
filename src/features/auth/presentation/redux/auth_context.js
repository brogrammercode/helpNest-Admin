// src/features/auth/context/AuthContext.js

import React, { createContext, useReducer, useContext } from 'react';
import { authReducer, setUser, setLoading, setError, setStatus, clearUser } from '../redux/reducer';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        status: 'initial', // 'initial', 'loading', 'failure', 'success'
        user: null,
        error: null,
    });

    const value = {
        state,
        dispatch,
        setUser,
        setLoading,
        setError,
        setStatus,
        clearUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
