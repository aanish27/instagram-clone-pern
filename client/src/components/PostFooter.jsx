import { useDispatch } from "react-redux";
import PostFooterIcons from "./PostFooterIcons";
import { openViewPostModal } from "../app/helpers";
import CommentForm from "../forms/CommentForm";

function PostFooter({ post }) {
  const dispatch = useDispatch();

  const handleCommentClick = () => {
    openViewPostModal(dispatch, post);
  };

  return (
    <>
      <PostFooterIcons
        handleCommentClick={handleCommentClick}
        postId={post.id}
      />
      <div>{post._count.likes} Likes</div>
      <div className="truncate">
        {post.creator.username} {post.caption}
        {/* <span className="text-gray-400"> more</span> */}
      </div>
      <CommentForm postId={post.id} />
    </>
  );
}

export default PostFooter;
