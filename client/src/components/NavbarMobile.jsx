import { FaRegHeart } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";

function NavbarMobile() {
  return (
    <nav className="lobster-regular fixed top-0 right-0 flex h-10 w-full items-center justify-between p-1 md:hidden">
      <div className="text-2xl">Instagram</div>
      <div className="flex gap-2">
        <FaRegHeart className="text-2xl" />
        <LuMessageCircleMore className="text-2xl" />
      </div>
    </nav>
  );
}

export default NavbarMobile;
