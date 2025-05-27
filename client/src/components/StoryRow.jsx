import StoryCard from "./StoryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { StoryModalContext } from "../provider/provider";
import Avatar from "./Avatar";
import url from "../assets/avatar.jpg";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

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
        <div className="absolute top-0 left-0 p-2 text-2xl">Instagram</div>
        <div className="modal-box m-0 flex h-[95vh] rounded-2xl p-0">
          <div className="bg-insta-black flex w-full flex-col justify-between">
            <div className="flex justify-between p-2">
              <div className="flex items-center gap-2">
                <Avatar img={url} size={"h-15 w-15"} />
                <div>
                  batman27 <span className="text-sm">3h</span>
                </div>
              </div>
              <IoEllipsisHorizontal className="mx-2 text-2xl" />
            </div>
            <img src={storyModal.attachment} alt="" className="h-auto w-full" />
            <div className="flex items-center justify-center gap-3 p-2">
              <input
                type="text"
                className="w-[300px] rounded-2xl border-2 px-4 py-1"
              />
              <FaRegHeart className="text-2xl" />
              <IoPaperPlaneOutline className="text-2xl" />
            </div>
          </div>
        </div>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>
        </form>
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
