import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setIsOptionsModalOpen } from "../app/features/uiSlice";
import { useEffect } from "react";

function MoreOptionsModal({ props }) {
  const dispatch = useDispatch();
  console.log(props);

  const modalOnClose = (e) => {
    if (e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    dispatch(setIsOptionsModalOpen({ options: null, state: false }));
  };

  return (
    <dialog id="moreOptionsModal" className="modal" onKeyDown={modalOnClose}>
      <div className="modal-box m-0 p-0">
        <ul className="menu bg-insta-black rounded-box m-0 flex h-full w-full items-center justify-center p-0">
          {props.title && (
            <li
              className="flex w-full items-center justify-center"
              onClick={modalOnClose}>
              <a className="flex h-15 w-full flex-col items-center justify-center text-lg capitalize">
                {props.title}
                {props.subtitle && (
                  <span className="text-xs text-gray-500">
                    {props.subtitle}
                  </span>
                )}
              </a>
            </li>
          )}
          {props.options &&
            props.options.map((option, index) => {
              return (
                <li
                  key={index}
                  className="flex w-full items-center justify-center border-b-1 border-gray-600">
                  <Link
                    to={option.path}
                    className="flex h-12 w-full items-center justify-center capitalize">
                    {option.title}
                  </Link>
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
