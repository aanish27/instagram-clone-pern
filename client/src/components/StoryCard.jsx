import { useContext } from "react";
import { StoryModalContext } from "../provider/provider";
import Avatar from "./Avatar";

function StoryCard({ story }) {
  const [StoryModal, setStoryModal] = useContext(StoryModalContext);

  const handleClick = () => {
    setStoryModal(story);
    document.getElementById("storyModal").showModal();
  };

  return (
    <div
      className="flex w-17 flex-col items-center justify-center md:w-16"
      onClick={handleClick}>
      <Avatar
        isStory={true}
        size={"h-16 w-16 md:h-15 md:w-15"}
        img={story.attachment}
        ringSize={"h-17 w-16 md:h-16"}
      />
      <span className="w-[100%] overflow-hidden whitespace-nowrap">
        {story.creator.username}
      </span>
    </div>
  );
}

export default StoryCard;
