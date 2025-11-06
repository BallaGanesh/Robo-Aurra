import { configureStore } from '@reduxjs/toolkit'
import { loggeduser } from '../slice/slice'
import authReducer from '../features/auth/AuthSlice'


export const store = configureStore({
  reducer: {
    loggeduser:loggeduser,
    Auth:authReducer,
  },
})