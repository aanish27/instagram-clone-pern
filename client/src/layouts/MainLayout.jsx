import Sidebar from "../components/Sidebar";
import NavbarMobile from "../components/NavbarMobile";
import FooterBarMobile from "../components/FooterBarMobile";

function MainLayout({ children }) {
  return (
    <>
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
