import { useContext } from "react";
import { StoryModalConext } from "../provider/provider";

function StoryCard({ story }) {
  const [StoryModal, setStoryModal] = useContext(StoryModalConext);

  const handleClick = () => {
    setStoryModal(story);
    document.getElementById("storyModal").showModal();
  };
  return (
    <div
      className="flex w-17 flex-col items-center justify-center md:w-16"
      onClick={handleClick}>
      <div className="flex h-17 w-[100%] flex-col items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 overflow-ellipsis md:h-16">
        <img
          src={story.attachment}
          alt=""
          className="h-16 w-16 rounded-full md:h-15 md:w-15"
        />
      </div>
      <span className="w-[100%] truncate"> {story.creator.username} </span>
    </div>
  );
}

export default StoryCard;
