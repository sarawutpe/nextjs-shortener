import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '@/utils/HttpClient';
import { store } from '@/redux/store';

const initialState = {
  addLinkState: {},
  getLinkState: [],
  updateLinkState: {},
  deleteLinkState: {},
  multiDeleteLinkState: {},
};

export const addLink = createAsyncThunk('link/addLink', async (payload) => {
  const { data } = await httpClient.post('/link', payload);
  if (data?.ok) {
    store.dispatch(getLink());
  }
  return data;
});

export const getLink = createAsyncThunk('link/getLink', async () => {
  const { data } = await httpClient.get('/link');
  return data;
});

export const getLinkStatistic = createAsyncThunk('link/getLinkStatistic', async (payload) => {
  const range = payload?.range;
  if (range) {
    const { data } = await httpClient.get(`/link/statistic/${range}`);
    return data;
  } else {
    const { data } = await httpClient.get('/link/statistic');
    return data;
  }
});

export const updateLink = createAsyncThunk('link/updateLink', async (payload) => {
  const id = payload.id;
  const { data } = await httpClient.put(`/link/${id}`, payload);
  if (data?.ok) {
    store.dispatch(getLink());
  }
  return data;
});

export const deleteLink = createAsyncThunk('link/deleteLink', async (payload) => {
  const id = payload.id;
  const { data } = await httpClient.delete(`/link/${id}`);
  return store.dispatch(getLink());
});

export const multiDeleteLink = createAsyncThunk('link/multiDeleteLink', async (payload) => {
  const { data } = await httpClient.put('/link/', payload);
  return store.dispatch(getLink());
});

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add link
    builder.addCase(addLink.fulfilled, (state, action) => {
      state.addLinkState = action.payload;
    });
    // get link
    builder.addCase(getLink.fulfilled, (state, action) => {
      state.getLinkState = action.payload;
    });
    // get link statistic
    builder.addCase(getLinkStatistic.fulfilled, (state, action) => {
      state.linkStatistic = action.payload;
    });
    // update link
    builder.addCase(updateLink.fulfilled, (state, action) => {
      state.updateLinkState = action.payload;
    });
    // delete link
    builder.addCase(deleteLink.fulfilled, (state, action) => {
      state.deleteLinkState = action.payload;
    });
    // multi delete link
    builder.addCase(multiDeleteLink.fulfilled, (state, action) => {
      state.multiDeleteLinkState = action.payload;
    });
  },
});

export default linkSlice.reducer;
