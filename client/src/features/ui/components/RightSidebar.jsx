import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import FooterLink from "../../../components/FooterLink";
import RightSidebarItem from "../../../components/RightSidebarItem";
import { useGetSuggestionsQuery } from "../../user/userQueryHooks";

function RightSidebar() {
  const queryClient = useQueryClient();
  const [isAll, setIsAll] = useState(false);
  const { isSuccess, data: suggestions } = useGetSuggestionsQuery(isAll);
  const authUser = useSelector((state) => state.auth.authUser);
  const handleSeeAllClick = () => {
    if (isAll) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["getSuggestions"] });
    setIsAll(true);
  };

  return (
    <div className="mx-10 hidden max-h-[80vh] gap-3 py-2 lg:flex lg:flex-col">
      {authUser && <RightSidebarItem user={authUser} action={"Switch"} />}
      <div className="flex items-center justify-between font-semibold">
        <div className="text-gray-400">Suggested For You</div>
        <div onClick={handleSeeAllClick}>{isAll ? "All" : "See All"}</div>
      </div>
      <div className="hide-scroll-bar flex flex-col gap-2 overflow-y-scroll">
        {isSuccess &&
          suggestions?.map((user) => {
            return <RightSidebarItem key={user.id} user={user} />;
          })}
      </div>
      <div className="flex flex-wrap">
        <FooterLink text={"About"} />
        <FooterLink text={"More"} />
        <FooterLink text={"API"} icon={false} />
      </div>
    </div>
  );
}

export default RightSidebar;
