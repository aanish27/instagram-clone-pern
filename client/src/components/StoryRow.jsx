import StoryCard from "./StoryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { StoryModalContext } from "../provider/provider";

function StoryRow() {
  const [stories, setStories] = useState([]);
  const [storyModal, setStoryModal] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/story", { withCredentials: true })
      .then((response) => {
        setStories(response.data.stories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <StoryModalContext.Provider value={[storyModal, setStoryModal]}>
      <dialog
        id="storyModal"
        className="modal backdrop-blur backdrop-brightness-0">
        {/* <div>Instagram</div> */}
        <div className="modal-box flex h-[95vh] items-center justify-center">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
              ✕
            </button>
          </form>
          <img src={storyModal.attachment} alt="" className="h-100" />
          {/* <h3 className="text-lg font-bold">Hello!</h3> */}
          {/* <p className="py-4">{storyModal.id}</p> */}
        </div>
      </dialog>
      <div className="hide-scroll-bar flex min-w-full shrink-0 gap-2 overflow-x-scroll md:w-full md:gap-4">
        {stories &&
          stories.map((story) => {
            return <StoryCard key={story.id} story={story} />;
          })}
      </div>
    </StoryModalContext.Provider>
  );
}

export default StoryRow;
