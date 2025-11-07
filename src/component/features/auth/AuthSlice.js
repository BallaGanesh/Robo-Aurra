import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storedToken = localStorage.getItem("token") ;

// ✅ Register user API call
export const registerUser = createAsyncThunk(
  "api/users/register",
  async (formData, thunkAPI) => {
    try {
      // Example endpoint — replace with your backend API
      const response = await axios.post("http://localhost:5000/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
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
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      console.log(response);
      
      return response;
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
    user: null,
    token:storedToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
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
        state.user = action.payload;
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;