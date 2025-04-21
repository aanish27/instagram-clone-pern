import StoryRow from "./StoryRow";
import PostContainer from "./PostContainer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CommentModalContext, FetchPostContext } from "../provider/provider";
import CommentModal from "../modals/CommentModal";
import { createContext } from "react";

function MainContent() {
  const [posts, setPosts] = useState([]);
  const [postComment, setPostComment] = useState(null);
  const { isFetchAgain } = useContext(FetchPostContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post", { withCredentials: true })
      .then(function (response) {
        setPosts(response.data.posts);
      });
  }, [isFetchAgain]);

  useEffect(() => {
    if (!postComment) {
      return;
    }
    // console.log(post);

    document.getElementById("commentModal").showModal();
  }, [postComment]);

  return (
    <main className="hide-scroll-bar my-10 max-h-screen w-full overflow-y-scroll p-1 md:my-0 md:px-5 lg:w-[40%]">
      <StoryRow />
      <div className="flex w-full flex-col items-center justify-center md:px-20">
        <CommentModalContext.Provider value={{ postComment, setPostComment }}>
          {postComment && <CommentModal />}

          {posts &&
            posts.map((post) => {
              return <PostContainer key={post.id} {...post} />;
            })}
        </CommentModalContext.Provider>
      </div>
    </main>
  );
}

export default MainContent;
