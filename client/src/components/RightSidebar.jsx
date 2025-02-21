import profile_pic from "../assets/car.jpg";
import FooterLink from "./FooterLink";
import RightSidebarItem from "./RightSidebarItem";

function RightSidebar() {
  return (
    <div className="flex h-[100vh] w-[20vw] flex-col gap-3 p-3 hidden">
      <RightSidebarItem url={profile_pic} action={"Switch"} />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-semibold text-gray-400">Suggested For You</div>
        </div>
        <div className="font-semibold">See All</div>
      </div>
      <RightSidebarItem url={profile_pic} action={"Follow"} />
      <div>
        <FooterLink text={"About"} />
        <FooterLink text={"More"} />
        <FooterLink text={"API"} />
      </div>
    </div>
  );
}

export default RightSidebar;
