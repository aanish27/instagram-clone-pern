import StoryCard from "./StoryCard";
import profile_pic from "../assets/car.jpg";

function StoryRow() {
  return (
    <div className="hide-scroll-bar flex gap-2 overflow-x-scroll md:w-full md:gap-4 min-w-full shrink-0">
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
  );
}

export default StoryRow;
