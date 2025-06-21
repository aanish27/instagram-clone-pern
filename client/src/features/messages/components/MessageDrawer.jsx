import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import DrawerLayout from "../../../app/layouts/DrawerLayout";
import RightSideBarItem from "../../../components/RightSidebarItem";
import { useGetConnectionsQuery } from "../../follow/followQueryHooks";

function MessageList() {
  const { data: contacts, isSuccess } = useGetConnectionsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/messages", { replace: true });

    return () => {
      navigate("/", { replace: true });
    };
  }, []);

  return (
    <DrawerLayout
      isTitle={false}
      body={
        isSuccess &&
        contacts?.map((contatct) => {
          return <RightSideBarItem key={contatct.id} user={contatct} />;
        })
      }
      header={
        <>
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
        </>
      }
    />
  );
}

export default MessageList;
