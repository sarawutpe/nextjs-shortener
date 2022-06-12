import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import linkReducer from './features/linkSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    link: linkReducer,
    devTools: process.env.NODE_ENV === 'development',
  },
});
