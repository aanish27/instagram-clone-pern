import { IoPaperPlaneOutline } from "react-icons/io5";
import { setIsShareModalOpen } from "../app/features/uiSlice";
import { useDispatch } from "react-redux";

function ShareButton() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(setIsShareModalOpen(true));
      }}>
      <IoPaperPlaneOutline className="text-2xl" />
    </button>
  );
}

export default ShareButton;
