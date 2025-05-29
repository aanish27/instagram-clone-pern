import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useState } from "react";
import {
  useSavePostMutation,
  useUnsavePostMutation,
} from "../hooks/Query/postQueryHooks";
import { useDispatch } from "react-redux";
import { setIsShareModalOpen } from "../app/features/uiSlice";
import {
  useStorePostLikeMutation,
  useUnlikePostMutation,
} from "../hooks/Query/likeQueryHooks";

function PostIconFooter({ postId, handleCommentClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const iconStyle = { fontSize: "25px" };
  const savePostMutation = useSavePostMutation();
  const unsavePostMutation = useUnsavePostMutation();
  const dispatch = useDispatch();
  const storeLikeMutation = useStorePostLikeMutation();
  const unlikeMutation = useUnlikePostMutation();

  const handleLikeButtonOnclick = async () => {
    if (!isLiked) {
      storeLikeMutation.mutate(
        {
          entityId: postId,
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

  const handleSaveClick = async () => {
    if (!isSaved) {
      savePostMutation.mutate(postId, {
        onSuccess: () => {
          setIsSaved(!isSaved);
        },
      });
    } else {
      unsavePostMutation.mutate(postId, {
        onSuccess: () => setIsSaved(!isSaved),
      });
    }
  };

  const handleShareClick = () => {
    dispatch(setIsShareModalOpen(true));
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex gap-3">
        <button onClick={handleLikeButtonOnclick} data-like-id={likeId}>
          {isLiked ? (
            <FaHeart style={iconStyle} className="text-red-500" />
          ) : (
            <FaRegHeart style={iconStyle} />
          )}
        </button>
        <button onClick={handleCommentClick}>
          <FaRegComment style={iconStyle} className="scale-x-[-1]" />
        </button>
        <IoPaperPlaneOutline style={iconStyle} onClick={handleShareClick} />
      </div>
      <button onClick={handleSaveClick}>
        {isSaved ? (
          <FaBookmark style={iconStyle} />
        ) : (
          <FaRegBookmark style={iconStyle} />
        )}
      </button>
    </div>
  );
}

export default PostIconFooter;
