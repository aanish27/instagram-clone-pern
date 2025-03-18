import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

function PostFooter({ username, caption, likes }) {
  const [isliked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!isliked);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-3">
          <button onClick={handleLikeClick}>
            {isliked ? (
              <FaHeart style={{ fontSize: "25px" }} className="text-red-500" />
            ) : (
              <FaRegHeart
                style={{ fontSize: "25px" }}
                className={isliked ? "text-red-500" : ""}
              />
            )}
          </button>
          <FaRegComment style={{ fontSize: "25px" }} />{" "}
          <IoPaperPlaneOutline style={{ fontSize: "25px" }} />
        </div>
        <FiBookmark style={{ fontSize: "25px" }} />
      </div>
      <div>
        <b>{likes} </b>likes
      </div>
      <div>
        <b>{username}</b> {caption}
        <span className="text-gray-400"> more</span>{" "}
      </div>
    </div>
  );
}

export default PostFooter;
