import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reloading: false,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    reloading: (state, action) => {
      state.reloading = action.payload.reloading;
    },
  },
});

export const { reloading } = pageSlice.actions;
export default pageSlice.reducer;
