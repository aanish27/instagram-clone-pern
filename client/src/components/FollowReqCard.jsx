import Avatar from "./Avatar";

function FollowReqCard({ avatar, name, username, message }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <Avatar size={"h-13 w-13"} img={avatar} />
        <div className="text-sm font-semibold">
          {username}
          <br />
          <span className="text-sm font-light text-gray-200">
            {message ? message : name}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn rounded-xl bg-blue-500">Confirm</button>
        <button className="btn bg-insta-black rounded-xl">Delete</button>
      </div>
    </div>
  );
}

export default FollowReqCard;
