import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import profile_pic from "../assets/car.jpg";

function PostHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500">
          <img src={profile_pic} alt="" className="h-15 w-15 rounded-full" />
        </div>
        <span> {"Aanish"} </span>
        <LuDot />
        <div className="flex-direction flex"></div>
        <span>9h</span>
      </div>
      <div className="flex gap-3">
        <FaStar />
        <BsThreeDots />
      </div>
    </div>
  );
}

export default PostHeader;
