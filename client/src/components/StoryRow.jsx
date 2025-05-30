import { useDispatch } from "react-redux";
import StoryAvatar from "./StoryAvatar";
import { setStories } from "../app/features/uiSlice";
import { useEffect } from "react";

function StoryRow({ stories, isHighlight = false }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStories(stories));
  }, [stories]);

  return (
    <div className="hide-scroll-bar flex min-w-full shrink-0 gap-2 overflow-x-scroll md:w-full md:gap-4">
      {stories.map((story) => {
        return (
          <StoryAvatar key={story.id} story={story} isHighlight={isHighlight} />
        );
      })}
    </div>
  );
}

export default StoryRow;
