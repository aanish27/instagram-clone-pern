import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightSidebar from "./components/RightSidebar";
import NavbarMobile from "./components/NavbarMobile";
import FooterBarMobile from "./components/FooterBarMobile";

function App() {
  return (
    <>
      <NavbarMobile />
      <div className="flex items-center justify-between">
        <Sidebar />
        <MainContent />
        <RightSidebar />
      </div>
      <FooterBarMobile />
    </>
  );
}

export default App;
