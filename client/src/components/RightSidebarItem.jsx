/* eslint-disable import/no-restricted-paths */
import { useState } from "react";
import {
  useDeleteFollowReqMutation,
  useSendFollowReqMutation,
} from "../features/follow/followQueryHooks";
import Avatar from "./Avatar";

function RightSidebarItem({ url, action, user }) {
  const [isReqSent, setReqSent] = useState(false);
  const [reqId, setReqId] = useState(null);
  const sendReqMutation = useSendFollowReqMutation();
  const deleteReqMutation = useDeleteFollowReqMutation();

  const handleFollowButtonOnclick = (e) => {
    const id = e.target.getAttribute("data-followee-id");
    if (!isReqSent) {
      sendReqMutation.mutate(
        { followeeId: id },
        {
          onSuccess: ({ id }) => {
            setReqSent(!isReqSent);
            setReqId(id);
          },
        },
      );
    } else {
      deleteReqMutation.mutate(reqId, {
        onSuccess: () => {
          setReqSent(!isReqSent);
        },
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
