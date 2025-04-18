import { useEffect, useState } from "react";
import profile_pic from "../assets/car.jpg";
import FooterLink from "./FooterLink";
import RightSidebarItem from "./RightSidebarItem";
import axios from "axios";

function RightSidebar() {
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", {
        params: {
          all: isAll,
        },
        withCredentials: true,
      })
      .then(function (response) {
        setFollowSuggestions(response.data.users);
      })
      .catch(function (e) {
        console.log(e);
      });
  }, [isAll]);

  const handleSeeAllClick = () => {
    if (isAll) {
      return;
    }

    setIsAll(true);
  };

  return (
    <div className="mx-10 hidden max-h-[80vh] w-[20vw] gap-3 py-3 lg:flex lg:flex-col">
      {/* <RightSidebarItem url={profile_pic} action={"Switch"} /> */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-semibold text-gray-400">Suggested For You</div>
        </div>
        <div className="font-semibold" onClick={handleSeeAllClick}>
          {isAll ? "All" : "See All"}
        </div>
      </div>
      <div className="hide-scroll-bar overflow-y-scroll">
        {followSuggestions &&
          followSuggestions.map((user) => {
            return (
              <RightSidebarItem
                key={user.id}
                url={user.profile_pic}
                action={"Follow"}
                user={user}
              />
            );
          })}
      </div>
      <div>
        <FooterLink text={"About"} />
        <FooterLink text={"More"} />
        <FooterLink text={"API"} icon={false} />
      </div>
    </div>
  );
}

export default RightSidebar;
