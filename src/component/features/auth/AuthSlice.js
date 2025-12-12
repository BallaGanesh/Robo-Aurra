// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const storedToken = localStorage.getItem("token");
// const storedUser = localStorage.getItem("user");

// // -------------------- ASYNC THUNKS -------------------- //

// // export const registerUser = createAsyncThunk(
// //   "api/users/register",
// //   async (formData, thunkAPI) => {
// //     try {
// //       // Example endpoint — replace with your backend API
// //       const response = await axios.post("https://robo-zv8u.onrender.com/api/users/register", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       console.log(response);
// //       // return only response.data so components receive a normalized payload
// //       return response.data;
// //     } catch (error) {
// //       console.log(error);

// //       return response.data; // contains { user, token }
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message || "Registration failed"
// //       );
// //     }
// //   }
// // );

// export const registerUser = createAsyncThunk(
//   "api/users/register",
//   async (formData, thunkAPI) => {
//     try {

//       const response = await axios.post(
//         // Example endpoint — replace with your backend API
//         "https://robo-zv8u.onrender.com/api/users/register",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       console.log(response);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   "api/users/login",
//   async (formData, thunkAPI) => {
//     try {
//       // Example endpoint — replace with your backend API
//       const response = await axios.post("https://robo-zv8u.onrender.com/api/users/login", formData);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// // -------------------- SLICE -------------------- //

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: storedUser ? JSON.parse(storedUser) : null, // PURE user object
//     token: storedToken || null,
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     clearTokenOnRefresh: (state) => {
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // ---------------- REGISTER ---------------- //
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;

//         const { user, token } = action.payload;

//         state.user = user || null;
//         state.token = token || null;

//         if (user) localStorage.setItem("user", JSON.stringify(user));
//         if (token) localStorage.setItem("token", token);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ---------------- LOGIN ---------------- //
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;

//         const { user, token } = action.payload;

//         state.user = user || null;
//         state.token = token || null;

//         if (user) localStorage.setItem("user", JSON.stringify(user));
//         if (token) localStorage.setItem("token", token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logoutUser,clearTokenOnRefresh } = authSlice.actions;
// export default authSlice.reducer;















import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

// BASE URL (your backend)
const API_URL = "https://robo-zv8u.onrender.com";

// -------------------- REGISTER -------------------- //

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

      return response.data; // IMPORTANT → you forgot to return earlier
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
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
  },

  reducers: {
    clearTokenOnRefresh: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
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
