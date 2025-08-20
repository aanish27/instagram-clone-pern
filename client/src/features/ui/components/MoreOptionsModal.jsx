import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { useDeleteCommentMutation } from "../../../hooks/query/commentQueryHooks";
import { closeViewPostModal } from "../../../utils/helpers";
import { useUnfollowUserMutation } from "../../follow/followQueryHooks";
import { useDeletePostMutation } from "../../post/postQueryHooks";
import { useDeleteStoryMutation } from "../../story/storyQueryHooks";
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from "../../user/userQueryHooks";
import {
  hideStoryModal,
  setIsOptionsModalOpen,
  setIsPostEditModalOpen,
} from "../uiSlice";

function MoreOptionsModal({ props }) {
  const [propss, setProps] = useState(props);
  const dispatch = useDispatch();
  const unfollowMutation = useUnfollowUserMutation();
  const avatarRef = useRef(null);
  const updateAvatarMutation = useUpdateAvatarMutation();
  const deleteAvatarMutation = useDeleteAvatarMutation();
  const deletePostMutation = useDeletePostMutation();
  const deleteCommentMutation = useDeleteCommentMutation(); //postId i want to pass here
  const queryClient = useQueryClient();
  const deleteStoryMutation = useDeleteStoryMutation();

  const handleOptionClick = (option) => {
    switch (option.actionType) {
      case "unfollow":
        unfollowMutation.mutate(option.data.followerId);
        break;
      case "updateAvatar":
        avatarRef.current.click();
        break;
      case "deleteAvatar":
        deleteAvatarMutation.mutate();
        break;
      case "editPost":
        dispatch(
          setIsPostEditModalOpen({
            props: {
              isEdit: true,
              id: option.data.id,
            },
            state: true,
          }),
        );
        break;
      case "deletePost":
        setProps({
          title: "Delte Post",
          subtitle: " confrim delte post",
          options: [
            {
              title: "delete",
              onClick: {
                actionType: "confirmDeletePost",
                data: { id: option.data.id },
              },
              textColor: "text-red-400",
            },
          ],
        });
        break;
      case "confirmDeletePost":
        deletePostMutation.mutate(option.data.id);
        closeViewPostModal(dispatch);
        break;
      case "deleteStory":
        deleteStoryMutation.mutate(option.data.id);
        dispatch(hideStoryModal());
        break;
      case "deleteComment":
        deleteCommentMutation.mutate(option.data.commentId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["post/comments", option.data.postId],
            });
          },
        });
        break;
      default:
        break;
    }

    if (
      option.actionType !== "updateAvatar" &&
      option.actionType !== "editPost" &&
      option.actionType !== "deletePost"
    ) {
      modalOnClose();
    }
  };

  const modalOnClose = (e) => {
    if (e && e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    dispatch(setIsOptionsModalOpen({ options: null, state: false }));
  };

  const handleAvatarUpdate = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    if (!file) return;
    formData.append("profile_pic", file);
    updateAvatarMutation.mutate(formData, {
      onSuccess: () => {
        modalOnClose();
      },
    });
  };

  return (
    <dialog id="moreOptionsModal" className="modal" onKeyDown={modalOnClose}>
      <div className="modal-box m-0 p-0">
        <ul className="menu bg-insta-black rounded-box m-0 flex h-full w-full items-center justify-center p-0">
          {propss.title && (
            <li className="flex h-15 w-full flex-col items-center justify-center border-b-1 border-gray-600 text-lg capitalize">
              {propss.title}
              {propss.subtitle && (
                <span className="text-xs text-gray-500">{propss.subtitle}</span>
              )}
            </li>
          )}
          {propss.options &&
            propss.options.map((option, index) => {
              return (
                <li
                  key={index}
                  className="flex w-full items-center justify-center border-b-1 border-gray-600">
                  {option.onClick ? (
                    <button
                      onClick={() => handleOptionClick(option.onClick)}
                      className={`flex h-12 w-full items-center justify-center capitalize ${option.textColor && `${option.textColor} font-semibold`}`}>
                      {option.title}
                    </button>
                  ) : (
                    <Link
                      to={option.path}
                      className="flex h-12 w-full items-center justify-center capitalize">
                      {option.title}
                    </Link>
                  )}
                </li>
              );
            })}
          <input
            type="file"
            name="profile_pic"
            ref={avatarRef}
            className="hidden"
            onChange={handleAvatarUpdate}
          />
          <li
            className="flex w-full items-center justify-center"
            onClick={modalOnClose}>
            <a className="flex h-12 w-full items-center justify-center capitalize">
              Cancel
            </a>
          </li>
        </ul>
        <form method="dialog" className="modal-backdrop"></form>
      </div>
    </dialog>
  );
}

export default MoreOptionsModal;
