import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const blog = axios.create({
  baseURL: 'https://blog.kata.academy/api/articles/',
});

export const getPosts = createAsyncThunk(
  'blog/getPosts',
  async (page) =>
    await blog
      .get(`?limit=5&offset=${(page - 1) * 5}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('token')}`,
        },
      })
      .then((response) => response.data)
);

export const getSlug = createAsyncThunk(
  'blog/getSlug',
  async (slug) =>
    await blog
      .get(slug, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        return response.data;
      })
);

export const postLike = createAsyncThunk(
  'blog/postLike',
  async (slug) =>
    await blog
      .post(
        `${slug}/favorite`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookies.get('token')}`,
          },
        }
      )
      .then((response) => response.data)
);

export const deleteLike = createAsyncThunk(
  'blog/deleteLike',
  async (slug) =>
    await blog
      .delete(`${slug}/favorite`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('token')}`,
        },
      })
      .then((response) => response.data)
);

export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (slug) =>
    await blog
      .delete(slug, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('token')}`,
        },
      })
      .then((response) => response.data)
);

const postSlice = createSlice({
  name: 'blog',
  initialState: {
    loading: false,
    posts: [],
    error: null,
    etc: {},
    post: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.etc = action.payload;
      state.posts = action.payload.articles;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.errors;
    });
    builder.addCase(getSlug.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSlug.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload.article;
    });
    builder.addCase(getSlug.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.errors;
    });
    builder.addCase(postLike.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postLike.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload.article;
    });
    builder.addCase(postLike.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action?.payload?.errors?.body || { body: 'Unauthorized' };
      } else {
        state.error = null;
      }
    });
    builder.addCase(deleteLike.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteLike.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload.article;
    });
    builder.addCase(deleteLike.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action?.payload?.errors?.body || { body: 'Unauthorized' };
      } else {
        state.error = null;
      }
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action?.payload?.errors?.body || { body: 'Unauthorized' };
      } else {
        state.error = null;
      }
    });
  },
});

export default postSlice.reducer;
