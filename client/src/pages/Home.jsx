import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
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
      <div className="flex items-center justify-between max-h-screen overflow-hidden">
        <FetchPostContext.Provider value={{ isFetchAgain, setFetchAgain }}>
          <Sidebar />
          <Feed />
        </FetchPostContext.Provider>
        <RightSidebar />
      </div>
      <FooterBarMobile />
    </>
  );
}

export default Home;
