function SideBarItem({ title, icon, notification }) {
  return (
    <div className="my-3 flex items-center lg:gap-5 rounded-lg px-2 py-3 hover:bg-[#1d1d1dba]">
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
      <span className="text-base font-light md:hidden lg:block">{title}</span>
    </div>
  );
}

export default SideBarItem;
