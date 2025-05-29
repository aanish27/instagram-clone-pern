import Avatar from "./Avatar";
import { IoEllipsisHorizontal } from "react-icons/io5";
import {
  useStoreStoryLikeMutation,
  useUnlikeStoryMutation,
} from "../hooks/Query/likeQueryHooks";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

function StoryCard({ id, profile_pic, username, attachment }) {
  const storeLikeMutation = useStoreStoryLikeMutation();
  const unlikeMutation = useUnlikeStoryMutation();

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
        <LikeButton
          likeMutation={storeLikeMutation}
          unlikeMutation={unlikeMutation}
          entity={"STORY"}
          entityId={id}
        />
        <ShareButton />
      </div>
    </div>
  );
}

export default StoryCard;
