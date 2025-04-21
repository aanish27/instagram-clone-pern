import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { CommentModalContext } from "../provider/provider";

function PostFooter({ username, caption, likes, id, attachment }) {
  const [isliked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likeCount, setLikeCount] = useState(likes);
  const { postComment, setPostComment } = useContext(CommentModalContext);

  const handleLikeButtonOnclick = async () => {
    if (!isliked) {
      await axios
        .post(
          "http://localhost:3000/like",
          {
            entityId: id,
            entity: "POST",
          },
          { withCredentials: true },
        )
        .then((response) => {
          setLiked(!isliked);
          setLikeId(response.data.id);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .delete(`http://localhost:3000/like/${likeId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLiked(!isliked);
          setLikeCount(likeCount + 1);
          setLikeId(null);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCommentClick = () => {
    setPostComment({ username, caption, likes, id, attachment });
  };

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-3">
          <button onClick={handleLikeButtonOnclick} data-like-id={likeId}>
            {isliked ? (
              <FaHeart style={{ fontSize: "25px" }} className="text-red-500" />
            ) : (
              <FaRegHeart
                style={{ fontSize: "25px" }}
                className={isliked ? "text-red-500" : ""}
              />
            )}
          </button>
          <button onClick={handleCommentClick}>
            <FaRegComment
              style={{ fontSize: "25px" }}
              className="scale-x-[-1]"
            />
          </button>
          <IoPaperPlaneOutline style={{ fontSize: "25px" }} />
        </div>
        <FiBookmark style={{ fontSize: "25px" }} />
      </div>
      <div>
        <b>{likeCount} </b>likes
      </div>
      <div>
        <b>{username}</b> {caption}
        <span className="text-gray-400"> more</span>{" "}
      </div>
    </>
  );
}

export default PostFooter;
