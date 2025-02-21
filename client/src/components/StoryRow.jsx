import StoryCard from "./StoryCard";
import profile_pic from "../assets/car.jpg";

function StoryRow() {
  return (
    <div className="flex gap-2 overflow-x-scroll md:w-full md:gap-4">
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
