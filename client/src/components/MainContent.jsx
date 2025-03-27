import StoryRow from "./StoryRow";
import PostContainer from "./PostContainer";
import axios from "axios";
import { useEffect, useState } from "react";

function MainContent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post", { withCredentials: true })
      .then(function (response) {
        setPosts(response.data.posts);
      });
  }, []);

  return (
    <main className="hide-scroll-bar display- my-10 h-screen w-full overflow-y-scroll p-1 md:my-0 md:px-5 lg:w-[50%]">
      <StoryRow />
      <div className="flex w-full flex-col items-center justify-center md:px-20">
        {posts && posts.map((post) => {
          return (
            <PostContainer key={post.id} {...post} />
          );
        })}
      </div>
    </main>
  );
}

export default MainContent;
