function DrawerLayout({ body, title, isTitle = true, header = null }) {
  return (
    <div className="border-insta-black absolute top-0 left-20 z-50 h-screen rounded-r-lg border-x-2 bg-black p-4">
      <div className="flex h-full w-[20vw] flex-shrink-0 flex-col gap-2">
        {isTitle && <div className="text-2xl font-extrabold">{title}</div>}
        {header && header}
        <div className="hide-scroll-bar grid h-full grid-cols-1 gap-3 overflow-y-scroll">
          {body}
        </div>
      </div>
    </div>
  );
}

export default DrawerLayout;
