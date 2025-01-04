// src/core/store.js
import { createStore, combineReducers } from 'redux';
import { authReducer } from '../features/auth/presentation/redux/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
