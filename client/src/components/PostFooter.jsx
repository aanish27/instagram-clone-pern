import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

function PostFooter({ username, caption, likes, id, attachment }) {
  const [isliked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likeCount, setLikeCount] = useState(likes);

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
    document.getElementById("commentModal").showModal();
  };

  return (
    <div>
      <dialog id="commentModal" className="modal backdrop-blur">
        <div className="modal-box bg-insta-black flex h-[80vh] w-[60vw] max-w-[100vw] flex-col items-center justify-center p-0">
          <div className="flex w-[100%] justify-between bg-black p-2">
            <button>
              <FaArrowLeft />
            </button>
            <h2>Create new Post</h2>
            <button
              type="submit"
              form="postUploadForm"
              className="font-semibold text-blue-500">
              Share
            </button>
          </div>
          <div className="flex h-[100%] w-[100%]">
            <img src={attachment} alt="" className="w-[65%]" />
            <div className="flex w-[100%] flex-col p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={attachment}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col p-3">
                    <div className="font-semibold">Aanish</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
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
            <FaRegComment style={{ fontSize: "25px" }} />
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
    </div>
  );
}

export default PostFooter;
