// src/core/store.js
import { createStore, combineReducers } from 'redux';
import { authReducer } from '../features/auth/presentation/redux/reducer';
import { serviceReducer } from '../features/service/presentation/redux/reducer'; // Import serviceReducer

const rootReducer = combineReducers({
    auth: authReducer, 
    service: serviceReducer,
});

const store = createStore(rootReducer);

export default store;
