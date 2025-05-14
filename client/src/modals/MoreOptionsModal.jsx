import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setIsOptionsModalOpen } from "../app/features/uiSlice";
import { useUnfollowUserMutation } from "../hooks/Query/followQueryHooks";
import { useRef } from "react";
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from "../hooks/Query/userQueryHooks";

function MoreOptionsModal({ props }) {
  const dispatch = useDispatch();
  const unfollowMutation = useUnfollowUserMutation();
  const avatarRef = useRef(null);
  const updateAvatarMutation = useUpdateAvatarMutation();
  const deleteAvatarMutation = useDeleteAvatarMutation();

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
      default:
        break;
    }

    if (option.actionType != "updateAvatar") modalOnClose();
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
          {props.title && (
            <li className="flex h-15 w-full flex-col items-center justify-center border-b-1 border-gray-600 text-lg capitalize">
              {props.title}
              {props.subtitle && (
                <span className="text-xs text-gray-500">{props.subtitle}</span>
              )}
            </li>
          )}
          {props.options &&
            props.options.map((option, index) => {
              return (
                <li
                  key={index}
                  className="flex w-full items-center justify-center border-b-1 border-gray-600">
                  {option.onClick ? (
                    <button
                      onClick={() => handleOptionClick(option.onClick)}
                      className={`flex h-12 w-full items-center justify-center capitalize ${option.textColor ? `${option.textColor} font-semibold` : ""}`}>
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
