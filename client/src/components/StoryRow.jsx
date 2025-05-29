import StoryAvatar from "./StoryAvatar";
import { useGetStories } from "../hooks/Query/storyQueryHooks";

function StoryRow() {
  const { isSuccess, data: stories } = useGetStories();

  return (
    <div className="hide-scroll-bar flex min-w-full shrink-0 gap-2 overflow-x-scroll md:w-full md:gap-4">
      {isSuccess &&
        stories?.map((story) => {
          return <StoryAvatar key={story.id} story={story} />;
        })}
    </div>
  );
}

export default StoryRow;
