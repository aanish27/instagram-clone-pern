import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchAgain: false,
  viewPost: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleFetchPosts: (state) => {
      state.fetchAgain = !state.fetchAgain;
    },
    setViewPost: (state, action) => {
      state.viewPost = action.payload;
    },
  },
});

export const { toggleFetchPosts , setViewPost } = postSlice.actions;

export default postSlice.reducer;
