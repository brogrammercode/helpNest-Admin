const initialState = {
    status: 'initial', // 'initial', 'loading', 'failure', 'success'
    user: null,
    error: null, // Will hold an instance of ErrorModel
};

const actionTypes = {
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_STATUS: 'SET_STATUS',
    CLEAR_USER: 'CLEAR_USER',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return { ...state, user: action.payload, status: 'success', error: null };
        case actionTypes.SET_LOADING:
            return { ...state, status: 'loading', error: null };
        case actionTypes.SET_ERROR:
            return { ...state, status: 'failure', error: action.payload };
        case actionTypes.SET_STATUS:
            return { ...state, status: action.payload };
        case actionTypes.CLEAR_USER:
            return { ...state, user: null, status: 'initial', error: null };
        default:
            return state;
    }
};

export const setUser = (user) => ({ type: actionTypes.SET_USER, payload: user });
export const setLoading = () => ({ type: actionTypes.SET_LOADING });
export const setError = (error) => ({ type: actionTypes.SET_ERROR, payload: error });
export const setStatus = (status) => ({ type: actionTypes.SET_STATUS, payload: status });
export const clearUser = () => ({ type: actionTypes.CLEAR_USER });
