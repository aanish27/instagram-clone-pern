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
import { useEffect, useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { CiFaceSmile } from "react-icons/ci";
import RightSidebarItem from "./RightSidebarItem";

function Sidebar() {
  const [searchResult, setSearchResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  useEffect(() => {
    document.getElementById("postUploadModal").showModal();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const iconStyle = { fontSize: "25px" };
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSideBarExapandClick = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const handlePostUploadClick = (e) => {
    e.preventDefault();
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

        console.log(error.response.data.error);
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

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setUploadedImage(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <dialog id="postUploadModal" className="modal backdrop-blur">
        {uploadedImage == null ? (
          <div className="modal-box bg-insta-black flex h-[80vh] w-[60vw] max-w-[100vw] flex-col items-center justify-center p-0">
            <div className="flex w-[100%] justify-between bg-black p-2">
              <button>
                <FaArrowLeft />
              </button>
              <h2>Create new Post</h2>
              <button className="font-semibold text-blue-500">Share</button>
            </div>
            <div className="flex h-[100%] w-[100%]">
              <img src={profile_pic} alt="" className="w-[65%]" />
              <div className="flex w-[100%] flex-col p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={profile_pic}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col p-3">
                      <div className="font-semibold">Aanish</div>
                    </div>
                  </div>
                </div>
                <form action="" className="w-[100%]">
                  <textarea
                    name=""
                    id=""
                    className="h-35 w-[100%]"
                    onChange={(e) => {
                      setWordCount(e.target.value.length);
                    }}></textarea>
                  <div className="flex items-center justify-between">
                    <div className="">
                      <CiFaceSmile className="" />
                      <div className="hidden">
                        <EmojiPicker />
                      </div>
                    </div>
                    <div className="text-xs font-extralight text-gray-500">
                      {`${wordCount}/200`}
                    </div>
                  </div>
                  <input type="file" id="postAttachment" className="hidden" />
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-box bg-insta-black flex flex-col items-center justify-center">
            <h2>Create new Post</h2>
            <hr className="m-1 w-100"></hr>
            <div {...getRootProps()} className="h-100 w-100">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drag photos here</p>
              ) : (
                <div className="flex h-100 flex-col items-center justify-center gap-3">
                  <MdOutlinePhotoLibrary className="text-6xl" />
                  <p className="text-xl">Drag photos here</p>
                  <button className="btn btn-primary">
                    Select from computer
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>T
        </form> */}
      </dialog>
      <div className="hidden h-[100vh] border-r-2 border-gray-900 text-white md:flex">
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
            {/* <SideBarItem icon={<IoMdMenu style={iconStyle} />} title={"Aanish"} /> */}
            {/* <div className="flex items-center gap-5 pt-4">
            <img
              src={profile_pic}
              alt=""
              className="h-[30px] w-[30px] rounded-full"
            />
            <span className="text-basic font-light md:hidden lg:block">
              Aanish
            </span>
          </div> */}
            <button
              className="btn btn-primary mt-4 px-20"
              onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
        <div className={isSidebarExpanded ? "block w-[25vw] p-5" : "hidden"}>
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
    </>
  );
}

export default Sidebar;
