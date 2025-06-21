import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isViewModalOpen: false,
  IsOptionsModalOpen: false,
  isDrawerActive: false,
  activeDrawer: null,
  NotificationReload: true,
  optionsModalProps: null,
  IsPostUploadModalOpen: false,
  PostEditModalProps: null,
  isShareModalOpen: false,
  IsStoryModalOpen: false,
  storyId: null,
  isHighlight: false,
  stories: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsViewModalOpen: (state, action) => {
      state.isViewModalOpen = action.payload;
    },
    expandDrawer: (state, action) => {
      state.isDrawerActive = true;
      state.activeDrawer = action.payload;
    },
    closeDrawer: (state) => {
      state.isDrawerActive = false;
      state.activeDrawer = null;
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
    setIsShareModalOpen: (state, action) => {
      state.isShareModalOpen = action.payload;
    },
    showStoryModal: (state, action) => {
      state.IsStoryModalOpen = action.payload.state;
      state.storyId = action.payload.id;
      state.isHighlight = action.payload.IsHighlight;
    },
    hideStoryModal: (state) => {
      state.IsStoryModalOpen = false;
      state.storyId = null;
      state.isHighlight = false;
    },
    setStories: (state, action) => {
      state.stories = action.payload;
    },
  },
});

export const {
  setIsViewModalOpen,
  expandDrawer,
  closeDrawer,
  toggleNotificationReload,
  setIsOptionsModalOpen,
  setIsPostUploadModalOpen,
  setIsPostEditModalOpen,
  setIsShareModalOpen,
  showStoryModal,
  hideStoryModal,
  setStories,
} = uiSlice.actions;

export default uiSlice.reducer;
