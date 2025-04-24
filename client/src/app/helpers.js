import axios from "axios";
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
