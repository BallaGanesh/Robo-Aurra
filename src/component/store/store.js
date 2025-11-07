import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/slice'
import authReducer from '../features/auth/AuthSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    Auth: authReducer,
  },
})