import StoryRow from "../components/StoryRow";
import PostContainer from "../components/PostContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import RightSidebar from "../components/RightSidebar";
import { useSelector } from "react-redux";

function Feed() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = useSelector((state) => state.post.fetchPosts);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post", { withCredentials: true })
      .then(function (response) {
        setPosts(response.data.posts);
      });
  }, [fetchPosts]);

  useEffect(() => {
    // const eventSource = new EventSource("http://localhost:3000/events", {
    //   withCredentials: true,
    // });

    eventSource.onmessage = (event) => {
      console.log(event.data);
    };

    return () => eventSource.close();
  }, []);

  return (
    <MainLayout>
      <main className="hide-scroll-bar my-10 max-h-screen w-full overflow-y-scroll p-1 md:my-0 md:px-5 lg:w-[40%]">
        <StoryRow />
        <div className="flex w-full flex-col items-center justify-center md:px-20">
          {posts &&
            posts.map((post) => {
              return <PostContainer key={post.id} {...post} />;
            })}
        </div>
      </main>
      <RightSidebar />
    </MainLayout>
  );
}

export default Feed;
