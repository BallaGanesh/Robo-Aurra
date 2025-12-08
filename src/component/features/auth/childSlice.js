import { createSlice } from "@reduxjs/toolkit";

const childSlice = createSlice({
  name: "child",
  initialState: {
    valueFromChild: "",
    isDarkMode:false,
  },
  reducers: {
    setChildValue: (state, action) => {
      state.valueFromChild = action.payload;
    },
    setIsDarkMode:(state,action)=>{
      state.isDarkMode=action.payload;
    }
  }
});

export const { setChildValue,setIsDarkMode } = childSlice.actions;
export default childSlice.reducer;