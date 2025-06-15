import { useDispatch } from "react-redux";
import Avatar from "../../../components/Avatar";
import { showStoryModal } from "../../ui/uiSlice";

function StoryAvatar({ story, isHighlight }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      showStoryModal({
        state: true,
        id: story.id,
        isHighlight: isHighlight,
      }),
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-center md:w-16"
      onClick={handleClick}>
      <Avatar
        isStory={true}
        size={"h-17 w-17 md:h-16 md:w-16"}
        img={isHighlight ? story.attachment : story.creator.profile_pic}
        ringSize={"h-18 w-17 md:h-17"}
        {...(isHighlight
          ? { ringColor: "bg-gradient-to-r from-neutral-400 to-stone-700" }
          : {})}
      />
      {!isHighlight && (
        <span className="w-[100%] overflow-hidden whitespace-nowrap">
          {story.creator.username}
        </span>
      )}
    </div>
  );
}

export default StoryAvatar;
