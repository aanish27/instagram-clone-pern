import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import RightSidebar from "./components/RightSidebar";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import StoryCard from "./components/StoryCard";
import profile_pic from "./assets/car.jpg";
import PostContainer from "./components/PostContainer";

function App() {
  return (
    <>
      <div className="flex items-center justify-between">
        <nav className="lobster-regular fixed top-0 right-0 flex h-10 w-full items-center justify-between p-1 md:hidden">
          <div className="text-2xl">Instagram</div>
          <div className="flex gap-2">
            <FaRegHeart className="text-2xl" />
            <LuMessageCircleMore className="text-2xl" />
          </div>
        </nav>
        <Sidebar />
        <main className="my-10 h-screen w-full overflow-scroll p-1 md:my-0 md:px-5">
          {/* <div className="flex flex-col items-center justify-center"> */}
            <div className="flex gap-2 overflow-x-scroll md:gap-4 md:w-full ">
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
              <StoryCard url={profile_pic} username={"aanish"} />
            </div>
            <PostContainer />
            <PostContainer />
          {/* </div> */}
        </main>
      </div>
      {/* <div className="flex items-center justify-between"> */}

      {/* <Main /> */}
      {/* <RightSidebar /> */}
      {/* </div> */}
      <nav className="lobster-regular fixed right-0 bottom-0 flex h-10 w-full items-center justify-between bg-black md:hidden">
        <div className="text-2xl">Instagram</div>
        <div className="flex gap-2">
          <FaRegHeart className="text-2xl" />
          <LuMessageCircleMore className="text-2xl" />
        </div>
      </nav>
    </>
  );
}

export default App;
