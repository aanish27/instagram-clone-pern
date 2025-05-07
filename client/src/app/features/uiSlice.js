import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IsViewModalOpen: false,
  IsSidebarExpanded: true,
  NotificationReload: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsViewModalOpen: (state, action) => {
      state.IsViewModalOpen = action.payload;
    },
    expandSidebar: (state) => {
      state.IsSidebarExpanded = true;
    },
    closeSidebar: (state) => {
      state.IsSidebarExpanded = false;
    },
    toggleNotificationReload: (state) => {
      state.NotificationReload = !state.NotificationReload;
    },
  },
});

export const {
  setIsViewModalOpen,
  expandSidebar,
  closeSidebar,
  toggleNotificationReload,
} = uiSlice.actions;

export default uiSlice.reducer;
