import { Link } from "react-router";

function SideBarItem({ title, icon, notification, path, isExpanded, onClick }) {
  return (
    <Link to={path}>
      <div
        className="my-3 flex items-center rounded-lg px-2 py-3 hover:bg-[#1d1d1dba] lg:gap-5"
        onClick={onClick}>
        <div className="relative">
          {icon}
          {notification ? (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-2xl bg-red-500 text-center text-[10px]">
              {notification}
            </span>
          ) : (
            ""
          )}
        </div>
        {isExpanded ? (
          <span className="mr-[5vw] text-base font-light md:hidden lg:block">
            {title}
          </span>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default SideBarItem;
