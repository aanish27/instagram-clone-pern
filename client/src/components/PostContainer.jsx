import PostCard from "./PostCard";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

function PostContainer(post) {
  return (
    <div className="w-full">
      <PostHeader
        username={post.creator.username}
        created={post.createdAt}
        profile_pic={post.creator.profile_pic}
      />
      <PostCard attachment={post.attachment} />
      <PostFooter
        username={post.creator.username}
        caption={post.caption}
        likes={post._count.likes}
        id={post.id}
      />
    </div>
  );
}

export default PostContainer;
