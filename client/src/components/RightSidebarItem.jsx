function RightSidebarItem({ url, action }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={url} alt="" className="h-20 w-20 rounded-full" />
        <div className="flex flex-col p-3">
          <div className="font-semibold">username</div>
          <div className="font-extralight text-gray-400">name</div>
        </div>
      </div>
      <div className="font-bold text-blue-500">{action}</div>
    </div>
  );
}

export default RightSidebarItem;
