import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '@/utils/HttpClient';
import { store } from '@/redux/store';

const initialState = {
  addUrlState: {},
  getUrlState: [],
};

export const addUrl = createAsyncThunk('url/addUrl', async (payload) => {
  const { data } = await httpClient.post('/url', payload);
  if (data?.ok) {
    store.dispatch(getUrl());
  }
  return data;
});

export const getUrl = createAsyncThunk('url/getUrl', async () => {
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
  return store.dispatch(getUrl());
});

export const deleteUrl = createAsyncThunk('url/deleteUrl', async (payload) => {
  const id = payload.id;
  const { data } = await httpClient.delete(`/url/${id}`);
  return store.dispatch(getUrl());
});

export const multiDeleteUrl = createAsyncThunk('url/multiDeleteUrl', async (payload) => {
  const { data } = await httpClient.put('/url/', payload);
  return store.dispatch(getUrl());
});

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // addUrl | fullfiled
    builder.addCase(addUrl.fulfilled, (state, action) => {
      state.addUrlState = action.payload;
    });
    // addUrl | pending
    builder.addCase(addUrl.pending, (state, action) => {
      state.addUrlState = 'pending';
    });
    // addUrl | rejected
    builder.addCase(addUrl.rejected, (state, action) => {
      state.addUrlState = 'rejected';
    });

    // getUrl | fullfiled
    builder.addCase(getUrl.fulfilled, (state, action) => {
      state.getUrlState = action.payload;
    });
    // getUrl | pending
    builder.addCase(getUrl.pending, (state, action) => {
      state.getUrlState = 'pending';
    });
    // getUrl | rejected
    builder.addCase(getUrl.rejected, (state, action) => {
      state.getUrlState = 'rejected';
    });

    // getUrl | rejected

    // fullfiled, pending, rejected

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
