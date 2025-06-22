/* eslint-disable import/no-restricted-paths */
import { useState } from "react";
import {
  useDeleteFollowReqMutation,
  useSendFollowReqMutation,
} from "../features/follow/followQueryHooks";
import UserCard from "./UserCard";

function RightSidebarItem({ action = "Follow", user }) {
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
    <UserCard
      username={user.username}
      avatar={user.profile_pic}
      subText={user.name}>
      <button
        className="font-bold text-blue-500"
        data-followee-id={user.id}
        data-follow-req={reqId}
        onClick={handleFollowButtonOnclick}>
        {isReqSent ? "Sent" : action}
      </button>
    </UserCard>
  );
}

export default RightSidebarItem;
