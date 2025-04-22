import { useContext } from "react";
import { CommentModalContext } from "../provider/provider";
import PostIconFooter from "./PostIconFooter";

function PostFooter({ username, caption, likes, id, attachment }) {
  const { setPostComment } = useContext(CommentModalContext);

  const handleCommentClick = () => {
    setPostComment({ username, caption, likes, id, attachment });
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
