import { useDispatch } from "react-redux";
import { setIsStoryModalOpen } from "../app/features/uiSlice";
import { StoryCarousel } from "../components/StoryCarousel";

function StoryModal() {
  const dispatch = useDispatch();

  const modalOnClose = (e) => {
    if (e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    dispatch(setIsStoryModalOpen({ state: false, id: null }));
  };

  return (
    <dialog
      id="storyModal"
      className="modal backdrop-blur backdrop-brightness-0"
      onKeyDown={modalOnClose}>
      <div className="absolute top-0 left-0 p-2 text-2xl">Instagram</div>
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
