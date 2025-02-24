import StoryRow from "./StoryRow";
import PostContainer from "./PostContainer";

function MainContent() {
  return (
    <main className="hide-scroll-bar my-10 h-screen w-full overflow-y-scroll p-1 md:my-0 md:px-5 lg:w-[50%] display-">
      <StoryRow />
      <div className="flex w-full flex-col items-center justify-center md:px-20">
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </div>
    </main>
  );
}

export default MainContent;
