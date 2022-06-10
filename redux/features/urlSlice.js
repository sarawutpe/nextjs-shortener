import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import httpClient from '../../utils/HttpClient';
import { store } from '../store';


const initialState = {
  addUrl: {},
  urlList: [],
  urlStatistic: {},
  value: 0,
};

export const addUrl = createAsyncThunk('url/addUrl', async (payload) => {
  const { data } = await httpClient.post('/url', payload);
  store.dispatch(getLink());
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

export const updateUrl = createAsyncThunk('url/updateUrl', async (payload) => {
  const id = payload.id;
  const { data } = await httpClient.put(`/url/${id}`, payload);
  return store.dispatch(getLink());
});

export const deleteUrl = createAsyncThunk('url/deleteUrl', async (payload) => {
  const { data } = await httpClient.delete(`/url/${id}`);
  return store.dispatch(getLink());
});

export const multiDeleteUrl = createAsyncThunk('url/multiDeleteUrl', async (payload) => {
  const { data } = await httpClient.put('/url/', payload);
  return store.dispatch(getLink());
});

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fullfiled, pending, rejected
    builder.addCase(addUrl.fulfilled, (state, action) => {
      state.addUrl = action.payload;
    });

    // fullfiled, pending, rejected
    builder.addCase(getLink.fulfilled, (state, action) => {
      state.urlList = action.payload;
    });

    builder.addCase(getLink.pending, (state, action) => {
      state.urlList = 'pending';
    });

    builder.addCase(updateUrl.fulfilled, (state, action) => {

    });

    // pending

    // reject

    // fullfiled, pending, rejected
    builder.addCase(getLinkStatistic.fulfilled, (state, action) => {
      state.urlStatistic = action.payload;
    });
  },
});

export const { onTest } = urlSlice.actions;

export default urlSlice.reducer;
