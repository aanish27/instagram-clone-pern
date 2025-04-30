import Input from "../components/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { titleCase } from "title-case";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function FollowModal({ title, setFollowModalTitle, content }) {
  const [searchResult, setSearchResult] = useState(content);
  const isFollower = title === "follower" ? true : false;
  const { register, handleSubmit } = useForm();

  const removeOnClick = async (e) => {
    axios
      .delete(`${serverUrl}/follow/remove/${Number(e.target.dataset.id)}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const followingOnClick = (e) => {
    console.log(e.target.dataset.id);
  };

  const handleSearch = (data) => {
    axios
      .get(`${serverUrl}/follow/search`, {
        params: data,
        withCredentials: true,
      })
      .then((response) => {
        setSearchResult(response.data);
        console.log(response.data);
        console.log("search");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeOnClick = () => {
    setFollowModalTitle(null);
  };

  return (
    <dialog id="followModal" className="modal">
      <div className="modal-box bg-insta-black h-[55vh] overflow-clip">
        <h3 className="text-center text-lg">{`${titleCase(title)}s`}</h3>
        <hr className="my-2 w-full"></hr>
        <form onSubmit={handleSubmit(handleSearch)} className="flex gap-2">
          <Input
            register={register}
            type={"text"}
            placeholder={"Search"}
            name={isFollower ? title : "followee"}
            className={
              "input input-ghost h-10 w-[100%] rounded-lg bg-[#3d3a3c] focus:bg-[#3d3b3c]"
            }
          />
          <button> Search</button>
        </form>
        <div className="max-h-[40vh] overflow-scroll overflow-x-hidden">
          {searchResult &&
            searchResult.map((data) => {
              const user = isFollower ? data.follower : data.followee;
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between">
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
