import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { setIsStoryModalOpen } from "../app/features/uiSlice";

function StoryAvatar({ story }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsStoryModalOpen({ state: true, id: story.id }));
  };

  return (
    <div
      className="flex w-17 flex-col items-center justify-center md:w-16"
      onClick={handleClick}>
      <Avatar
        isStory={true}
        size={"h-16 w-16 md:h-15 md:w-15"}
        img={story.creator.profile_pic}
        ringSize={"h-17 w-16 md:h-16"}
      />
      <span className="w-[100%] overflow-hidden whitespace-nowrap">
        {story.creator.username}
      </span>
    </div>
  );
}

export default StoryAvatar;
