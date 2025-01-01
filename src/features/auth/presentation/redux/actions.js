import { SIGN_IN_GOOGLE, SIGN_IN_GOOGLE_FAILURE, SIGN_IN_GOOGLE_SUCCESS } from './action_types';

export const signInWithGoogle = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SIGN_IN_GOOGLE });
        await getState().auth.authRepo.signInWithGoogle();
        dispatch({ type: SIGN_IN_GOOGLE_SUCCESS });
    } catch (error) {
        dispatch({
            type: SIGN_IN_GOOGLE_FAILURE,
            payload: error.message,
        });
    }
};
