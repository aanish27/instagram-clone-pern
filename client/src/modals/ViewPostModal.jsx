import { CiFaceSmile } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useEffect, useState } from "react";
import PostIconFooter from "../components/PostIconFooter";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { closeViewPostModal } from "../app/helpers";
import { setIsOptionsModalOpen } from "../app/features/uiSlice";
import { useGetCommentsQuery } from "../hooks/Query/commentQueryHooks";
import CommentForm from "../forms/CommentForm";
import IfAuthUser from "../app/helpers/IfAuthUser";
const storageUrl = import.meta.env.VITE_STORAGE_URL;
const regex = /^https:\/\/picsum\.photos\/seed\//;

function ViewPostModal({ post }) {
  const [comments, setComments] = useState(null);
  const { setFocus } = useForm();
  const dispatch = useDispatch();
  const options = [
    {
      title: "edit",
      onClick: { actionType: "editPost", data: { id: post.id } },
    },
    {
      title: "delete",
      onClick: { actionType: "deletePost", data: { id: post.id } },
    },
    { title: "hide like count to others", path: "/" },
    { title: "turn on commenting", path: "/" },
    { title: "go to post", path: "/" },
    { title: "share to...", path: "/" },
    { title: "copy link", path: "/" },
    { title: "embeded", path: "/" },
    { title: "about this account", path: "/" },
  ];

  const { isSuccess, data } = useGetCommentsQuery(post.id);

  useEffect(() => {
    if (isSuccess && data) {
      setComments(data);
    }
  }, [isSuccess, data]);

  const handleOptionsOnClick = () => {
    dispatch(
      setIsOptionsModalOpen({ props: { options: options }, state: true }),
    );
  };

  const handleCommentDeleteClick = (e) => {
    dispatch(
      setIsOptionsModalOpen({
        props: {
          options: [
            {
              title: "delete",
              onClick: {
                actionType: "deleteComment",
                data: {
                  commentId: e.target.dataset.id,
                  postId: post.id,
                },
              },
              textColor: "text-red-400",
            },
          ],
        },
        state: true,
      }),
    );
  };

  const modalOnClose = (e) => {
    if (e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    closeViewPostModal(dispatch);
    dispatch(setIsOptionsModalOpen({ options: null, state: false }));
  };

  return (
    <dialog
      id="viewPostModal"
      className="modal backdrop-blur"
      onClick={modalOnClose}
      onKeyDown={modalOnClose}>
      <div
        className="modal-box flex h-[80vh] w-[60vw] max-w-[100vw] flex-col items-center justify-center bg-black p-0"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex h-[100%] w-[100%]">
          <img
            src={
              regex.test(post.attachment)
                ? post.attachment
                : `${storageUrl}${post.attachment}`
            }
            className="w-[65%]"
          />
          <div className="flex w-[100%] flex-col p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar img={post.attachment} />
                <div className="flex flex-col p-3">
                  <div className="font-semibold">{post.username}</div>
                </div>
              </div>
              <IoEllipsisHorizontal onClick={handleOptionsOnClick} />
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
                        <div className="font-extralight">
                          <span className="mr-2 font-semibold">
                            {comment.creator.username}
                          </span>
                          {comment.text}
                          <div className="flex gap-3 text-xs text-gray-400">
                            <div>2hrs Ago</div>
                            <IfAuthUser userId={comment.creator.id}>
                              <div
                                onClick={handleCommentDeleteClick}
                                data-id={comment.id}>
                                Delete
                              </div>
                            </IfAuthUser>
                          </div>
                        </div>
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
                  <CommentForm postId={post.id} />
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

export default ViewPostModal;
