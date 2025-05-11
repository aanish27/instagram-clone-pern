import Avatar from "../components/Avatar";
import MainLayout from "../layouts/MainLayout";
import pic from "../assets/car.jpg";
import { RiSettings4Line } from "react-icons/ri";
import { HiPlus } from "react-icons/hi2";
import { useEffect, useMemo, useState } from "react";
import TabContent from "../components/TabContent";
import { useLoaderData } from "react-router";
import FollowModal from "../modals/FollowModal";

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [followModalTitle, setFollowModalTitle] = useState(null);
  const [followModalContent, setFollowModalContent] = useState(null);
  const tabs = ["Posts", "Saved", "Tagged"];
  const user = useLoaderData();

  useEffect(() => {
    if (followModalTitle && followModalContent) {
      document.getElementById("followModal").showModal();
    }
  }, [followModalTitle, followModalContent]);

  const savedPosts = useMemo(() => {
    return user.savedPosts.map((saved) => saved.post);
  }, [user]);

  const handleTabClick = (e) => {
    setActiveTab(Number(e.target.dataset.tab));
  };

  const followersOnClick = () => {
    setFollowModalTitle("follower");
    setFollowModalContent(user.followers);
  };

  const followingsOnClick = () => {
    setFollowModalTitle("following");
    setFollowModalContent(user.followings);
  };

  return (
    <MainLayout>
      {followModalTitle && followModalContent && (
        <FollowModal
          title={followModalTitle}
          content={followModalContent}
          setFollowModalTitle={setFollowModalTitle}
        />
      )}
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
