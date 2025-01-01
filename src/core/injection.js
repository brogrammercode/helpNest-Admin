// src/core/injections.js
import React, { createContext, useContext } from 'react';
import AuthRepo from '../features/auth/domain/repo/auth_repo';
import { signInWithGoogle } from '../features/auth/presentation/redux/actions';
import { useDispatch } from 'react-redux';

// Create context to hold dependencies
const InjectionsContext = createContext(null);

// Class for managing dependencies
class Injections {
    static authRepo = new AuthRepo();
    static signInWithGoogleAction(dispatch) {
        return () => dispatch(signInWithGoogle());
    }
}

// Provider to inject dependencies into the component tree
export const InjectionsProvider = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <InjectionsContext.Provider value={{
            authRepo: Injections.authRepo,
            signInWithGoogleAction: Injections.signInWithGoogleAction(dispatch)
        }}>
            {children}
        </InjectionsContext.Provider>
    );
};

// Custom hook to access dependencies
export const useInjections = () => {
    return useContext(InjectionsContext);
};

// Export Injections class
export { Injections };
