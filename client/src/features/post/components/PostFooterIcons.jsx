import { FaRegComment } from "react-icons/fa";
import LikeButton from "../../../components/LikeButton";
import ShareButton from "../../../components/ShareButton";
import {
  useStorePostLikeMutation,
  useUnlikePostMutation,
} from "../../../hooks/query/likeQueryHooks";
import SavePostButton from "./SavePostButton";

function PostFooterIcons({ postId, handleCommentClick }) {
  const storeLikeMutation = useStorePostLikeMutation();
  const unlikeMutation = useUnlikePostMutation();

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex gap-3">
        <LikeButton
          likeMutation={storeLikeMutation}
          unlikeMutation={unlikeMutation}
          entityId={postId}
          entity={"POST"}
        />
        <button onClick={handleCommentClick}>
          <FaRegComment className="scale-x-[-1] text-2xl" />
        </button>
        <ShareButton />
      </div>
      <SavePostButton />
    </div>
  );
}

export default PostFooterIcons;
