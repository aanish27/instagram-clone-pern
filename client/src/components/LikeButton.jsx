import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikeButton({ likeMutation, unlikeMutation, entityId, entity }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  const handleLikeButtonOnclick = async () => {
    if (!isLiked) {
      likeMutation.mutate(
        {
          entityId: entityId,
          entity: entity,
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
    <button onClick={handleLikeButtonOnclick} data-like-id={likeId}>
      {isLiked ? (
        <FaHeart className="text-2xl text-red-500" />
      ) : (
        <FaRegHeart className="text-2xl" />
      )}
    </button>
  );
}

export default LikeButton;
