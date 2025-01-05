import { StateError } from '../../../../core/error';

const initialState = {
    status: 'initial', // 'initial', 'loading', 'failure', 'success'
    services: [],
    error: null,
};

const actionTypes = {
    SET_SERVICES: 'SET_SERVICES',
    ADD_SERVICE: 'ADD_SERVICE',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_STATUS: 'SET_STATUS',
    CLEAR_SERVICES: 'CLEAR_SERVICES',
};

export const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SERVICES:
            return { ...state, services: action.payload, status: 'success', error: null };
        case actionTypes.ADD_SERVICE:
            return { ...state, services: [...state.services, action.payload], status: 'success', error: null };
        case actionTypes.SET_LOADING:
            return { ...state, status: 'loading', error: null };
        case actionTypes.SET_ERROR:
            return { ...state, status: 'failure', error: action.payload };
        case actionTypes.SET_STATUS:
            return { ...state, status: action.payload };
        case actionTypes.CLEAR_SERVICES:
            return { ...state, services: [], status: 'initial', error: null };
        default:
            return state;
    }
};

// Action Creators
export const setServices = (services) => ({ type: actionTypes.SET_SERVICES, payload: services });
export const addService = (service) => ({ type: actionTypes.ADD_SERVICE, payload: service });
export const setLoading = () => ({ type: actionTypes.SET_LOADING });
export const setError = (error) => ({ type: actionTypes.SET_ERROR, payload: error });
export const setStatus = (status) => ({ type: actionTypes.SET_STATUS, payload: status });
export const clearServices = () => ({ type: actionTypes.CLEAR_SERVICES });
