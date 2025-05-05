import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function PostIconFooter({ postId, handleCommentClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const iconStyle = { fontSize: "25px" };

  const handleLikeButtonOnclick = async () => {
    if (!isLiked) {
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
          setIsLiked(!isLiked);
          setLikeId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .delete(`${serverUrl}/like/${Number(likeId)}`, {
          withCredentials: true,
        })
        .then((response) => {
          setIsLiked(!isLiked);
          // setLikeCount(likeCount + 1);
          setLikeId(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSaveClick = async () => {
    const url = `${serverUrl}/post/saved/${postId}`;
    if (!isSaved) {
      await axios
        .post(url, {}, { withCredentials: true })
        .then((response) => {
          setIsSaved(!isSaved);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .delete(url, {
          withCredentials: true,
        })
        .then((response) => {
          setIsSaved(!isSaved);
          console.log(response);
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
          {isLiked ? (
            <FaHeart style={iconStyle} className="text-red-500" />
          ) : (
            <FaRegHeart style={iconStyle} />
          )}
        </button>
        <button onClick={handleCommentClick}>
          <FaRegComment style={iconStyle} className="scale-x-[-1]" />
        </button>
        <IoPaperPlaneOutline style={iconStyle} />
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
