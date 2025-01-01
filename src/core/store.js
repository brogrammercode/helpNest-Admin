// src/store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../features/auth/presentation/redux/reducer';

const store = createStore(authReducer, applyMiddleware(thunk));

export default store;