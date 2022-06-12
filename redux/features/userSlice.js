import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '@/utils/HttpClient';
import { store } from '@/redux/store';

const initialState = {
  getUserState: {},
  updateUserState: {}
};

export const getUser = createAsyncThunk('user/getUser', async (payload) => {
  const id = payload.id;
  const { data } = await httpClient.get(`/user/${id}`);
  return data;
});

export const updateUser = createAsyncThunk('user/updateUser', async (payload) => {
  const id = payload.id;
  const { data } = await httpClient.put(`/user/${id}`, payload);
  return data;
});

export const updatePassword = createAsyncThunk('user/updatePassword', async (payload) => {
  const id = payload.id;
  const { data } = await httpClient.put(`/user/password/${id}`, payload);
  return data;
})

export const userSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.getUserState = action.payload;
    });
  },
});

export default userSlice.reducer;
