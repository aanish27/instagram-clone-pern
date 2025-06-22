import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiPlus } from "react-icons/hi2";
import { RiSettings4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLoaderData } from "react-router";
import Avatar from "../../components/Avatar";
import IfAuthUser from "../../components/IfAuthUser";
import TabContent from "../../components/TabContent";
import FollowModal from "../../features/follow/components/FollowModal";
import StoryRow from "../../features/story/components/StoryRow";
import { setIsOptionsModalOpen } from "../../features/ui/uiSlice";
import { useGetProfileQuery } from "../../features/user/userQueryHooks";
import MainLayout from "../layouts/MainLayout";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [followModalTitle, setFollowModalTitle] = useState(null);
  const [followModalContent, setFollowModalContent] = useState(null);
  const tabs = ["Posts", "Saved", "Tagged"];
  const user = useLoaderData();
  const dispatch = useDispatch();
  const {
    isError,
    isSuccess,
    data: profile,
    isPending,
  } = useGetProfileQuery(user.username);

  useEffect(() => {
    if (followModalTitle && followModalContent) {
      document.getElementById("followModal").showModal();
    }
  }, [followModalTitle, followModalContent]);

  if (isPending || isError) {
    return <span>Loading...</span>;
  }

  const profilePicOptions = [
    {
      title: "upload photo",
      onClick: {
        actionType: "updateAvatar",
        data: { username: user.username },
      },
      textColor: "text-blue-400",
    },
    {
      title: "remove current photo",
      onClick: {
        actionType: "deleteAvatar",
        data: { username: user.username },
      },
      textColor: "text-red-400",
    },
  ];

  const savedPosts = profile.savedPosts.map((saved) => saved.post);

  const handleTabClick = (e) => {
    setActiveTab(Number(e.target.dataset.tab));
  };

  const followersOnClick = () => {
    setFollowModalTitle("follower");
    setFollowModalContent(profile.followers);
  };

  const followingsOnClick = () => {
    setFollowModalTitle("following");
    setFollowModalContent(profile.followings);
  };

  const handleProfilePicOnClick = () => {
    dispatch(
      setIsOptionsModalOpen({
        props: { title: "change profile photo", options: profilePicOptions },
        state: true,
      }),
    );
  };

  return (
    <MainLayout>
      {isSuccess && profile && (
        <>
          {followModalTitle && followModalContent && (
            <FollowModal
              title={followModalTitle}
              content={followModalContent}
              setFollowModalTitle={setFollowModalTitle}
            />
          )}
          <div className="flex flex-col items-center justify-center gap-3 p-5">
            <div className="flex gap-2">
              <div className="group relative h-40 w-40">
                <Avatar
                  img={`${serverUrl}/${profile.profile_pic}`}
                  size={"h-40 w-40"}
                />
                <IfAuthUser userId={user.id}>
                  <button
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-white/30 text-sm text-black opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={handleProfilePicOnClick}>
                    <FaEdit className="text-3xl" />
                  </button>
                </IfAuthUser>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div>{user.username}</div>
                  <IfAuthUser userId={user.id}>
                    <Link
                      to={`/${user.username}/edit`}
                      className="btn btn-soft h-8">
                      Edit Profile
                    </Link>
                    <button className="btn btn-soft h-8">View Archive</button>
                    <button>
                      <RiSettings4Line className="text-2xl" />
                    </button>
                  </IfAuthUser>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">
                    <span className="pr-1 text-white">
                      {profile._count.posts}
                    </span>
                    posts
                  </div>
                  <div className="text-gray-400" onClick={followersOnClick}>
                    <span className="pr-1 text-white">
                      {profile._count.followers}
                    </span>
                    followers
                  </div>
                  <div className="text-gray-400" onClick={followingsOnClick}>
                    <span className="pr-1 text-white">
                      {profile._count.followings}
                    </span>
                    followings
                  </div>
                </div>
                <div className="mt-6">
                  {profile.name}
                  <div>{profile.bio}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 pt-5">
              <button className="btn btn-soft h-18 w-18 rounded-full">
                <HiPlus className="text-3xl" />
              </button>
              <StoryRow stories={profile.stories} isHighlight={true} />
            </div>
            <div role="tablist" className="tabs tabs-border">
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
              posts={profile.posts}
              savedPosts={savedPosts}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Profile;
