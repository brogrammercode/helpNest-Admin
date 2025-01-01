// src/features/auth/redux/reducer.js
import { SIGN_IN_GOOGLE, SIGN_IN_GOOGLE_SUCCESS, SIGN_IN_GOOGLE_FAILURE } from './action_types';

const initialState = {
    user: null,
    status: 'idle', // idle, loading, success, failure
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_GOOGLE:
            return { ...state, status: 'loading' };
        case SIGN_IN_GOOGLE_SUCCESS:
            return { ...state, status: 'success', user: action.payload };
        case SIGN_IN_GOOGLE_FAILURE:
            return { ...state, status: 'failure', error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
