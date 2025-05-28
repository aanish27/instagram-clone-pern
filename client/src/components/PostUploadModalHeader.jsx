import { FaArrowLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function PostUploadModalHeader({
  isEdit = false,
  handleGoBackClick,
  showButton = false,
}) {
  return (
    <div className="flex w-full justify-between bg-black p-2">
      <button onClick={handleGoBackClick}>
        {showButton ? <FaArrowLeft /> : <IoClose />}
      </button>
      <h2 className="text-center">
        {isEdit ? "Edit Post" : "Create new Post"}
      </h2>
      <button
        type="submit"
        form="postUploadForm"
        className="font-semibold text-blue-500">
        {showButton ? (isEdit ? "Update" : "Share") : ""}
      </button>
    </div>
  );
}

export default PostUploadModalHeader;
