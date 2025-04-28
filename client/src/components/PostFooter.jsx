import { useDispatch } from "react-redux";
import PostIconFooter from "./PostIconFooter";
import { openViewPostModal } from "../app/helpers";

function PostFooter({ username, caption, id, attachment }) {
  const dispatch = useDispatch();
  const handleCommentClick = () => {
    openViewPostModal(dispatch, { username, caption, id, attachment });
  };

  return (
    <>
      <PostIconFooter handleCommentClick={handleCommentClick} postId={id} />
      <div>
        {/* <b>{likeCount} </b>likes */}
        27 likes
      </div>
      <div>
        <b>{username}</b> {caption}
        <span className="text-gray-400"> more</span>{" "}
      </div>
    </>
  );
}

export default PostFooter;
