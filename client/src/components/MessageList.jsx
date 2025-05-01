import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, expandSidebar } from "../app/features/uiSlice";
import RightSideBarItem from "./RightSidebarItem";
import { FaRegEdit } from "react-icons/fa";
function MessageList() {
  const authUser = useSelector((state) => state.auth.authUser);

  console.log(authUser);

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
      <div className="flex justify-between font-bold text-sm my-4">
        <div>Messages</div>
        <div>Requests</div>
      </div>
      <div className="my-2 max-h-[90vh] overflow-y-scroll pr-2">
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
        <RightSideBarItem user={authUser} />
      </div>
    </div>
  );
}

export default MessageList;
