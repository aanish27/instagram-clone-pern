import Sidebar from "../components/Sidebar";
import NavbarMobile from "../components/NavbarMobile";
import FooterBarMobile from "../components/FooterBarMobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentModal from "../modals/CommentModal";
import { closeViewPostModal } from "../app/helpers";

function MainLayout({ children }) {
  const post = useSelector((state) => state.post.viewPost);
  const IsViewModalOpen = useSelector((state) => state.ui.IsViewModalOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    closeViewPostModal(dispatch);
  }, []);

  useEffect(() => {
    if (!post) {
      return;
    }

    if (post && !IsViewModalOpen) {
      return;
    } else if (IsViewModalOpen) {
      document.getElementById("commentModal").showModal();
      return;
    }
  }, [IsViewModalOpen, post]);

  return (
    <>
      {IsViewModalOpen && <CommentModal post={post} />}
      <NavbarMobile />
      <div className="flex max-h-screen items-center justify-between overflow-hidden">
        <Sidebar />
        {children}
      </div>
      <FooterBarMobile />
    </>
  );
}

export default MainLayout;
