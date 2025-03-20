// import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

function PostHeader({username , profile_pic}) {

  return (
    <div className="flex items-center justify-between p-1 py-2">
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500">
          <img src={profile_pic} alt="" className="h-10 w-10 rounded-full" />
        </div>
        <span> {username} </span>
        {/* <LuDot className="hidden lg:block" /> */}
        {/* <span className="hidden lg:block">9h  </span> */}
      </div>
      <div className="flex gap-3">
        <FaStar className="hidden" />
        <BsThreeDots />
      </div>
    </div>
  );
}

export default PostHeader;
