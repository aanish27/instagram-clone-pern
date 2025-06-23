// import { Form } from "react-router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaRegHeart } from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import {
  IoCallOutline,
  IoImageOutline,
  IoInformationCircleOutline,
  IoSend,
  IoVideocamOutline,
} from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { PiSticker } from "react-icons/pi";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Input from "../../components/Input";
import UserCard from "../../components/UserCard";
import ReceivedText from "../../features/messages/components/ReceivedText";
import SentText from "../../features/messages/components/SentText";
import MainLayout from "../layouts/MainLayout";
const serverUrl = import.meta.env.VITE_SERVER_URL;
const iconStyle = { fontSize: "25px" };

function Messages() {
  const authUser = useSelector((state) => state.auth.authUser);
  const socketRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    socketRef.current = io(serverUrl);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendText = (data) => {
    socketRef.current.emit("chat message", data.text);
    reset();
  };

  return (
    <MainLayout>
      <div className="w-full">
        <UserCard username={authUser?.username} avatar={authUser?.profile_pic}>
          <div className="flex gap-4">
            <IoCallOutline style={iconStyle} />
            <IoVideocamOutline style={iconStyle} />
            <IoInformationCircleOutline style={iconStyle} />
          </div>
        </UserCard>
        <div className="divider m-0"></div>
        <div className="hide-scroll-bar flex flex-col">
          <SentText
            name={authUser?.username}
            text={"Hi"}
            sentTime={"00:05"}
            seenTime={"00:10"}
          />
          <ReceivedText
            name={"Obi-Wan Kenobi"}
            status={"Delivered"}
            text={"You were the Chosen One!"}
            receivedTime={"00:11"}
          />
        </div>
        <div className="absolute bottom-0 flex gap-2">
          <FaRegFaceSmile style={iconStyle} />
          <form
            onSubmit={handleSubmit(handleSendText)}
            className="flex items-center justify-center gap-2">
            <Input
              register={register("text")}
              className={"grow rounded-full px-3"}
              type={"text"}
            />
            <button className="text-sky-500">
              <IoSend style={iconStyle} />
            </button>
          </form>
          <MdOutlineKeyboardVoice style={iconStyle} />
          <IoImageOutline style={iconStyle} />
          <PiSticker style={iconStyle} />
          <FaRegHeart style={iconStyle} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Messages;
