// import { Form } from "react-router";
import { useEffect, useRef } from "react";
import Input from "../components/Input";
import MainLayout from "../layouts/MainLayout";
import { io } from "socket.io-client";
import Avatar from "../components/Avatar";
import { useSelector } from "react-redux";
import {
  IoCallOutline,
  IoImageOutline,
  IoInformationCircleOutline,
  IoSend,
  IoVideocamOutline,
} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { PiSticker } from "react-icons/pi";
import { useForm } from "react-hook-form";
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
    socketRef.current = io("http://localhost:3000");

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
      <div className="flex h-screen w-full flex-col justify-between p-3">
        <div className="flex items-center justify-between border-b-2 border-gray-900 py-3">
          <div className="flex items-center gap-4">
            <Avatar img="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
            <div>{authUser.username}</div>
          </div>
          <div className="flex gap-4">
            <IoCallOutline style={iconStyle} />
            <IoVideocamOutline style={iconStyle} />
            <IoInformationCircleOutline style={iconStyle} />
          </div>
        </div>
        <div className="flex h-full w-full flex-col">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <FaRegFaceSmile style={iconStyle} />
          <form
            onSubmit={handleSubmit(handleSendText)}
            className="flex w-full items-center justify-center gap-2">
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
