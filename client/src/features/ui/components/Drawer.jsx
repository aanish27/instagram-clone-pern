import { useSelector } from "react-redux";
import Search from "../../../components/SearchDrawer";
import { DrawerType } from "../../../utils/constants";
import MessageList from "../../messages/components/MessageDrawer";
import NotificationPanel from "../../notification/components/NotificationPanel";
import NotificationPanelProvider from "../../notification/NotificationPanelProvier";

const Drawer = () => {
  const { activeDrawer } = useSelector((state) => state.ui);
  switch (activeDrawer) {
    case DrawerType.SEARCH:
      return <Search />;
    case DrawerType.NOTIFICATION:
      return (
        <NotificationPanelProvider>
          <NotificationPanel />
        </NotificationPanelProvider>
      );
    case DrawerType.MESSAGE:
      return <MessageList />;
    default:
      return <>hiya</>;
  }
};

export default Drawer;
