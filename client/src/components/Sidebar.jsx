import { IoSearch, IoCompassOutline } from "react-icons/io5";
import BrandName from "./BrandName";
import SideBarItem from "./SideBarItem";
import { GoHomeFill } from "react-icons/go";
import { LuVideotape } from "react-icons/lu";
import { AiOutlineMessage } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import Search from "./Search";
import MessageList from "./MessageList";
import NotificationPanel from "./NotificationPanel";
import { NotificationPanelContext } from "../provider/provider";
import { setIsPostUploadModalOpen } from "../app/features/uiSlice";
import SidebarMenu from "./SidebarMenu";
import { FaThreads } from "react-icons/fa6";
import {
  useMarkNotificationsReadMutation,
  useNotificationCountQuery,
} from "../hooks/Query/notificationQueryHooks";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Sidebar() {
  const authUser = useSelector((state) => state.auth.authUser);
  const isNotificationReload = useSelector(
    (state) => state.ui.NotificationReload,
  );
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const iconStyle = { fontSize: "25px" };
  const IsSidebarExpanded = useSelector((state) => state.ui.IsSidebarExpanded);
  const [IsSearchActive, setIsSearchActive] = useState(false);
  const [IsMessageActive, setIsMessageActive] = useState(false);
  const [IsNotificationActive, setIsNotificationActive] = useState(true);
  const [isShowRequests, setIsShowRequests] = useState(false);
  const dispatch = useDispatch();
  const { data: notificationCount, isSuccess } =
    useNotificationCountQuery(isNotificationReload);
  const markReadMutation = useMarkNotificationsReadMutation();

  useEffect(() => {
    setIsSearchActive(false);
    setIsMessageActive(false);
    setIsNotificationActive(false);
  }, []);

  const handleSearchClick = () => {
    IsSearchActive ? setIsSearchActive(false) : setIsSearchActive(true);
  };

  const handleMessageClick = () => {
    IsMessageActive ? setIsMessageActive(false) : setIsMessageActive(true);
  };

  const handleNotificationClick = () => {
    markReadMutation.mutate(
      {},
      {
        onSuccess: () => {
          IsNotificationActive
            ? setIsNotificationActive(false)
            : setIsNotificationActive(true);
        },
      },
    );
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();

    await axios
      .post(`${serverUrl}/logout`, {}, { withCredentials: true })
      .then(function (response) {
        console.log(response.data.message);
        setToken();
        console.log(Cookies.get("accessToken"), "Login");
        navigate("/login", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
        // console.log(error.response.data.error);
      });
  };

  return (
    <div className="hidden min-h-screen max-w-[25vw] text-white md:flex md:justify-between">
      <div className="flex flex-col justify-between border-r-2 border-gray-900 p-5">
        <div className="flex flex-col gap-6">
          <BrandName isExpanded={IsSidebarExpanded} />
          <div className="">
            <SideBarItem
              icon={<GoHomeFill style={iconStyle} />}
              title={"Home"}
              notification={10}
              path={"/"}
              isExpanded={IsSidebarExpanded}
            />
            <SideBarItem
              icon={<IoSearch style={iconStyle} />}
              title={"Search"}
              // path={"/search"}
              isExpanded={IsSidebarExpanded}
              onClick={handleSearchClick}
            />
            <SideBarItem
              icon={<IoCompassOutline style={iconStyle} />}
              title={"Explore"}
              path={"/explore"}
              isExpanded={IsSidebarExpanded}
            />
            <SideBarItem
              icon={<FiHeart style={iconStyle} />}
              title={"Notifications"}
              isExpanded={IsSidebarExpanded}
              onClick={handleNotificationClick}
              notification={isSuccess && notificationCount}
            />
            <SideBarItem
              icon={<CgAddR style={iconStyle} />}
              title={"Post"}
              isExpanded={IsSidebarExpanded}
              onClick={() => {
                dispatch(setIsPostUploadModalOpen(true));
              }}
            />
            <SideBarItem
              icon={<AiOutlineMessage style={iconStyle} />}
              title={"Message"}
              path={"/messages"}
              isExpanded={IsSidebarExpanded}
              onClick={handleMessageClick}
            />
            <SideBarItem
              icon={<LuVideotape style={iconStyle} />}
              title={"Reels"}
              path={"/reels"}
              isExpanded={IsSidebarExpanded}
            />
            <SideBarItem
              icon={<FaRegUser style={iconStyle} />}
              title={"Profile"}
              path={authUser ? `/${authUser.username}` : ""}
              isExpanded={IsSidebarExpanded}
            />
            <SideBarItem
              icon={<MdLogout style={iconStyle} />}
              title={"Logout"}
              onClick={handleLogoutClick}
              isExpanded={IsSidebarExpanded}
            />
          </div>
        </div>
        <div>
          <SideBarItem
            icon={<FaThreads style={iconStyle} />}
            title={"Threads"}
            onClick={handleLogoutClick}
            isExpanded={IsSidebarExpanded}
          />
          <SidebarMenu isExpanded={IsSidebarExpanded} />
        </div>
      </div>

      {IsSearchActive ? <Search /> : ""}
      {IsMessageActive ? <MessageList /> : ""}
      <NotificationPanelContext.Provider
        value={{ isShowRequests, setIsShowRequests }}>
        {IsNotificationActive ? <NotificationPanel /> : ""}
      </NotificationPanelContext.Provider>
    </div>
  );
}

export default Sidebar;
