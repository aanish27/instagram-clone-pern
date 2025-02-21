import PostCard from "./PostCard";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

function PostContainer() {
  return (
    <div className="w-full md:w-[30vw]">
      <PostHeader />
      <PostCard />
      <PostFooter />
    </div>
  );
}

export default PostContainer;
