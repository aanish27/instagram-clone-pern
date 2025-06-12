import { useContext } from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { GoDotFill } from "react-icons/go";
import profile_pic from "../assets/car.jpg";
import { FaChevronRight } from "react-icons/fa";
import NotificationList from "./NotificationList";
import { NotificationPanelContext } from "../provider/provider";
import { useGetNotificationsQuery } from "../hooks/Query/notificationQueryHooks";

function Notifications() {
  const isReload = useSelector((state) => state.ui.NotificationReload);
  const { setIsShowRequests } = useContext(NotificationPanelContext);
  const { isSuccess, data: notifications } = useGetNotificationsQuery(isReload);

  return (
    <div className="">
      <div className="text-2xl font-extrabold">Notifications</div>
      <div className="mt-5">
        <div
          className="flex items-center justify-center gap-4"
          onClick={() => {
            setIsShowRequests(true);
          }}>
          <Avatar size={"h-15 w-15"} img={profile_pic} />
          <div className="w-full">
            <div className="font-semibold">
              Follow Requests
              <br />
              <span className="font-extralight"> others</span>
            </div>
          </div>
          <div className="flex gap-2">
            <GoDotFill className="text-blue-400" />
            <FaChevronRight className="text-gray-500" />
          </div>
        </div>
        {isSuccess && (
          <>
            {notifications?.today?.length > 0 && (
              <NotificationList
                notifications={notifications.today}
                period="Today"
              />
            )}
            {notifications?.thisWeek?.length > 0 && (
              <NotificationList
                notifications={notifications.thisWeek}
                period="This Week"
              />
            )}
            {notifications?.thisMonth?.length > 0 && (
              <NotificationList
                notifications={notifications.thisMonth}
                period="This Month"
              />
            )}
            {notifications?.earlier?.length > 0 && (
              <NotificationList
                notifications={notifications.earlier}
                period="Earlier"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;
