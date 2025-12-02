import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

//  Register user API call
export const registerUser = createAsyncThunk(
  "api/users/register",
  async (formData, thunkAPI) => {
    try {
      // Example endpoint — replace with your backend API
      const response = await axios.post("https://robo-1-qqhu.onrender.com/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      // return only response.data so components receive a normalized payload
      return response.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "api/users/login",
  async (formData, thunkAPI) => {
    try {
      // Example endpoint — replace with your backend API
      const response = await axios.post("https://robo-1-qqhu.onrender.com/api/users/login", formData);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is response.data from the server
        state.user = action.payload;
        
        if (action.payload?.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload));
        }

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;