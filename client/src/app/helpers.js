import axios from "axios";
import { setIsViewModalOpen } from "./features/uiSlice";
import { setViewPost } from "./features/postSlice";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const validateUsername = async (search) => {
  try {
    const response = await axios.get(`${serverUrl}/user/profile`, {
      params: { search: search },
      withCredentials: "true",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAuthUser = async () => {
  try {
    const response = await axios.get(`${serverUrl}/user/auth`, {
      withCredentials: "true",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
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
