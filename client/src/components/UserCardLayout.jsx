/* eslint-disable import/no-restricted-paths */
import { Link } from "react-router";

import Avatar from "./Avatar";

function UserCardLayout({ url, username, subText, children }) {
  return (
    <div className="flex items-center justify-between">
      <Link to={`/${username}`}>
        <div className="flex items-center">
          <Avatar img={url} size={"h-15 w-15"} />
          <div className="flex flex-col p-3">
            <div className="text-sm font-semibold">{username}</div>
            {subText && (
              <div className="text-sm font-extralight text-gray-400">
                {subText}
              </div>
            )}
          </div>
        </div>
      </Link>
      {children}
    </div>
  );
}

export default UserCardLayout;
