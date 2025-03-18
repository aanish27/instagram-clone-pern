import axios from "axios";

function RightSidebarItem({ url, action, user }) {
  const handleFollowButtonOnclick = async (e) => {
    const id = e.target.getAttribute("data-followee-id");

    await axios
      .post(
        "http://localhost:3000/follow/req",
        { followeeId: id },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={url} alt="" className="h-15 w-15 rounded-full" />
        <div className="flex flex-col p-3">
          <div className="font-semibold">{user.username}</div>
          <div className="font-extralight text-gray-400">{user.name}</div>
        </div>
      </div>
      <button
        className="font-bold text-blue-500"
        data-followee-id={user.id}
        onClick={handleFollowButtonOnclick}>
        {action}
      </button>
    </div>
  );
}

export default RightSidebarItem;
