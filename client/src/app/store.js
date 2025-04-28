import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import authReducer from "./features/authSlice";
import uiReducer from "./features/uiSlice";

export const store = configureStore({
  reducer: { post: postReducer, auth: authReducer , ui: uiReducer},
});
