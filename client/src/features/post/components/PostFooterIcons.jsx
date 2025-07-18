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
    <div className="flex gap-3 py-2">
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
      <SavePostButton className="ml-auto" />
    </div>
  );
}

export default PostFooterIcons;
