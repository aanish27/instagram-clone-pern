import PostCard from "./PostCard";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

function PostContainer(post) {
  return (
    <div className="w-full">
      <PostHeader username={post.creator.username} created={post.createdAt} />
      <PostCard attachment={post.attachment} />
      <PostFooter username={post.creator.username}  caption={post.caption} likes={post._count.likes} />
    </div>
  );
}

export default PostContainer;
