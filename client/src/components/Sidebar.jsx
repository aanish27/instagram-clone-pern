import { IoSearch, IoCompassOutline } from "react-icons/io5";
import BrandName from "./BrandName";
import SideBarItem from "./SideBarItem";
import { GoHomeFill } from "react-icons/go";
import { LuVideotape } from "react-icons/lu";
import { AiOutlineMessage } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import Cookies from "js-cookie";
import {useNavigate } from "react-router";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "./Input";
import PostUploadModal from "../modals/PostUploadModal";
import { useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";

function Sidebar() {
  const [searchResult, setSearchResult] = useState(null);
  const authUser = useSelector((state) => state.auth.authUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // document.getElementById("postUploadModal").showModal();
  }, []);

  const iconStyle = { fontSize: "25px" };
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSideBarExapandClick = () => {
    setSidebarExpanded(!isSidebarExpanded);
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

  const handleSearch = async (data) => {
    axios
      .get("http://localhost:3000/user/search", {
        params: data,
        withCredentials: "true",
      })
      .then((response) => {
        setSearchResult(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <PostUploadModal />
      <div className="hidden min-h-screen border-r-2 border-gray-900 text-white md:flex">
        <div className="p-5">
          {/* <BrandName /> */}
          <div className="pt-10">
            <SideBarItem
              icon={<GoHomeFill style={iconStyle} />}
              title={"Home"}
              notification={10}
              path={"/"}
              isExpanded={isSidebarExpanded}
            />
            <SideBarItem
              icon={<IoSearch style={iconStyle} />}
              title={"Search"}
              // path={"/search"}
              isExpanded={isSidebarExpanded}
              onClick={handleSideBarExapandClick}
            />
            <SideBarItem
              icon={<IoCompassOutline style={iconStyle} />}
              title={"Explore"}
              path={"/explore"}
              isExpanded={isSidebarExpanded}
            />
            <SideBarItem
              icon={<FiHeart style={iconStyle} />}
              title={"Notifications"}
              path={"/notifications"}
              isExpanded={isSidebarExpanded}
            />
            <SideBarItem
              icon={<CgAddR style={iconStyle} />}
              title={"Post"}
              isExpanded={isSidebarExpanded}
              onClick={handlePostUploadClick}
            />
            <SideBarItem
              icon={<AiOutlineMessage style={iconStyle} />}
              title={"Message"}
              path={"/message"}
              isExpanded={isSidebarExpanded}
            />
            <SideBarItem
              icon={<LuVideotape style={iconStyle} />}
              title={"Reels"}
              path={"/reels"}
              isExpanded={isSidebarExpanded}
            />
            <SideBarItem
              icon={<FaRegUser style={iconStyle} />}
              title={"Profile"}
              path={`/${authUser.username}`}
              isExpanded={isSidebarExpanded}
            />
            <SideBarItem
              icon={<MdLogout style={iconStyle} />}
              title={"Logout"}
              onClick={handleLogoutClick}
              isExpanded={isSidebarExpanded}
            />
          </div>
        </div>
        <div
          className={
            isSidebarExpanded ? "block max-h-screen w-[25vw] p-5" : "hidden"
          }>
          <div className="text-2xl font-extrabold">Search</div>
          <div className="mt-5">
            <form onSubmit={handleSubmit(handleSearch)}>
              <Input
                register={register}
                type={"text"}
                placeholder={"Search"}
                name={"search"}
                className={
                  "input input-ghost h-10 w-[100%] rounded-lg bg-[#3d3a3c] focus:bg-[#3d3b3c]"
                }
              />
              <button> Search</button>
            </form>
            <div className="hide-scroll-bar max-h-[80vh] overflow-y-scroll">
              {searchResult &&
                searchResult.map((user) => {
                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={user.profile_pic}
                          alt=""
                          className="h-15 w-15 rounded-full"
                        />
                        <div className="flex flex-col p-3">
                          <div className="font-semibold">{user.name}</div>
                          <div className="font-extralight text-gray-400">
                            followed By
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
