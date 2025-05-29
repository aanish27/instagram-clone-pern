import { useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { setIsShareModalOpen } from "../app/features/uiSlice";
import {
  useStoreStoryLikeMutation,
  useUnlikeStoryMutation,
} from "../hooks/Query/likeQueryHooks";
import { useState } from "react";

function StoryCard({ id, profile_pic, username, attachment }) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const storeLikeMutation = useStoreStoryLikeMutation();
  const unlikeMutation = useUnlikeStoryMutation();

  const handleShareClick = () => {
    dispatch(setIsShareModalOpen(true));
  };

  const handleLikeButtonOnclick = async () => {
    if (!isLiked) {
      storeLikeMutation.mutate(
        {
          entityId: id,
          entity: "POST",
        },
        {
          onSuccess: (data) => {
            setIsLiked(!isLiked);
            setLikeId(data.id);
          },
        },
      );
    } else {
      unlikeMutation.mutate(Number(likeId), {
        onSuccess: () => {
          setIsLiked(!isLiked);
          setLikeId(null);
        },
      });
    }
  };

  return (
    <div className="bg-insta-black flex h-full w-[25vw] flex-col justify-between">
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <Avatar img={profile_pic} size={"h-15 w-15"} />
          <div>
            {username} <span className="text-sm">3h</span>
          </div>
        </div>
        <IoEllipsisHorizontal className="mx-2 text-2xl" />
      </div>
      <img src={attachment} className="h-auto w-full" />
      <div className="flex items-center justify-center gap-3 p-2">
        <input
          type="text"
          className="w-[300px] rounded-2xl border-2 px-4 py-1"
        />
        <button onClick={handleLikeButtonOnclick} data-like-id={likeId}>
          {isLiked ? (
            <FaHeart className="text-2xl text-red-500" />
          ) : (
            <FaRegHeart className="text-2xl" />
          )}
        </button>
        <IoPaperPlaneOutline className="text-2xl" onClick={handleShareClick} />
      </div>
    </div>
  );
}

export default StoryCard;
