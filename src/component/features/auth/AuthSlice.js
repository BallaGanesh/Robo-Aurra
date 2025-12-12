// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// -------------------- LOGIN -------------------- //

export const loginUser = createAsyncThunk(
  "api/users/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ⭐⭐⭐ -------------------- GOOGLE LOGIN -------------------- ⭐⭐⭐
// This receives the ID TOKEN from Google popup
export const googleLogin = createAsyncThunk(
  "api/users/google-login",
  async (idToken, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/google`,
        { idToken },
        { headers: { "Content-Type": "application/json" } }
      );

      // Expected response:
      // { user: {...}, token: "xxxx" }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);

// -------------------- SLICE -------------------- //

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, 
    token: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearTokenOnRefresh: (state) => {
      state.token = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ⭐⭐⭐ ---------------- GOOGLE LOGIN ---------------- ⭐⭐⭐
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;

        const { user, token } = action.payload;

        state.user = user;
        state.token = token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearTokenOnRefresh } = authSlice.actions;
export default authSlice.reducer;
