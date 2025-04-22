import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function PostIconFooter({ postId, handleCommentClick }) {
  const [isliked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const iconStyle = { fontSize: "25px" };

  const handleLikeButtonOnclick = async () => {
    if (!isliked) {
      await axios
        .post(
          `${serverUrl}/like`,
          {
            entityId: postId,
            entity: "POST",
          },
          { withCredentials: true },
        )
        .then((response) => {
          setLiked(!isliked);
          setLikeId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .delete(`${serverUrl}/like/${likeId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLiked(!isliked);
          // setLikeCount(likeCount + 1);
          setLikeId(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex gap-3">
        <button onClick={handleLikeButtonOnclick} data-like-id={likeId}>
          {isliked ? (
            <FaHeart style={iconStyle} className="text-red-500" />
          ) : (
            <FaRegHeart
              style={iconStyle}
              className={isliked ? "text-red-500" : ""}
            />
          )}
        </button>
        <button onClick={handleCommentClick}>
          <FaRegComment style={iconStyle} className="scale-x-[-1]" />
        </button>
        <IoPaperPlaneOutline style={iconStyle} />
      </div>
      <FiBookmark style={iconStyle} />
    </div>
  );
}

export default PostIconFooter;
