import Sidebar from "../components/Sidebar";
import NavbarMobile from "../components/NavbarMobile";
import FooterBarMobile from "../components/FooterBarMobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeViewPostModal } from "../app/helpers";
import ViewPostModal from "../modals/ViewPostModal";
import MoreOptionsModal from "../modals/MoreOptionsModal";
import { setIsOptionsModalOpen } from "../app/features/uiSlice";

function MainLayout({ children }) {
  const post = useSelector((state) => state.post.viewPost);
  const { optionsModalProps, IsOptionsModalOpen, IsViewModalOpen } =
    useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    closeViewPostModal(dispatch);
    dispatch(setIsOptionsModalOpen({ options: null, state: false }));
  }, []);

  useEffect(() => {
    if (IsViewModalOpen && post) {
      document.getElementById("viewPostModal").showModal();
    }
  }, [IsViewModalOpen, post]);

  useEffect(() => {
    if (IsOptionsModalOpen) {
      document.getElementById("moreOptionsModal").showModal();
    }
  }, [IsOptionsModalOpen]);

  return (
    <>
      {IsOptionsModalOpen && <MoreOptionsModal props={optionsModalProps} />}
      {IsViewModalOpen && <ViewPostModal post={post} />}
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
