import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  useRemoveFollowerMutation,
  useSearchFollowersQuery,
  useUnfollowUserMutation,
} from "../hooks/Query/followQueryHooks";
import { useQueryClient } from "@tanstack/react-query";

function FollowModal({ title, setFollowModalTitle, content }) {
  const [searchParams, setSearchParams] = useState(null);
  const isFollower = title === "follower" ? true : false;
  const { register, handleSubmit } = useForm();
  const unfollowMutation = useUnfollowUserMutation();
  const removeFollowerMutation = useRemoveFollowerMutation();
  const { data: searchResult, refetch } = useSearchFollowersQuery(
    searchParams,
    {
      enabled: !!searchParams,
    },
  );
  const queryClient = useQueryClient();
  const removeOnClick = async (e) => {
    removeFollowerMutation.mutate(e.target.dataset.id);
  };

  const followingOnClick = (e) => {
    unfollowMutation.mutate(e.target.dataset.id);
  };

  const handleSearch = (data) => {
    setSearchParams(data);
    refetch();
  };

  const closeOnClick = () => {
    setFollowModalTitle(null);
    queryClient.removeQueries("userSearch");
  };

  return (
    <dialog id="followModal" className="modal">
      <div className="modal-box bg-insta-black h-[55vh] overflow-clip">
        <h3 className="text-center text-lg uppercase">{`${title}s`}</h3>
        <hr className="my-2 w-full"></hr>
        <form onSubmit={handleSubmit(handleSearch)} className="flex gap-2">
          <Input
            register={register(isFollower ? title : "followee")}
            type={"text"}
            placeholder={"Search"}
            className={
              "input input-ghost h-10 w-[100%] rounded-lg bg-[#3d3a3c] focus:bg-[#3d3b3c]"
            }
          />
          <button> Search</button>
        </form>
        <div className="max-h-[40vh] overflow-scroll overflow-x-hidden">
          {(searchResult ?? content)?.map((data) => {
            const user = isFollower ? data.follower : data.followee;
            return (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex w-full items-center">
                  <img
                    src={user.profile_pic}
                    className="h-15 w-15 rounded-full"
                  />
                  <div className="flex flex-col p-3">
                    <div className="font-semibold">{user.username}</div>
                  </div>
                  <button
                    className="btn btn-black ml-auto h-8"
                    data-id={user.id}
                    onClick={isFollower ? removeOnClick : followingOnClick}>
                    {isFollower ? "Remove" : "Following"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={closeOnClick}>
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default FollowModal;
