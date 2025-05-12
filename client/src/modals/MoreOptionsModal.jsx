import { Link } from "react-router";

function MoreOptionsModal({ options }) {
  return (
    <dialog id="moreOptionsModal" className="modal">
      <div className="modal-box m-0 p-0">
        <ul className="menu bg-insta-black rounded-box m-0 flex h-full w-full items-center justify-center p-0">
          <li className="w-full border-b-1 border-gray-600">
            <Link
              to="/admin99"
              className="flex w-full items-center justify-center capitalize">
              title
            </Link>
          </li>

          <li className="w-full">
            <Link
              to="/admin99"
              className="flex w-full items-center justify-center capitalize">
              Cancel
            </Link>
          </li>
        </ul>
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"></button>
        </form>
      </div>
    </dialog>
  );
}

export default MoreOptionsModal;
