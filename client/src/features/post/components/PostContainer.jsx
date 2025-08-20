import { useDispatch } from "react-redux";
import { openViewPostModal } from "../../../utils/helpers";
import CommentForm from "./CommentForm";
import PostFooterIcons from "./PostFooterIcons";
import PostHeader from "./PostHeader";
const env = import.meta.env.VITE_STORAGE_URL;
const regex = /^https:\/\/picsum\.photos\/seed\//;

function PostContainer(post) {
  const dispatch = useDispatch();

  const handleCommentClick = () => {
    openViewPostModal(dispatch, post);
  };

  return (
    <div className="flex flex-col">
      <PostHeader
        username={post.creator.username}
        created={post.createdAt}
        profile_pic={post.creator.profile_pic}
        userId={post.creator.id}
        postId={post.id}
      />
      <img
        className="h-auto max-h-[450px]"
        src={
          regex.test(post.attachment)
            ? post.attachment
            : `${env}${post.attachment}`
        }
        alt={post.title}
      />
      <PostFooterIcons
        handleCommentClick={handleCommentClick}
        postId={post.id}
      />
      <div>{post._count.likes} Likes</div>
      <div className="truncate">
        {post.creator.username} {post.caption}
      </div>
      <CommentForm postId={post.id} />
    </div>
  );
}

export default PostContainer;
