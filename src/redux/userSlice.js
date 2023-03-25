import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const user = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
});

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ username, email, password }) =>
    await user.post('users', { user: { username, email, password } }).then((response) => response.data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) =>
    await user
      .post(
        'users/login',
        { user: { email, password } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookies.get('token')}`,
          },
        }
      )
      .then((response) => response.data)
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () =>
    await user
      .get('user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('token')}`,
        },
      })
      .then((response) => response.data)
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ username, email, password, image }) =>
    await user
      .put(
        'user',
        { user: { username, email, password, image } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookies.get('token')}`,
          },
        }
      )
      .then((response) => response.data)
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    onLogOut(state) {
      state.user = null;
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      !state.loading;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      !state.loading;
      state.error = action.payload.error;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      !state.loading;
      state.user = action.payload.user;
      Cookies.set('token', `${action.payload.user.token}`);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      !state.loading;
      state.user = null;
      if (action.payload) {
        state.error = action?.payload?.errors?.body || { body: 'Unauthorized' };
      } else {
        state.error = null;
      }
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      !state.loading;
      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      !state.loading;
      state.user = null;
      if (action.payload) {
        state.error = action?.payload?.errors?.body || { body: 'Unauthorized' };
      } else {
        state.error = null;
      }
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      !state.loading;
      state.user = action.payload.user;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      !state.loading;
      if (action.payload) {
        state.error = action?.payload?.errors?.body || { body: 'Unauthorized' };
      } else {
        state.error = null;
      }
    });
  },
});

export const { onLogOut } = userSlice.actions;

export default userSlice.reducer;
