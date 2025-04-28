import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IsViewModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsViewModalOpen: (state, action) => {
      state.IsViewModalOpen = action.payload;
    },
  },
});

export const { setIsViewModalOpen } = uiSlice.actions;

export default uiSlice.reducer;
