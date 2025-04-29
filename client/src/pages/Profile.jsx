import Avatar from "../components/Avatar";
import MainLayout from "../layouts/MainLayout";
import pic from "../assets/car.jpg";
import { RiSettings4Line } from "react-icons/ri";
import { HiPlus } from "react-icons/hi2";
import { useMemo, useState } from "react";
import TabContent from "../components/TabContent";
import { useLoaderData } from "react-router";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [followModalH1, setFollowModalH1] = useState(null);
  const [followModalContent, setFollowModalContent] = useState(null);
  const tabs = ["Posts", "Saved", "Tagged"];
  const user = useLoaderData();

  const savedPosts = useMemo(() => {
    return user.UsersSavedPosts.map((saved) => saved.post);
  }, [user]);

  const { register, handleSubmit } = useForm();

  const handleSearch = () => {};

  const handleTabClick = (e) => {
    setActiveTab(Number(e.target.dataset.tab));
  };

  const followersOnClick = () => {
    setFollowModalH1("Followers");
    setFollowModalContent(user.followers);
    document.getElementById("followModal").showModal();
  };

  const followingsOnClick = () => {
    setFollowModalH1("Followings");
    setFollowModalContent(user.followings);
    document.getElementById("followModal").showModal();
  };

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

  return (
    <MainLayout>
      <dialog id="followModal" className="modal">
        <div className="modal-box bg-insta-black h-[55vh] overflow-clip">
          <h3 className="text-center text-lg">{followModalH1}</h3>
          <hr className="my-2 w-full"></hr>
          <form onSubmit={handleSubmit(handleSearch)} className="flex gap-2">
            <Input
              register={register}
              type={"text"}
              placeholder={"Search"}
              name={"search"}
              className={
                "input input-ghost h-10 w-[100%] rounded-lg bg-[#3d3a3c] focus:bg-[#3d3b3c]"
              }
            />
            <button> Search</button>
          </form>

          <div className="max-h-[40vh] overflow-scroll overflow-x-hidden">
            {followModalContent &&
              followModalContent.map((user) => {
                if (followModalH1 == "Followers") {
                  return (
                    <div
                      key={user.follower.id}
                      className="flex items-center justify-between">
                      <div className="flex w-full items-center">
                        <img
                          src={user.follower.profile_pic}
                          className="h-15 w-15 rounded-full"
                        />
                        <div className="flex flex-col p-3">
                          <div className="font-semibold">
                            {user.follower.name}
                          </div>
                        </div>
                        <button
                          className="btn btn-black ml-auto h-8"
                          onClick={removeOnClick}
                          data-id={user.follower.id}>
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={user.followee.id}
                      className="m-1 my-2 flex items-center justify-between">
                      <div className="flex w-full items-center">
                        <img
                          src={user.followee.profile_pic}
                          className="h-15 w-15 rounded-full"
                        />
                        <div className="flex flex-col p-3">
                          <div className="font-semibold">
                            {user.followee.name}
                          </div>
                        </div>
                        <button
                          className="btn btn-black ml-auto h-8"
                          data-id={user.followee.id}
                          onClick={followingOnClick}>
                          Following
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
      <div className="flex h-screen w-full items-center justify-center overflow-scroll">
        <div className="flex h-screen w-[50vw] flex-col gap-3">
          <div className="mt-10 flex gap-2">
            <Avatar img={pic} size={"h-40 w-40"} />
            <div className="ml-[100px] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div>{user.username}</div>
                <button className="btn btn-soft h-8">edit profile</button>
                <button className="btn btn-soft h-8">veiw archive</button>
                <button>
                  <RiSettings4Line style={{ fontSize: "25px" }} />
                </button>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-400">
                  <span className="pr-1 text-white">{user._count.posts}</span>
                  posts
                </div>
                <div className="text-gray-400" onClick={followersOnClick}>
                  <span className="pr-1 text-white">
                    {user._count.followers}
                  </span>
                  followers
                </div>
                <div className="text-gray-400" onClick={followingsOnClick}>
                  <span className="pr-1 text-white">
                    {user._count.followings}
                  </span>
                  followings
                </div>
              </div>
              <div className="mt-6">
                {user.name}
                <div>{user.bio}</div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 pt-5">
            <button className="btn btn-soft h-18 w-18 rounded-full">
              <HiPlus style={{ fontSize: "100px" }} />
            </button>
            <Avatar img={pic} size={"h-18 w-18"} />
            <Avatar img={pic} size={"h-18 w-18"} />
            <Avatar img={pic} size={"h-18 w-18"} />
            <Avatar img={pic} size={"h-18 w-18"} />
            <Avatar img={pic} size={"h-18 w-18"} />
            <Avatar img={pic} size={"h-18 w-18"} />
            <Avatar img={pic} size={"h-18 w-18"} />
          </div>
          <div
            role="tablist"
            className="tabs tabs-border mb-2 flex items-center justify-center">
            {tabs.map((tab, index) => (
              <a
                key={index}
                role="tab"
                className={`tab ${activeTab === index ? "tab-active" : ""}`}
                data-tab={index}
                onClick={handleTabClick}>
                {tab}
              </a>
            ))}
          </div>
          <TabContent
            activeTab={activeTab}
            posts={user.posts}
            savedPosts={savedPosts}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
