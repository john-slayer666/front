import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {  
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => axios.delete(`/posts/${id}`)
  
);


const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
}
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  extraReducers: {
    // posts with
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]:(state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
      state.posts.error = "Статья не может быть пустой";
    },


    // tags are
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    // delete post from
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },  
  },
});

export const postReducer = postSlice.reducer;