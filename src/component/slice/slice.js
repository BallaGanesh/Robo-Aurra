import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}
export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loggeduser:()=>{}
  }
})



export const {loggeduser } = userSlice.actions

export default userSlice.reducer