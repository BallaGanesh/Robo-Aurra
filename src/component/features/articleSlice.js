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
// --------------------------
// LIKE API
// --------------------------
export const toggleLike = createAsyncThunk(
  "articles/toggleLike",
  async (articleId, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const response = await axios.put(
        `https://robo-1-qqhu.onrender.com/api/articles/${articleId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // expected response.data = updated article or { likeCount, likedBy }
      return { articleId, data: response.data };
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
        `https://robo-1-qqhu.onrender.com/api/articles/${articleId}/comment`,
        { text: commentText }, // ← MUST BE EXACTLY "text"
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { articleId, comment: response.data };
    } catch (error) {
      console.log(error.response?.data); // debug
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
      // handle toggleLike
      .addCase(toggleLike.pending, (state) => {
        // optional: you can set a loading flag per-article if you want
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { articleId, data } = action.payload;

        // find the post in state.posts
        const idx = state.posts.findIndex(
          (p) => p._id === articleId || p.id === articleId
        );
        if (idx !== -1) {
          // If backend returns full updated article:
          if (
            data &&
            typeof data === "object" &&
            (data.likeCount !== undefined || data.likes !== undefined)
          ) {
            // adapt to your backend field names:
            // prefer data.likeCount, fallback to data.likes
            state.posts[idx].likeCount =
              data.likeCount ?? data.likes ?? state.posts[idx].likeCount;
            state.posts[idx].likedBy = data.likedBy ?? state.posts[idx].likedBy;
          } else if (data && data.updatedFields) {
            // if backend returns a generic wrapper, adapt here
          } else {
            // If backend returns whole article:
            state.posts[idx] = { ...state.posts[idx], ...data };
          }
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        // You can show error state or ignore
        state.error = action.payload || "Failed to toggle like";
      })
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
