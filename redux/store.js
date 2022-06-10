import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import authReducer from './features/authSlice';
import urlReducer from './features/urlSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    url: urlReducer,
    devTools: false,
    // devTools: process.env.NODE_ENV === 'development',
  },
});
