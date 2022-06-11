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
// export const addUrl = createAsyncThunk('url/addUrl', async (payload) => {
//   const { data } = await httpClient.post('/url', payload);
//   if (data?.ok) {
//     store.dispatch(getUrl());
//   }
//   return data;
// });

// export const getUrl = createAsyncThunk('url/getUrl', async () => {
//   const { data } = await httpClient.get('/url');
//   return data;
// });

// export const getUrlStatistic = createAsyncThunk('url/getUrlStatistic', async () => {
//   const { data } = await httpClient.get('/url/statistic');
//   return data;
// });

// export const updateUrl = createAsyncThunk('url/updateUrl', async (payload) => {
//   const id = payload.id;
//   const { data } = await httpClient.put(`/url/${id}`, payload);
//   return store.dispatch(getUrl());
// });

// export const deleteUrl = createAsyncThunk('url/deleteUrl', async (payload) => {
//   const id = payload.id;
//   const { data } = await httpClient.delete(`/url/${id}`);
//   return store.dispatch(getUrl());
// });

// export const multiDeleteUrl = createAsyncThunk('url/multiDeleteUrl', async (payload) => {
//   const { data } = await httpClient.put('/url/', payload);
//   return store.dispatch(getUrl());
// });

export const userSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user | fullfiled
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.getUserState = action.payload;
    });

    // // add url | fullfiled
    // builder.addCase(addUrl.fulfilled, (state, action) => {
    //   state.addUrlState = action.payload;
    // });
    // // get url | fullfiled
    // builder.addCase(getUrl.fulfilled, (state, action) => {
    //   state.getUrlState = action.payload;
    // });
    // // get url statistic | fullfiled
    // builder.addCase(getUrlStatistic.fulfilled, (state, action) => {
    //   state.urlStatistic = action.payload;
    // });
    // // update url | fullfiled
    // builder.addCase(updateUrl.fulfilled, (state, action) => {
    //   state.updateUrlState = action.payload;
    // });
    // // delete url | fullfiled
    // builder.addCase(deleteUrl.fulfilled, (state, action) => {
    //   state.deleteUrlState = action.payload;
    // });
    // // multi delete url | fullfiled
    // builder.addCase(multiDeleteUrl.fulfilled, (state, action) => {
    //   state.multiDeleteUrlState = action.payload;
    // });
  },
});

export default userSlice.reducer;