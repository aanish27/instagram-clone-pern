import Avatar from "../components/Avatar";
import MainLayout from "../layouts/MainLayout";
import pic from "../assets/car.jpg";
import { RiSettings4Line } from "react-icons/ri";
import { HiPlus } from "react-icons/hi2";

function Profile() {
  return (
    <MainLayout>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex gap-2">
          <Avatar img={pic} size={"h-40 w-40"} />
          <div className="ml-[100px] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div>aanish.27</div>
              <button className="btn btn-soft h-8">edit profile</button>
              <button className="btn btn-soft h-8">veiw archive</button>
              <button>
                <RiSettings4Line style={{ fontSize: "25px" }} />
              </button>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-400">
                <span className="pr-1 text-white">357</span>posts
              </div>
              <div className="text-gray-400">
                <span className="pr-1 text-white">27</span>followers
              </div>
              <div className="text-gray-400">
                <span className="pr-1 text-white">357</span>followings
              </div>
            </div>
            <div className="mt-6">
              Bio
              <div>when you know know</div>
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
        <div>
          <div>posts saved tagged</div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
