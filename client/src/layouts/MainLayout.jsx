import Sidebar from "../components/Sidebar";
import NavbarMobile from "../components/NavbarMobile";
import FooterBarMobile from "../components/FooterBarMobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeViewPostModal } from "../app/helpers";
import ViewPostModal from "../modals/ViewPostModal";
import MoreOptionsModal from "../modals/MoreOptionsModal";
import {
  setIsOptionsModalOpen,
  setIsPostUploadModalOpen,
} from "../app/features/uiSlice";
import PostUploadModal from "../modals/PostUploadModal";
import ShareModal from "../modals/ShareModal";
import StoryModal from "../modals/StoryModal";

function MainLayout({ children }) {
  const {
    optionsModalProps,
    IsOptionsModalOpen,
    IsPostUploadModalOpen,
    PostEditModalProps,
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    closeViewPostModal(dispatch);
    dispatch(setIsOptionsModalOpen({ options: null, state: false }));
    dispatch(setIsPostUploadModalOpen(false));
  }, []);

  useEffect(() => {
    if (IsOptionsModalOpen) {
      document.getElementById("moreOptionsModal").showModal();
    }
  }, [IsOptionsModalOpen]);

  useEffect(() => {
    if (IsPostUploadModalOpen) {
      document.getElementById("postUploadModal").showModal();
    }
  }, [IsPostUploadModalOpen]);

  return (
    <>
      <ViewPostModal />
      <ShareModal />
      <StoryModal />
      <NavbarMobile />
      {IsOptionsModalOpen && <MoreOptionsModal props={optionsModalProps} />}
      {IsPostUploadModalOpen && <PostUploadModal props={PostEditModalProps} />}
      <div className="flex max-h-screen items-center justify-between overflow-hidden">
        <Sidebar />
        {children}
      </div>
      <FooterBarMobile />
    </>
  );
}

export default MainLayout;
