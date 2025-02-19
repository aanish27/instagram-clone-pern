
function SideBarItem({title , icon , notification}) {
    return (
    <div className="flex items-center gap-5 pt-4">
        <div className="relative">
          {icon}
          {notification ?
            <span className="absolute top-0 right-0 h-4 w-4 rounded-2xl bg-red-500 text-center text-[10px]">
              {notification}
            </span> : ''
          }
        </div>
      <span className="text-xl font-light">{title}</span>
    </div>
  );
}

export default SideBarItem;
