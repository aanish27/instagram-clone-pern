import { FaChevronLeft } from "react-icons/fa";
import FollowReqCard from "./FollowReqCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Notifications from "./Notifications";
import { NotificationPanelContext } from "../provider/provider";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { useDispatch } from "react-redux";
import { closeSidebar, expandSidebar } from "../app/features/uiSlice";
function NotificationPanel() {
  const [requests, setRequests] = useState(null);
  const { isShowRequests, setIsShowRequests } = useContext(
    NotificationPanelContext,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSidebar());

    return () => {
      dispatch(expandSidebar());
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${serverUrl}/follow/req`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="block max-h-screen w-[20vw] overflow-scroll p-3">
      {isShowRequests ? (
        <>
          <div className="flex">
            <FaChevronLeft
              className="mr-auto text-2xl"
              onClick={() => {
                setIsShowRequests(false);
              }}
            />
            <div className="mr-auto font-semibold">Follow Requests</div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {requests &&
              requests.map((request) => {
                return (
                  <FollowReqCard
                    key={request.id}
                    username={request.follower.username}
                    name={request.follower.name}
                    avatar={request.follower.profile_pic}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <Notifications />
      )}
    </div>
  );
}

export default NotificationPanel;
