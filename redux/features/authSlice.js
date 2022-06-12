import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '@/utils/HttpClient';
import fetchJson from '@/hoc/fetchJson';

const initialState = {
  value: 0,
};

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await httpClient.post('/auth/login', payload);
  if (data.ok) {
    const auth = await fetchJson('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (auth.ok) {
      const page = '/admin';
      window.location.href = page;
    }
  }
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
