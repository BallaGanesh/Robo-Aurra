import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------------
// CREATE POST API
// ------------------------------
export const postArticle = createAsyncThunk(
  "articles/create",   
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://robo-1-qqhu.onrender.com/api/articles",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

// ------------------------------
// GET ALL POSTS API
// ------------------------------
export const getAllPosts = createAsyncThunk(
  "articles/getAll",  
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://robo-1-qqhu.onrender.com/api/articles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load posts"
      );
    }
  }
);

// ------------------------------
// SLICE
// ------------------------------
const articleSlice = createSlice({
  name: "articles",
  initialState: {
    loading: false,
    success: false,
    error: null,
    createdPost: null,
    posts: [],
  },
  reducers: {
    logoutArticlesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.createdPost = null;
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE POST
      .addCase(postArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(postArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdPost = action.payload;
        state.posts.unshift(action.payload);
      })
      .addCase(postArticle.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // GET ALL POSTS
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { logoutArticlesState } = articleSlice.actions;
export default articleSlice.reducer;


