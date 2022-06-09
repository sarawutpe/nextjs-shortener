import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import urlReducer from './features/urlSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    url: urlReducer,
    devTools: process.env.NODE_ENV === 'development',
  },
});

