import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import urlReducer from './features/urlSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    counter: counterReducer,
    url: urlReducer,
    devTools: process.env.NODE_ENV === 'development',
  },
});
