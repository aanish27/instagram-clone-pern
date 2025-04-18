import StoryRow from "./StoryRow";
import PostContainer from "./PostContainer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FetchPostContext } from "../provider/provider";

function MainContent() {
  const [posts, setPosts] = useState([]);
  const { isFetchAgain } = useContext(FetchPostContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post", { withCredentials: true })
      .then(function (response) {
        setPosts(response.data.posts);
      });
  }, [isFetchAgain]);

  return (
    <main className="hide-scroll-bar display- my-10 h-screen w-full overflow-y-scroll p-1 md:my-0 md:px-5 lg:w-[40%]">
      <StoryRow />
      <div className="flex w-full flex-col items-center justify-center md:px-20">
        {posts &&
          posts.map((post) => {
            return <PostContainer key={post.id} {...post} />;
          })}
      </div>
    </main>
  );
}

export default MainContent;
