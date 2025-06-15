import { useContext, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NotificationPanelContext } from "../../../app/provider/provider";
import { useGetRequestsQuery } from "../../follow/followQueryHooks";
import {
  closeSidebar,
  expandSidebar,
  toggleNotificationReload,
} from "../../ui/uiSlice";
import FollowReqCard from "./FollowReqCard";
import Notifications from "./Notifications";

function NotificationPanel() {
  const { isShowRequests, setIsShowRequests } = useContext(
    NotificationPanelContext,
  );
  const isReload = useSelector((state) => state.ui.NotificationReload);
  const { isSuccess, data: requests, refetch } = useGetRequestsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsShowRequests(false);
    dispatch(closeSidebar());

    dispatch(toggleNotificationReload());
    return () => {
      dispatch(expandSidebar());
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [isReload]);

  return (
    <div className="mb-2 flex max-h-screen flex-col overflow-y-scroll p-3">
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
            {isSuccess &&
              requests?.map((request) => {
                return (
                  <FollowReqCard
                    key={request.id}
                    username={request.follower.username}
                    name={request.follower.name}
                    avatar={request.follower.profile_pic}
                    reqId={request.id}
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
