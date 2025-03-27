import { IoSearch, IoCompassOutline } from "react-icons/io5";
import profile_pic from "../assets/car.jpg";
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

function Sidebar() {
  const iconStyle = { fontSize: "25px" };

  const navigate = useNavigate();
  const { setToken } = useAuth();
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

        console.log(error.response.data.error);
      });
  };
  return (
    <div className="hidden h-[100vh] w-[15vw] border-r-2 border-gray-900 p-5 text-white md:block">
      <BrandName />
      <div className="pt-10">
        <SideBarItem
          icon={<GoHomeFill style={iconStyle} />}
          title={"Home"}
          notification={10}
          path={"/"}
        />
        <SideBarItem
          icon={<IoSearch style={iconStyle} />}
          title={"Search"}
          path={"/search"}
        />
        <SideBarItem
          icon={<IoCompassOutline style={iconStyle} />}
          title={"Explore"}
          path={"/explore"}
        />
        <SideBarItem
          icon={<FiHeart style={iconStyle} />}
          title={"Notifications"}
          path={"/notifications"}
        />
        <SideBarItem icon={<CgAddR style={iconStyle} />} title={"Post"} />
        <SideBarItem
          icon={<AiOutlineMessage style={iconStyle} />}
          title={"Message"}
          path={"/message"}
        />
        <SideBarItem icon={<LuVideotape style={iconStyle} />} title={"Reels"} />
        {/* <SideBarItem icon={<IoMdMenu style={iconStyle} />} title={"Aanish"} /> */}
        <div className="flex items-center gap-5 pt-4">
          <img
            src={profile_pic}
            alt=""
            className="h-[30px] w-[30px] rounded-full"
          />
          <span className="text-basic font-light md:hidden lg:block">
            Aanish
          </span>
        </div>
        <button className="mx-5 bg-red-400 px-20" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
