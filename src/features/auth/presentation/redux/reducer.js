// src/features/auth/presentation/redux/reducer.js
import authRepo from '../../domain/repo/auth_repo';

const initialState = {
    authRepo, // Inject authRepo into the state
    status: 'idle', // 'idle', 'loading', 'success', 'failure'
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN_GOOGLE':
            return { ...state, status: 'loading' };
        case 'SIGN_IN_GOOGLE_SUCCESS':
            return { ...state, status: 'success' };
        case 'SIGN_IN_GOOGLE_FAILURE':
            return { ...state, status: 'failure', error: action.payload };
        default:
            return state;
    }
};

export default authReducer;