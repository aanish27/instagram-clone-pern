import Avatar from "./Avatar";

function NotificationItem({ avatar, username, attachment, message }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Avatar size={"h-13 w-13"} img={avatar} />
        <div className="text-sm font-semibold">
          {username}
          <span className="px-1 text-sm font-light text-gray-200">
            {message}
          </span>
        </div>
      </div>
      <img src={attachment} className="h-13 w-13 rounded-xl" />
    </div>
  );
}

export default NotificationItem;
