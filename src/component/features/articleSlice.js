import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://robo-zv8u.onrender.com/api/articles";

// ------------------------------
// CREATE POST API
// ------------------------------
export const postArticle = createAsyncThunk(
  "articles/create",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(API, formData, {
        headers: {
           "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load posts"
      );
    }
  }
);

// ------------------------------
// LIKE / UNLIKE
// ------------------------------
export const toggleLike = createAsyncThunk(
  "articles/toggleLike",
  async (articleId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/${articleId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Backend does NOT return updated article → force refresh
      thunkAPI.dispatch(getAllPosts());

      return { articleId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to toggle like"
      );
    }
  }
);

// ------------------------------
// ADD COMMENT API
// ------------------------------
export const addComment = createAsyncThunk(
  "articles/addComment",
  async ({ articleId, text }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API}/${articleId}/comment`,
        { text }, // Correct backend structure!
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { articleId, comment: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add comment"
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
      })

      // LIKE POST
      .addCase(toggleLike.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ADD COMMENT
      .addCase(addComment.fulfilled, (state, action) => {
        const { articleId, comment } = action.payload;

        const post = state.posts.find((p) => p._id === articleId);

        if (post) {
          if (!Array.isArray(post.comments)) post.comments = [];
          post.comments.push(comment);
        }
      });
  },
});

export const { logoutArticlesState } = articleSlice.actions;
export default articleSlice.reducer;
