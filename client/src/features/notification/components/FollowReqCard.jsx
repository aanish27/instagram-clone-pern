import { useDispatch } from "react-redux";
import Avatar from "../../../components/Avatar";
import {
  useAcceptFollowReqMutation,
  useDeleteFollowReqMutation,
} from "../../follow/followQueryHooks";
import { toggleNotificationReload } from "../../ui/uiSlice";

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
      <div className="flex items-center gap-2">
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
          className="h-8 rounded-lg bg-blue-500 px-2"
          onClick={handleAcceptRequest}>
          Confirm
        </button>
        <button
          className="bg-insta-black h-8 rounded-lg px-2"
          onClick={handleRejectRequest}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default FollowReqCard;
