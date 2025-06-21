import axios from "axios";
import { AiOutlineMessage } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoCompassOutline, IoSearch } from "react-icons/io5";
import { LuVideotape } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAuth } from "../../../app/provider/AuthProvider";
import BrandName from "../../../components/BrandName";
import useDrawerToggle from "../../../hooks/useDrawerToggle";
import { DrawerType } from "../../../utils/constants";
import {
  useMarkNotificationsReadMutation,
  useNotificationCountQuery,
} from "../../notification/notificationQueryHooks";
import { setIsPostUploadModalOpen } from "../../ui/uiSlice";
import SideBarItem from "./SideBarItem";
import SidebarMenu from "./SidebarMenu";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Sidebar() {
  const authUser = useSelector((state) => state.auth.authUser);
  const { isNotificationReload, isDrawerActive } = useSelector(
    (state) => state.ui,
  );
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const iconStyle = { fontSize: "25px" };
  const dispatch = useDispatch();
  const { data: notificationCount, isSuccess } =
    useNotificationCountQuery(isNotificationReload);
  const markReadMutation = useMarkNotificationsReadMutation();
  const toggleSearch = useDrawerToggle(DrawerType.SEARCH);
  const toggleMessage = useDrawerToggle(DrawerType.MESSAGE);
  const toggleNotification = useDrawerToggle(DrawerType.NOTIFICATION);

  const handleNotificationClick = () => {
    markReadMutation.mutate(
      {},
      {
        onSuccess: () => {
          toggleNotification();
        },
      },
    );
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    await axios
      .post(`${serverUrl}/logout`, {}, { withCredentials: true })
      .then(function (response) {
        setToken(null);
        navigate("/login", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
        // console.log(error.response.data.error);
      });
  };

  return (
    <div className="border-insta-black hidden h-full gap-4 border-r-2 p-5 text-white md:flex">
      <div className="flex flex-col justify-between gap-3">
        <BrandName isActive={isDrawerActive} />
        <div className="grid grid-cols-1 gap-4">
          <SideBarItem
            icon={<GoHomeFill style={iconStyle} />}
            title={"Home"}
            notification={10}
            path={"/"}
            isActive={isDrawerActive}
          />
          <SideBarItem
            icon={<IoSearch style={iconStyle} />}
            title={"Search"}
            // path={"/search"}
            isActive={isDrawerActive}
            onClick={toggleSearch}
          />
          <SideBarItem
            icon={<IoCompassOutline style={iconStyle} />}
            title={"Explore"}
            path={"/explore"}
            isActive={isDrawerActive}
          />
          <SideBarItem
            icon={<FiHeart style={iconStyle} />}
            title={"Notifications"}
            isActive={isDrawerActive}
            onClick={handleNotificationClick}
            notification={isSuccess && notificationCount}
          />
          <SideBarItem
            icon={<CgAddR style={iconStyle} />}
            title={"Post"}
            isActive={isDrawerActive}
            onClick={() => {
              dispatch(setIsPostUploadModalOpen(true));
            }}
          />
          <SideBarItem
            icon={<AiOutlineMessage style={iconStyle} />}
            title={"Message"}
            path={"/messages"}
            isActive={isDrawerActive}
            onClick={toggleMessage}
          />
          <SideBarItem
            icon={<LuVideotape style={iconStyle} />}
            title={"Reels"}
            path={"/reels"}
            isActive={isDrawerActive}
          />
          <SideBarItem
            icon={<FaRegUser style={iconStyle} />}
            title={"Profile"}
            path={authUser ? `/${authUser.username}` : ""}
            isActive={isDrawerActive}
          />
          <SideBarItem
            icon={<MdLogout style={iconStyle} />}
            title={"Logout"}
            onClick={handleLogoutClick}
            isActive={isDrawerActive}
          />
        </div>
        <div className="w-full">
          <SideBarItem
            icon={<FaThreads style={iconStyle} />}
            title={"Threads"}
            isActive={isDrawerActive}
          />
          <hr className="my-2 border-0" />
          <SidebarMenu isActive={isDrawerActive} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
