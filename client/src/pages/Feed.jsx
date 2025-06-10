import StoryRow from "../components/StoryRow";
import PostContainer from "../components/PostContainer";
import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import RightSidebar from "../components/RightSidebar";
import { useDispatch } from "react-redux";
import { toggleNotificationReload } from "../app/features/uiSlice";
import { usePostsQuery } from "../hooks/Query/postQueryHooks";
import { useGetStories } from "../hooks/Query/storyQueryHooks";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Feed() {
  const { isSuccess: isPosts, data: posts } = usePostsQuery();
  const { isSuccess: isStories, data: stories } = useGetStories();
  const dispatch = useDispatch();

  useEffect(() => {
    const eventSource = new EventSource(`${serverUrl}/notifications/connect`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      console.log(event.data);
      dispatch(toggleNotificationReload());
    };

    return () => eventSource.close();
  }, []);

  return (
    <MainLayout>
      <main className="hide-scroll-bar max-h-screen w-full overflow-y-scroll md:my-0 md:px-5 lg:w-[40%] ">
        {isStories && stories && <StoryRow stories={stories} />}
        <div className="flex w-full flex-col items-center justify-center md:px-20">
          {isPosts &&
            posts?.map((post) => {
              return <PostContainer key={post.id} {...post} />;
            })}
        </div>
      </main>
      <RightSidebar />
    </MainLayout>
  );
}

export default Feed;
