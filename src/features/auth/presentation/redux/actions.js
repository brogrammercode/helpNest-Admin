// src/features/auth/presentation/redux/actions.js
import { SIGN_IN_GOOGLE, SIGN_IN_GOOGLE_SUCCESS, SIGN_IN_GOOGLE_FAILURE } from './action_types';

export const signInWithGoogle = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SIGN_IN_GOOGLE });

        const { authRepo } = getState().auth;
        if (!authRepo || typeof authRepo.signInWithGoogle !== 'function') {
            throw new Error('authRepo or signInWithGoogle is not defined');
        }

        await authRepo.signInWithGoogle();
        dispatch({ type: SIGN_IN_GOOGLE_SUCCESS });
    } catch (error) {
        dispatch({
            type: SIGN_IN_GOOGLE_FAILURE,
            payload: error.message,
        });
    }
};