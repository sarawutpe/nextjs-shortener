import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '@/utils/HttpClient';

const initialState = {
  getUserState: {},
  updateUserState: {},
  updatePasswordState: {},
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
});

export const userSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.getUserState = action.payload;
    });
    // update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUserState = action.payload;
    });
    // update password
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.updatePasswordState = action.payload;
    });
  },
});

export default userSlice.reducer;
