import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";
import NavbarMobile from "../components/NavbarMobile";
import FooterBarMobile from "../components/FooterBarMobile";
import { useState } from "react";
import { FetchPostContext } from "../provider/provider";

function Home() {
  const [isFetchAgain, setFetchAgain] = useState(true);

  return (
    <>
      <NavbarMobile />
      <div className="flex items-center justify-between">
        <FetchPostContext.Provider value={{ isFetchAgain, setFetchAgain }}>
          <Sidebar />
          <MainContent />
        </FetchPostContext.Provider>
        <RightSidebar />
      </div>
      <FooterBarMobile />
    </>
  );
}

export default Home;
