import { useEffect } from "react";

const useToggleModal = (isOpen, modalId) => {
  useEffect(() => {
    if (isOpen) {
      document.getElementById(modalId).showModal();
    } else {
      document.getElementById(modalId).close();
    }
  }, [isOpen]);
};

export default useToggleModal;
