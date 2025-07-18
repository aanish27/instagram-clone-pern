import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetRequestsQuery } from "../../follow/followQueryHooks";
import FollowReqCard from "./FollowReqCard";

const FollowRequests = ({ setIsShowRequests }) => {
  const isReload = useSelector((state) => state.ui.NotificationReload);
  const { isSuccess, data: requests, refetch } = useGetRequestsQuery();

  useEffect(() => {
    refetch();
  }, [isReload]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex">
        <FaChevronLeft
          className="mr-auto text-xl"
          onClick={() => {
            setIsShowRequests(false);
          }}
        />
        <div className="mr-auto font-semibold">Follow Requests</div>
      </div>
      {isSuccess &&
        requests?.map((request) => {
          return (
            <FollowReqCard
              key={request.id}
              username={request.follower.username}
              name={request.follower.name}
              avatar={request.follower.profile_pic}
              reqId={request.id}
            />
          );
        })}
    </div>
  );
};

export default FollowRequests;
