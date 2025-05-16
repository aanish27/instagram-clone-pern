import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IsViewModalOpen: false,
  IsOptionsModalOpen: false,
  IsSidebarExpanded: true,
  NotificationReload: true,
  optionsModalProps: null,
  IsPostUploadModalOpen: false,
  PostEditModalProps: null,
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
    setIsOptionsModalOpen: (state, action) => {
      state.IsOptionsModalOpen = action.payload.state;
      state.optionsModalProps = action.payload.props;
    },
    setIsPostUploadModalOpen: (state, action) => {
      state.IsPostUploadModalOpen = action.payload;
      state.PostEditModalProps = {
        isEdit: false,
        id: null,
      };
    },
    setIsPostEditModalOpen: (state, action) => {
      state.IsPostUploadModalOpen = action.payload.state;
      state.PostEditModalProps = action.payload.props;
    },
  },
});

export const {
  setIsViewModalOpen,
  expandSidebar,
  closeSidebar,
  toggleNotificationReload,
  setIsOptionsModalOpen,
  setIsPostUploadModalOpen,
  setIsPostEditModalOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
