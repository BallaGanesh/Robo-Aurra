import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/slice'
import authReducer from '../features/auth/AuthSlice'
import childReducer from '../features/auth/childSlice'



export const store = configureStore({
  reducer: {
    user: userReducer,
    Auth: authReducer,
    child: childReducer,
  },
})