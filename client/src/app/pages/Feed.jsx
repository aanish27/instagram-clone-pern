import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PostContainer from "../../features/post/components/PostContainer";
import { usePostsQuery } from "../../features/post/postQueryHooks";
import StoryRow from "../../features/story/components/StoryRow";
import { useGetStories } from "../../features/story/storyQueryHooks";
import RightSidebar from "../../features/ui/components/RightSidebar";
import { toggleNotificationReload } from "../../features/ui/uiSlice";
import MainLayout from "../layouts/MainLayout";
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
      <main className="m-20 grid grid-cols-3 items-center justify-center gap-10 overflow-hidden">
        <div className="hide-scroll-bar flex max-h-screen flex-col overflow-scroll md:col-span-full lg:col-span-2">
          {isStories && stories && <StoryRow stories={stories} />}
          <div className="flex flex-col items-center justify-center">
            {isPosts &&
              posts?.map((post) => {
                return <PostContainer key={post.id} {...post} />;
              })}
          </div>
        </div>
        <RightSidebar />
      </main>
    </MainLayout>
  );
}

export default Feed;
