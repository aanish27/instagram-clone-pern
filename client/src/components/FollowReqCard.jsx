import axios from "axios";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { toggleNotificationReload } from "../app/features/uiSlice";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function FollowReqCard({ avatar, name, username, message, reqId }) {
  const dispatch = useDispatch();

  const handleAcceptRequest = async () => {
    await axios
      .post(`${serverUrl}/follow`, { id: reqId }, { withCredentials: true })
      .then((response) => {
        dispatch(toggleNotificationReload());
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRejectRequest = async () => {
    await axios
      .delete(`${serverUrl}/follow/req/${reqId}`, { withCredentials: true })
      .then((response) => {
        dispatch(toggleNotificationReload());
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <Avatar size={"h-13 w-13"} img={avatar} />
        <div className="text-sm font-semibold">
          {username}
          <br />
          <span className="text-sm font-light text-gray-200">
            {message ? message : name}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="btn rounded-xl bg-blue-500"
          onClick={handleAcceptRequest}>
          Confirm
        </button>
        <button
          className="btn bg-insta-black rounded-xl"
          onClick={handleRejectRequest}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default FollowReqCard;
