import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSavePostMutation, useUnsavePostMutation } from "../postQueryHooks";

function SavePostButton({ postId, className = "" }) {
  const [isSaved, setIsSaved] = useState(false);
  const savePostMutation = useSavePostMutation();
  const unsavePostMutation = useUnsavePostMutation();

  const handleSaveClick = async () => {
    if (!isSaved) {
      savePostMutation.mutate(postId, {
        onSuccess: () => {
          setIsSaved(!isSaved);
        },
      });
    } else {
      unsavePostMutation.mutate(postId, {
        onSuccess: () => setIsSaved(!isSaved),
      });
    }
  };

  return (
    <button onClick={handleSaveClick} className={`${className}`}>
      {isSaved ? (
        <FaBookmark className="text-2xl" />
      ) : (
        <FaRegBookmark className="text-2xl" />
      )}
    </button>
  );
}

export default SavePostButton;
