import { CiFaceSmile } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import PostIconFooter from "../components/PostIconFooter";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { closeViewPostModal } from "../app/helpers";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function CommentModal({ post }) {
  const [comments, setComments] = useState(null);
  const { register, handleSubmit, setValue, reset, setFocus } = useForm();
  const post = useSelector((state) => state.post.viewPost);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  useEffect(() => {
    reset();
    fetchComments();
  }, []);

  function fetchComments() {
    setValue("postId", post.id);

    axios
      .get(`${serverUrl}/post/comments/${post.id}`, {
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

  const modalOnClose = (e) => {
    if (e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    closeViewPostModal(dispatch);
  };

  return (
    <dialog
      id="commentModal"
      className="modal backdrop-blur"
      onClick={modalOnClose}
      onKeyDown={modalOnClose}>
      <div
        className="modal-box flex h-[80vh] w-[60vw] max-w-[100vw] flex-col items-center justify-center bg-black p-0"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex h-[100%] w-[100%]">
          <img src={post.attachment} alt="" className="w-[65%]" />
          <div className="flex w-[100%] flex-col p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar img={post.attachment} />
                <div className="flex flex-col p-3">
                  <div className="font-semibold">
                    {/* {post.username ? post.username : authUser.username} */}
                  </div>
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
                        <Avatar img={post.attachment} />
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
                  postId={post.id}
                  handleCommentClick={() => {
                    setFocus("text");
                  }}
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
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default CommentModal;
