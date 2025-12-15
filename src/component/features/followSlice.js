import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://robo-zv8u.onrender.com/api/follow";

// 🔥 TOKEN HELPER (works for any project setup)
const getToken = () => {
  return (
    localStorage.getItem("Token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("Token") ||
    sessionStorage.getItem("token")
  );
};

// ======================================================
// 1️⃣ SEND FOLLOW REQUEST
// ======================================================
export const sendFollowRequest = createAsyncThunk(
  "follow/sendFollowRequest",
  async (targetUsername, thunkAPI) => {
    try {
      const token = getToken();

      const res = await axios.post(
        `${API_URL}/send-request`,
        { targetUsername },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // { message }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send follow request"
      );
    }
  }
);

// ======================================================
// 2️⃣ ACCEPT FOLLOW REQUEST
// ======================================================
export const acceptFollowRequest = createAsyncThunk(
  "follow/acceptFollowRequest",
  async (followerId, thunkAPI) => {
    try {
      const token = getToken();

      const res = await axios.post(
        `${API_URL}/accept-request`,
        { followerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // { message, user: updatedUser }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }
);

// ======================================================
// 3️⃣ REJECT FOLLOW REQUEST
// ======================================================
export const rejectFollowRequest = createAsyncThunk(
  "follow/rejectFollowRequest",
  async (followerId, thunkAPI) => {
    try {
      const token = getToken();

      const res = await axios.post(
        `${API_URL}/reject-request`,
        { followerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // { message }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reject request"
      );
    }
  }
);

// ======================================================
// FOLLOW SLICE
// ======================================================
const followSlice = createSlice({
  name: "follow",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },

  reducers: {
    clearFollowState: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // SEND REQUEST
      .addCase(sendFollowRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFollowRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendFollowRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ACCEPT REQUEST
      .addCase(acceptFollowRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptFollowRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(acceptFollowRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REJECT REQUEST
      .addCase(rejectFollowRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectFollowRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(rejectFollowRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFollowState } = followSlice.actions;
export default followSlice.reducer;


