import { CiFaceSmile } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CommentModalContext } from "../provider/provider";
import profile_pic from "../assets/car.jpg";
import PostIconFooter from "../components/PostIconFooter";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function CommentModal() {
  const [comments, setComments] = useState(null);
  const { postComment } = useContext(CommentModalContext);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setFocus
  } = useForm();

  useEffect(() => {
    reset();
    fetchComments();
  }, [postComment]);

  function fetchComments() {
    setValue("postId", postComment.id);

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
  }
  const handleCommentSubmitClick = (data) => {
    axios
      .post(`${serverUrl}/comment`, data, {
        withCredentials: true,
      })
      .then((response) => {
        reset();
        fetchComments();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentClick = () => {
     setFocus("text");
  };

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
            <div className="hide-scroll-bar flex h-full flex-col justify-between overflow-scroll">
              <div className="max-[80%] mt-1 overflow-y-scroll">
                {comments &&
                  comments.map((comment) => {
                    return (
                      <div
                        className="flex items-center gap-3 py-2"
                        key={comment.id}>
                        <img
                          src={profile_pic}
                          alt=""
                          className="h-10 w-10 rounded-full"
                        />
                        <p className="font-extralight">
                          <span className="mr-2 font-semibold">
                            {comment.creator.username}
                          </span>
                          {comment.text}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <div>
                <hr className="dark:bg-insta-black h-px border-0 bg-gray-200" />
                <PostIconFooter
                  postId={postComment.id}
                  handleCommentClick={handleCommentClick}
                />
                <div>{/* <div>liked by</div> */}</div>
                <hr className="dark:bg-insta-black h-px border-0 bg-gray-200" />
                <div className="flex items-center justify-center py-1">
                  <CiFaceSmile />
                  <form
                    action=""
                    className="flex w-full"
                    onSubmit={handleSubmit(handleCommentSubmitClick)}>
                    <input
                      type="text"
                      {...register("text", { required: true })}
                      className="w-full px-1 focus:outline-0"
                    />

                    <input
                      type="text"
                      hidden
                      {...register("postId", { required: true })}
                    />
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
