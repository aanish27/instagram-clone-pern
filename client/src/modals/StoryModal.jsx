import { useDispatch, useSelector } from "react-redux";
import { hideStoryModal } from "../app/features/uiSlice";
import { StoryCarousel } from "../components/StoryCarousel";
import { useEffect } from "react";
import BrandName from "../components/BrandName";

function StoryModal() {
  const { IsStoryModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (IsStoryModalOpen) {
      document.getElementById("storyModal").showModal();
    } else {
      document.getElementById("storyModal").close();
    }
  }, [IsStoryModalOpen]);

  const modalOnClose = (e) => {
    if (e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    dispatch(hideStoryModal());
  };

  return (
    <dialog
      id="storyModal"
      className="modal backdrop-blur backdrop-brightness-0"
      onKeyDown={modalOnClose}>
      <div className="absolute top-0 left-0 p-2">
        <BrandName />
      </div>
      <div className="modal-box m-0 flex h-[95vh] min-w-[40vw] rounded-2xl p-0">
        <StoryCarousel />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
          onClick={modalOnClose}>
          ✕
        </button>
      </form>
    </dialog>
  );
}

export default StoryModal;
