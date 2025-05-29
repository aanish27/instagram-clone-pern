import { useState } from "react";
import {
  useSavePostMutation,
  useUnsavePostMutation,
} from "../hooks/Query/postQueryHooks";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function SavePostButton({ postId }) {
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
    <button onClick={handleSaveClick}>
      {isSaved ? (
        <FaBookmark className="text-2xl" />
      ) : (
        <FaRegBookmark className="text-2xl" />
      )}
    </button>
  );
}

export default SavePostButton;
