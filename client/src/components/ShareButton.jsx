/* eslint-disable import/no-restricted-paths */
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setIsShareModalOpen } from "../features/ui/uiSlice";

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
