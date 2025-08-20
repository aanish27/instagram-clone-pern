import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStories } from "../../ui/uiSlice";
import StoryAvatar from "./StoryAvatar";

function StoryRow({ stories, isHighlight = false }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStories(stories));
  }, [stories]);

  return (
    <div className="hide-scroll-bar flex shrink-0 gap-4 overflow-x-scroll px-1 py-2">
      {stories.map((story) => {
        return (
          <StoryAvatar key={story.id} story={story} isHighlight={isHighlight} />
        );
      })}
    </div>
  );
}

export default StoryRow;
