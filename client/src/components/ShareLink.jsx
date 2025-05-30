function ShareLink({ icon, title }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-15 w-15 items-center justify-center rounded-full bg-black text-2xl text-white">
        {icon}
      </div>
      <div className="text-xs">{title}</div>
    </div>
  );
}

export default ShareLink;
