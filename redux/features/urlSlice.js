import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import httpClient from '../../utils/HttpClient';

const initialState = {
  urlList: [],
  addUrl: {},
  urlStatistic: {},
  value: 0,
};

export const addUrl = createAsyncThunk('url/addUrl', async (payload) => {
  const { data } = await httpClient.post('/url', payload);
  return data;
});

export const getLink = createAsyncThunk('url/getLink', async () => {
  const { data } = await httpClient.get('/url');
  return data;
});

export const getLinkStatistic = createAsyncThunk('url/getLinkStatistic', async () => {
  const { data } = await httpClient.get('/url/statistic');
  return data;
});

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // fullfiled, pending, rejected
    builder.addCase(getLink.fulfilled, (state, action) => {
      state.urlList = action.payload;
    });

    // fullfiled, pending, rejected
    builder.addCase(addUrl.fulfilled, (state, action) => {
      state.addUrl = action.payload;
    });

    // fullfiled, pending, rejected
    builder.addCase(getLinkStatistic.fulfilled, (state, action) => {
      state.urlStatistic = action.payload;
    });
  },
});

export const { onTest } = urlSlice.actions;

export default urlSlice.reducer;
