import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewPost: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setViewPost: (state, action) => {
      state.viewPost = action.payload;
    },
  },
});

export const { setViewPost } = postSlice.actions;

export default postSlice.reducer;
