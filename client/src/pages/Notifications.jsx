import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, expandSidebar } from "../app/features/uiSlice";
import Avatar from "../components/Avatar";
import { GoDotFill } from "react-icons/go";
import profile_pic from "../assets/car.jpg";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Notifications() {
  const dispatch = useDispatch();
  const isReload = useSelector((state) => state.ui.NotificationReload);
  useEffect(() => {
    fetchNotifications();
  }, [isReload]);

  useEffect(() => {
    fetchNotifications();
    dispatch(closeSidebar());

    return () => {
      dispatch(expandSidebar());
    };
  }, []);

  const fetchNotifications = async () => {
    await axios
      .get(`${serverUrl}/notifications/recent`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="block max-h-screen w-[20vw] p-5">
      <div className="text-2xl font-extrabold">Notifications</div>
      <div className="mt-5">
        <div className="flex items-center gap-4 py-2">
          <Avatar size={"h-15 w-15"} img={profile_pic} />
          <div className="w-full">
            <div className="font-semibold">
              Follow Requests
              <br className=" " />
              <span className="font-extralight"> others</span>
            </div>
          </div>
          <div className="flex gap-2">
            <GoDotFill className="text-blue-400" />
            <FaChevronRight className="text-gray-500" />
          </div>
        </div>

        {/* <hr className=" text-gray-800" /> */}
        <div className="divider"></div>
        <div className="flex flex-col gap-3">
          <div className="font-semibold">Today</div>
          <div className="flex items-center gap-2">
            <Avatar size={"h-15 w-15"} img={profile_pic} />
            <div className="text-md font-semibold">
              username
              <br />
              <span className="text-sm font-light">
                requested to follow you
              </span>
            </div>
            <div className="flex gap-2">
              <button className="btn rounded-xl bg-blue-500">Confirm</button>
              <button className="btn bg-insta-black rounded-xl">Delete</button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar size={"h-15 w-15"} img={profile_pic} />
              <div className="text-md font-semibold">
                username
                <span className="px-1 text-sm font-light">liked your post</span>
              </div>
            </div>
            <img src={profile_pic} alt="" className="h-15 w-15 rounded-xl" />
          </div>
          {/* fill notifactions */}
        </div>
        <div className="divider"></div>
        <div>
          <div className="font font-semibold">This Week</div>
          {/* fill notifactions */}
        </div>
        <div className="divider"></div>
        <div>
          <div className="font-semibold">This month</div>
          {/* fill notifactions */}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
