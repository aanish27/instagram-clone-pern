import Avatar from "../components/Avatar";
import MainLayout from "../layouts/MainLayout";
import pic from "../assets/car.jpg";
import { RiSettings4Line } from "react-icons/ri";
import { HiPlus } from "react-icons/hi2";
import { useMemo, useState } from "react";
import TabContent from "../components/TabContent";
import { useLoaderData } from "react-router";

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const user = useLoaderData();

  const savedPosts = useMemo(() => {
    return user.UsersSavedPosts.map((saved) => saved.post);
  }, [user]);

  const tabs = ["Posts", "Saved", "Tagged"];
  const handleTabClick = (e) => {
    setActiveTab(Number(e.target.dataset.tab));
  };

  return (
    <MainLayout>
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
                <div className="text-gray-400">
                  <span className="pr-1 text-white">
                    {user._count.Followee}
                  </span>
                  followers
                </div>
                <div className="text-gray-400">
                  <span className="pr-1 text-white">
                    {user._count.Follower}
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
