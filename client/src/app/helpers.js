import { setIsViewModalOpen } from "./features/uiSlice";
import { setViewPost } from "./features/postSlice";
import { getUser } from "../api/userApi";

export const validateUsername = async (username) => {
  try {
    return getUser(username);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const openViewPostModal = (dispatch, post) => {
  dispatch(setViewPost(post));
  dispatch(setIsViewModalOpen(true));
};

export const closeViewPostModal = (dispatch) => {
  dispatch(setIsViewModalOpen(false));
  dispatch(setViewPost(null));
};

export const removeEmptyFields = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === "" || data[key] == null) {
      delete data[key];
    }
  });
};
