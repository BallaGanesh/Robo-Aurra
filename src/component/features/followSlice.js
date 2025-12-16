import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://robo-zv8u.onrender.com/api/follow";

// SEND FOLLOW REQUEST -------------
export const sendFollowRequest = createAsyncThunk(
  "follow/sendFollowRequest",
  async (targetUsername, thunkAPI) => {
    try {
       const token = thunkAPI.getState().Auth.token; 
      const res = await axios.post(
        `${API_URL}/send-request`,
        { targetUsername },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // { message, user? }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send follow request"
      );
    }
  }
);

// ACCEPT FOLLOW REQUEST -------------
export const acceptFollowRequest = createAsyncThunk(
  "follow/acceptFollowRequest",
  async (followerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().Auth.token; 

      const res = await axios.post(
        `${API_URL}/accept-request`,
        { followerId },  // 👈 IMPORTANT: followerId
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // res.data = { message, user: updatedCurrentUser }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }
);

// REJECT FOLLOW REQUEST -------------
export const rejectFollowRequest = createAsyncThunk(
  "follow/rejectFollowRequest",
  async (followerId, thunkAPI) => {
    try {
    const token = thunkAPI.getState().Auth.token; 

      const res = await axios.post(
        `${API_URL}/reject-request`,
        { followerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reject request"
      );
    }
  }
);

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
      // send
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

      // accept
      .addCase(acceptFollowRequest.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })

      // reject
      .addCase(rejectFollowRequest.fulfilled, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

export const { clearFollowState } = followSlice.actions;
export default followSlice.reducer;
