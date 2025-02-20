import profile_pic from "../assets/car.jpg";

function PostCard() {
  return (
    <div className="w-[30vw]">
      <div className="">
        <img className="h-[70vh] w-[30vw]" src={profile_pic} alt="" />
      </div>
    </div>
  );
}

export default PostCard;
