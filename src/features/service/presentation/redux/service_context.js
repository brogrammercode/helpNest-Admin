import React, { createContext, useReducer, useContext } from 'react';
import {
    serviceReducer,
    setServices,
    addService,
    setLoading,
    setError,
    setStatus,
    clearServices,
} from '../state/serviceReducer';

const ServiceContext = createContext();

export const useService = () => {
    return useContext(ServiceContext);
};

export const ServiceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(serviceReducer, {
        status: 'initial', // 'initial', 'loading', 'failure', 'success'
        services: [], // Array of services
        error: null, // Error instance, if any
    });

    const value = {
        state,
        dispatch,
        setServices,
        addService,
        setLoading,
        setError,
        setStatus,
        clearServices,
    };

    return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
};
