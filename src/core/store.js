// src/core/store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import authReducer from '../features/auth/presentation/redux/reducer';

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authReducer,
});

// Create and export the store
export const store = createStore(rootReducer, applyMiddleware(thunk));
