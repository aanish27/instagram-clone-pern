import { IoSearch } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { LuVideotape } from "react-icons/lu";
import { CgAddR } from "react-icons/cg";
import profile_pic from "../assets/car.jpg";

function FooterBarMobile() {
  return (
    <nav className="px-1 lobster-regular fixed right-0 bottom-0 flex h-10 w-full items-center justify-between bg-black md:hidden">
      <GoHomeFill className="text-2xl" />
      <IoSearch className="text-2xl" />
      <CgAddR className="text-2xl" />
      <LuVideotape className="text-2xl" />
      <div className="flex items-center">
        <img
          src={profile_pic}
          alt=""
          className="h-[30px] w-[30px] rounded-full"
        />
      </div>
    </nav>
  );
}

export default FooterBarMobile;
