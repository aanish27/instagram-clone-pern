import { CiFaceSmile } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoEllipsisHorizontal, IoPaperPlaneOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { CommentModalContext } from "../provider/provider";
import profile_pic from "../assets/car.jpg";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function CommentModal() {
  const [isliked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [comments, setComments] = useState(null);
  const { postComment, setPostComment } = useContext(CommentModalContext);

  useEffect(() => {
    axios
      .get(`${serverUrl}/post/comments/${postComment.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const handleCommentSubmitClick = (data) => {
    axios
      .post(`${serverUrl}/comment`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLikeButtonOnclick = async () => {
    if (!isliked) {
      await axios
        .post(
          `${serverUrl}/like`,
          {
            entityId: postComment.id,
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
        .delete(`${serverUrl}/like/${likeId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLiked(!isliked);
          // setLikeCount(likeCount + 1);
          setLikeId(null);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const handleCommentClick = () => {
  //   // document.getElementById("commentModal").showModal();
  //   setValue("postId", id);
  // };

  return (
    <dialog id="commentModal" className="modal backdrop-blur">
      <div className="modal-box flex h-[80vh] w-[60vw] max-w-[100vw] flex-col items-center justify-center bg-black p-0">
        <div className="flex h-[100%] w-[100%]">
          <img src={postComment.attachment} alt="" className="w-[65%]" />
          <div className="flex w-[100%] flex-col p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={postComment.attachment}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col p-3">
                  <div className="font-semibold">{postComment.username}</div>
                </div>
              </div>
              <IoEllipsisHorizontal />
            </div>
            <hr className="dark:bg-insta-black h-px border-0 bg-gray-200" />
            <div className="flex h-full flex-col justify-between">
              <div className="max-[80%] hide-scroll-bar mt-3 overflow-scroll">
                {comments && comments.map((comment) => {
                  return (
                    <div className="flex items-center" key={comment.id}>
                      <img
                        src={profile_pic}
                        alt=""
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex gap-2 p-3">
                        <div className="font-semibold">
                          {comment.creator.username}
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <hr className="dark:bg-insta-black h-px border-0 bg-gray-200" />
                <div>
                  <div className="flex justify-between py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={handleLikeButtonOnclick}
                        data-like-id={likeId}>
                        {isliked ? (
                          <FaHeart
                            style={{ fontSize: "25px" }}
                            className="text-red-500"
                          />
                        ) : (
                          <FaRegHeart
                            style={{ fontSize: "25px" }}
                            className={isliked ? "text-red-500" : ""}
                          />
                        )}
                      </button>
                      <FaRegComment
                        style={{ fontSize: "25px" }}
                        className="scale-x-[-1]"
                      />
                    </div>
                    <FiBookmark style={{ fontSize: "25px" }} />
                  </div>
                  {/* <div>liked by</div> */}
                  <hr className="dark:bg-insta-black h-px border-0 bg-gray-200" />
                </div>
                <div className="flex items-center justify-center py-1">
                  <CiFaceSmile />
                  <form
                    action=""
                    className="flex w-full"
                    onSubmit={handleSubmit(handleCommentSubmitClick)}>
                    <input
                      type="text"
                      {...register("text")}
                      className="w-full px-1 focus:outline-0"
                    />

                    <input type="text" hidden {...register("postId")} />
                    <button className="ml-auto font-semibold text-blue-400">
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default CommentModal;
