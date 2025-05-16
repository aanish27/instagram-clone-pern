import Avatar from "../components/Avatar";
import profile_pic from "../assets/avatar.jpg";
import { RiLinkM } from "react-icons/ri";
import { FaFacebook, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaThreads } from "react-icons/fa6";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsShareModalOpen } from "../app/features/uiSlice";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function ShareModal() {
  const { register, handleSubmit } = useForm();
  const [followers, setFollowers] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get(`${serverUrl}/follow/search`, {
    //     params: "",
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     setFollowers(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  });

  const handleSearch = (data) => {
    axios
      .get(`${serverUrl}/follow/search`, {
        params: data,
        withCredentials: true,
      })
      .then((response) => {
        setFollowers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modalOnClose = (e) => {
    if (e && e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    dispatch(setIsShareModalOpen(false));
  };

  return (
    <dialog id="shareModal" className="modal" onClick={modalOnClose}>
      <div className="modal-box bg-insta-black overflow-clip">
        <h3 className="text-center text-lg capitalize">share</h3>
        <hr className="my-2 w-full"></hr>

        <div className="flex flex-col gap-3">
          <form onSubmit={handleSubmit(handleSearch)} className="flex gap-2">
            <Input
              register={register}
              type={"text"}
              placeholder={"Search"}
              name={"followee"}
              className={
                "input input-ghost h-10 w-[100%] rounded-lg bg-[#3d3a3c] focus:bg-[#3d3b3c]"
              }
            />
            <button> Search</button>
          </form>
          {/* {searchResult &&
            searchResult.map((data) => {
              return (
                */}
          <div className="flex h-[25vh] max-h-[20vh] flex-wrap items-center justify-between gap-4 overflow-scroll overflow-x-hidden">
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
            <Avatar size={"h-20 w-20"} img={profile_pic} />
          </div>
          {/* );
            })} */}
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-black">
              <RiLinkM className="text-2xl text-white" />
            </div>
            <div className="text-xs">Copy Link</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-black">
              <FaFacebook className="text-2xl text-white" />
            </div>
            <div className="text-xs">Facebook</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-black">
              <FaFacebookMessenger className="text-2xl text-white" />
            </div>
            <div className="text-xs">Messenger</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-black">
              <FaWhatsapp className="text-2xl text-white" />
            </div>
            <div className="text-xs">Whatsapp</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-black">
              <CiMail className="text-2xl text-white" />
            </div>
            <div className="text-xs">Email</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-black">
              <FaThreads className="text-2xl text-white" />
            </div>
            <div className="text-xs">Threads</div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={modalOnClose}>
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default ShareModal;
