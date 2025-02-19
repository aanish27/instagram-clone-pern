import Sidebar from "./components/Sidebar";
import profile_pic from "./assets/car.jpg";
import StoryCard from "./components/StoryCard";

function App() {
  return (
    <div className="flex items-center justify-between">
      <Sidebar />
      <main className="h-[100vh]">
        <div className="flex gap-2">
          <StoryCard url={profile_pic} username={"aanish"} />
          <StoryCard url={profile_pic} username={"aanish"} />
          <StoryCard url={profile_pic} username={"aanish"} />
          <StoryCard url={profile_pic} username={"aanish"} />
          <StoryCard url={profile_pic} username={"aanish"} />
          <StoryCard url={profile_pic} username={"aanish"} />
          <StoryCard url={profile_pic} username={"aanish"} />
        </div>
        <div>Posts</div>
      </main>
      <div>Right Sidebar</div>
    </div>
  );
}

export default App;
