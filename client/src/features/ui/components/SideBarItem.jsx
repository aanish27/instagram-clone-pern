import { Link } from "react-router";

function SideBarItem({ title, icon, notification, path, isActive, onClick }) {
  return (
    <Link to={path}>
      <div
        className="flex items-center rounded-lg px-2 py-2 hover:bg-[#1d1d1dba] lg:gap-5"
        onClick={onClick}>
        <div className="relative">
          {icon}
          {notification > 0 && (
            <span className="absolute top-0 right-0 h-3 w-3 rounded-2xl bg-red-500 text-center text-[8px]">
              {notification > 99 ? "99+" : notification}
            </span>
          )}
        </div>
        {!isActive && (
          <span className="mr-[5vw] md:hidden lg:block">{title}</span>
        )}
      </div>
    </Link>
  );
}

export default SideBarItem;
