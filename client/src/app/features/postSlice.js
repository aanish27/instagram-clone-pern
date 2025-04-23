import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchAgain: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleFetchPosts: (state) => {
      state.fetchAgain = !state.fetchAgain;
    },
  },
});

export const { toggleFetchPosts } = postSlice.actions;

export default postSlice.reducer;
