import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/AuthSlice'
import childReducer from '../features/auth/childSlice'
import articleReducer from '../features/articleSlice'
import followReducer from '../features/followSlice'



export const store = configureStore({
  reducer: {
    Auth: authReducer,
    child: childReducer,
    articles: articleReducer,
    follow: followReducer,
  },
})