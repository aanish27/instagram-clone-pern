import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import RightSideBarItem from "../../../components/RightSidebarItem";
import { useGetConnectionsQuery } from "../../follow/followQueryHooks";
import { closeSidebar, expandSidebar } from "../../ui/uiSlice";

function MessageList() {
  const { data: contacts, isSuccess } = useGetConnectionsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSidebar());

    return () => {
      dispatch(expandSidebar());
    };
  }, []);

  return (
    <div className="block max-h-screen w-[20vw] p-5">
      <div className="flex justify-between">
        <div className="font-bold">aanish27</div>{" "}
        <div>
          <FaRegEdit style={{ fontSize: "25px" }} />
        </div>
      </div>
      <div className="my-4 flex justify-between text-sm font-bold">
        <div>Messages</div>
        <div>Requests</div>
      </div>
      <div className="my-2 max-h-[90vh] overflow-y-scroll pr-2">
        {isSuccess &&
          contacts?.map((contatct) => {
            return <RightSideBarItem key={contatct.id} user={contatct} />;
          })}
      </div>
    </div>
  );
}

export default MessageList;
