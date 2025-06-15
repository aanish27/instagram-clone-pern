import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import FooterLink from "../../../components/FooterLink";
import RightSidebarItem from "../../../components/RightSidebarItem";
import { useGetSuggestionsQuery } from "../../user/userQueryHooks";

function RightSidebar() {
  const queryClient = useQueryClient();
  const [isAll, setIsAll] = useState(false);
  const { isSuccess, data: suggestions } = useGetSuggestionsQuery(isAll);

  const handleSeeAllClick = () => {
    if (isAll) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["getSuggestions"] });
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
        {isSuccess &&
          suggestions?.map((user) => {
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
