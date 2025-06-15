import { BsThreeDots } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Avatar from "../../../components/Avatar";
import { setIsOptionsModalOpen } from "../../ui/uiSlice";

function PostHeader({ username, profile_pic, userId, postId }) {
  const dispatch = useDispatch();
  const options = [
    { title: "report", path: "/" },
    {
      title: "unfollow",
      onClick: { actionType: "unfollow", data: { followerId: userId } },
    },
    {
      title: "save post",
      onClick: { actionType: "savePost", data: { postId: postId } },
    },
    { title: "go to post", path: "/" },
    { title: "share to...", path: "/" },
    { title: "copy link", path: "/" },
    { title: "embeded", path: "/" },
    { title: "about this account", path: `/${username}` },
  ];

  const handleOptionsOnClick = () => {
    dispatch(
      setIsOptionsModalOpen({
        props: { options: options },
        state: true,
      }),
    );
  };

  return (
    <div className="flex items-center justify-between p-1 py-2">
      <div className="flex items-center justify-center gap-2">
        <Avatar
          img={profile_pic}
          size={"h-11 w-11"}
          isStory={true}
          ringSize={"h-12 w-12"}
        />
        <span> {username} </span>
        {/* <LuDot className="hidden lg:block" /> */}
        {/* <span className="hidden lg:block">9h  </span> */}
      </div>
      <div className="flex gap-3">
        <FaStar className="hidden" />
        <BsThreeDots onClick={handleOptionsOnClick} />
      </div>
    </div>
  );
}

export default PostHeader;
