import Sidebar from "../components/Sidebar";
import NavbarMobile from "../components/NavbarMobile";
import FooterBarMobile from "../components/FooterBarMobile";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CommentModal from "../modals/CommentModal";

function MainLayout({ children }) {
  const post = useSelector((state) => state.post.viewPost);

  useEffect(() => {
    if (!post) {
      return;
    }

    document.getElementById("commentModal").showModal();
  }, [post]);
  return (
    <>
      {post && <CommentModal post={post} />}
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
