import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import DrawerLayout from "../../../app/layouts/DrawerLayout";
import { toggleNotificationReload } from "../../ui/uiSlice";
import { NotificationPanelContext } from "../NotificationPanelProvier";
import FollowRequests from "./FollowRequests";
import Notifications from "./Notifications";

function NotificationPanel() {
  const { isShowRequests, setIsShowRequests } = useContext(
    NotificationPanelContext,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsShowRequests(false);
    dispatch(toggleNotificationReload());
  }, []);

  return (
    <DrawerLayout
      body={
        isShowRequests ? (
          <FollowRequests setIsShowRequests={setIsShowRequests} />
        ) : (
          <Notifications />
        )
      }
      title={!isShowRequests && "Notifications"}
    />
  );
}

export default NotificationPanel;
