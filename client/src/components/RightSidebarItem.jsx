import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";

function RightSidebarItem({ url, action, user }) {
  const [isReqSent, setReqSent] = useState(false);
  const [reqId, setReqId] = useState(null);
  const handleFollowButtonOnclick = async (e) => {
    const id = e.target.getAttribute("data-followee-id");
    if (!isReqSent) {
      await axios
        .post(
          "http://localhost:3000/follow/req",
          { followeeId: id },
          { withCredentials: true },
        )
        .then((response) => {
          setReqSent(!isReqSent);
          setReqId(response.data.id);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .delete(`http://localhost:3000/follow/req/${reqId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setReqSent(!isReqSent);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar img={url} size={"h-15 w-15"} />
        <div className="flex flex-col p-3">
          <div className="font-semibold">{user.username}</div>
          <div className="font-extralight text-gray-400">{user.name}</div>
        </div>
      </div>
      <button
        className="font-bold text-blue-500"
        data-followee-id={user.id}
        data-follow-req={reqId}
        onClick={handleFollowButtonOnclick}>
        {isReqSent ? "Sent" : action}
      </button>
    </div>
  );
}

export default RightSidebarItem;
