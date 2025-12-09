import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

// -------------------- ASYNC THUNKS -------------------- //

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (formData, thunkAPI) => {
    try {
      // Example endpoint — replace with your backend API
      const response = await axios.post("https://robo-zv8u.onrender.com/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      // return only response.data so components receive a normalized payload
      return response.data;
    } catch (error) {
      console.log(error);

      return response.data; // contains { user, token }
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
      const response = await axios.post("https://robo-zv8u.onrender.com/api/users/login", formData);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// -------------------- SLICE -------------------- //

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null, // PURE user object
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
    },
  },

  extraReducers: (builder) => {
    builder
      // ---------------- REGISTER ---------------- //
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        const { user, token } = action.payload;

        state.user = user || null;
        state.token = token || null;

        if (user) localStorage.setItem("user", JSON.stringify(user));
        if (token) localStorage.setItem("token", token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- LOGIN ---------------- //
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const { user, token } = action.payload;

        state.user = user || null;
        state.token = token || null;

        if (user) localStorage.setItem("user", JSON.stringify(user));
        if (token) localStorage.setItem("token", token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;



