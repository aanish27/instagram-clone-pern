import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: { post: postReducer, auth: authReducer , ui: uiReducer},
});
