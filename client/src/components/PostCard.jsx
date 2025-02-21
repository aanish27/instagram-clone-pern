import profile_pic from "../assets/car.jpg";

function PostCard() {
  return (
    <div className="w-full p-0 md:w-[30vw]">
      <div className="">
        <img className="h-auto w-full" src={profile_pic} alt="" />
      </div>
    </div>
  );
}

export default PostCard;
