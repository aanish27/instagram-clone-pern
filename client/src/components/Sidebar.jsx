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
import { useState } from "react";
import PostUploadModal from "../modals/PostUploadModal";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import Search from "./Search";
import MessageList from "./MessageList";
import Notifications from "../pages/Notifications";

function Sidebar() {
  const authUser = useSelector((state) => state.auth.authUser);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const iconStyle = { fontSize: "25px" };
  const IsSidebarExpanded = useSelector((state) => state.ui.IsSidebarExpanded);
  const [IsSearchActive, setIsSearchActive] = useState(false);
  const [IsMessageActive, setIsMessageActive] = useState(false);
  const [IsNotificationActive, setIsNotificationActive] = useState(true);

  const handleSearchClick = () => {
    IsSearchActive ? setIsSearchActive(false) : setIsSearchActive(true);
  };

  const handleMessageClick = () => {
    IsMessageActive ? setIsMessageActive(false) : setIsMessageActive(true);
  };

   const handleNotificationClick = () => {
     IsNotificationActive ? setIsNotificationActive(false) : setIsNotificationActive(true);
   };

  const handlePostUploadClick = () => {
    document.getElementById("postUploadModal").showModal();
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
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
    <>
      <PostUploadModal />
      <div className="hidden min-h-screen text-white md:flex">
        <div className="border-r-2 border-gray-900 p-5">
          {/* <BrandName /> */}
          <div className="pt-10">
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
            />
            <SideBarItem
              icon={<CgAddR style={iconStyle} />}
              title={"Post"}
              isExpanded={IsSidebarExpanded}
              onClick={handlePostUploadClick}
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
        {IsSearchActive ? <Search /> : ""}
        {IsMessageActive ? <MessageList /> : ""}
        {IsNotificationActive ? <Notifications /> : ""}
      </div>
    </>
  );
}

export default Sidebar;
