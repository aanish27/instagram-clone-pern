import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { toggleNotificationReload } from "../app/features/uiSlice";
import {
  useAcceptFollowReqMutation,
  useDeleteFollowReqMutation,
} from "../hooks/Query/followQueryHooks";

function FollowReqCard({ avatar, name, username, message, reqId }) {
  const rejectRequestMutation = useDeleteFollowReqMutation();
  const acceptRequestMutation = useAcceptFollowReqMutation();
  const dispatch = useDispatch();

  const handleAcceptRequest = () => {
    acceptRequestMutation.mutate(reqId, {
      onSuccess: () => {
        dispatch(toggleNotificationReload());
      },
    });
  };

  const handleRejectRequest = () => {
    rejectRequestMutation.mutate(reqId, {
      onSuccess: () => {
        dispatch(toggleNotificationReload());
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <Avatar size={"h-13 w-13"} img={avatar} />
        <div className="truncate text-sm font-semibold">
          {username}
          <br />
          <span className="text-sm font-light text-gray-200">
            {message ? message : name}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="btn h-8 rounded-lg bg-blue-500"
          onClick={handleAcceptRequest}>
          Confirm
        </button>
        <button
          className="btn bg-insta-black h-8 rounded-lg"
          onClick={handleRejectRequest}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default FollowReqCard;
