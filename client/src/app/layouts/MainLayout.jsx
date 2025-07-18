import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterBarMobile from "../../components/FooterBarMobile";
import NavbarMobile from "../../components/NavbarMobile";
import PostUploadModal from "../../features/post/components/PostUploadModal";
import ViewPostModal from "../../features/post/components/ViewPostModal";
import StoryModal from "../../features/story/components/StoryModal";
import Drawer from "../../features/ui/components/Drawer";
import MoreOptionsModal from "../../features/ui/components/MoreOptionsModal";
import ShareModal from "../../features/ui/components/ShareModal";
import Sidebar from "../../features/ui/components/Sidebar";
import {
  setIsOptionsModalOpen,
  setIsPostUploadModalOpen,
} from "../../features/ui/uiSlice";
import { closeViewPostModal } from "../../utils/helpers";

function MainLayout({ children }) {
  const {
    optionsModalProps,
    IsOptionsModalOpen,
    IsPostUploadModalOpen,
    PostEditModalProps,
    isDrawerActive,
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
      <div className="flex h-screen">
        <Sidebar />
        {isDrawerActive && <Drawer />}
        <div className="hide-scroll-bar w-full">{children}</div>
      </div>
      <FooterBarMobile />
    </>
  );
}

export default MainLayout;
