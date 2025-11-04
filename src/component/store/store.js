import { configureStore } from '@reduxjs/toolkit'
import { loggeduser } from '../slice/slice'

export const store = configureStore({
  reducer: {
    loggeduser:loggeduser
  },
})