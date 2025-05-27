import { useDispatch } from "react-redux";
import PostIconFooter from "./PostIconFooter";
import { openViewPostModal } from "../app/helpers";
import CommentForm from "../forms/CommentForm";

function PostFooter({ post }) {
  const dispatch = useDispatch();

  const handleCommentClick = () => {
    openViewPostModal(dispatch, post);
  };

  return (
    <>
      <PostIconFooter
        handleCommentClick={handleCommentClick}
        postId={post.id}
      />
      <div>
        {/* username={post.creator.username}
        caption={post.caption}
        likes={post._count.likes}
        id={post.id}
        attachment={post.attachment} */}
        {/* <b>{likeCount} </b>likes */}
        27 likes
      </div>
      <div>
        <b>{post.creator.username}</b> {post.caption}
        <span className="text-gray-400"> more</span>
      </div>
      <CommentForm postId={post.id} />
    </>
  );
}

export default PostFooter;
