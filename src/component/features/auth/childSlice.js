import { createSlice } from "@reduxjs/toolkit";

const childSlice = createSlice({
  name: "child",
  initialState: {
    valueFromChild: ""
  },
  reducers: {
    setChildValue: (state, action) => {
      state.valueFromChild = action.payload;
    }
  }
});

export const { setChildValue } = childSlice.actions;
export default childSlice.reducer;