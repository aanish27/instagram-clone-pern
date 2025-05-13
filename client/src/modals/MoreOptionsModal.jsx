import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setIsOptionsModalOpen } from "../app/features/uiSlice";
import { useUnfollowUserMutation } from "../hooks/Query/followQueryHooks";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import axios from "axios";

function MoreOptionsModal({ props }) {
  const dispatch = useDispatch();
  const unfollowMutation = useUnfollowUserMutation();
  const handleOptionClick = (option) => {
    switch (option.actionType) {
      case "unfollow":
        unfollowMutation.mutate(option.data.followerId);
        break;
      default:
        break;
    }
    modalOnClose();
  };

  const { register, handleSubmit } = useForm();
  const modalOnClose = (e) => {
    if (e && e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    dispatch(setIsOptionsModalOpen({ options: null, state: false }));
  };

  const handleProfileUpdate = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "profile_pic") {
        const file = value?.[0];
        if (file) {
          formData.append(key, file); 
        }
      } else {
        formData.append(key, value);
      }
    });

    await axios
      .patch("http://localhost:3000/user/profile", formData, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
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
                    option.onClick.actionType === "uploadProfilePic" ? (
                      <form onSubmit={handleSubmit(handleProfileUpdate)}>
                        <Input
                          register={register}
                          type={"file"}
                          name={"profile_pic"}
                        />
                        <button>submit</button>
                      </form>
                    ) : (
                      <button
                        onClick={() => handleOptionClick(option.onClick)}
                        className={`flex h-12 w-full items-center justify-center capitalize ${option.textColor ? `${option.textColor} font-semibold` : ""}`}>
                        {option.title}
                      </button>
                    )
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
