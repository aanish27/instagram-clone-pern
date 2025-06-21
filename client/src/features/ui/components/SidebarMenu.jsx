import { IoMenu } from "react-icons/io5";
import SideBarItem from "./SideBarItem";
import ThemeController from "./ThemeController";

function SidebarMenu({ isActive }) {
  return (
    <div className="dropdown dropdown-top dropdown-center w-full">
      <div tabIndex={0} role="button">
        <SideBarItem
          icon={<IoMenu className="text-2xl" />}
          title={"Menu"}
          isActive={isActive}
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <ThemeController />
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}

export default SidebarMenu;
