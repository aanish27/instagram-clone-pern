import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import DrawerLayout from "../../../app/layouts/DrawerLayout";
// import RightSideBarItem from "../../../components/";
import UserCard from "../../../components/UserCard";
import { useGetConnectionsQuery } from "../../follow/followQueryHooks";

function MessageDrawer() {
  const { data: contacts, isSuccess } = useGetConnectionsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/messages", { replace: true });
  }, []);

  return (
    <DrawerLayout
      isTitle={false}
      body={
        isSuccess &&
        contacts?.map((contact) => {
          return (
            <UserCard
              key={contact.id}
              username={contact.username}
              avatar={contact.profile_pic}
            />
          );
        })
      }
      header={
        <div className="grid grid-cols-2">
          <div className="font-bold">aanish27</div>
          <FaRegEdit className="justify-self-end text-2xl" />
          <div className="font-semibold">Messages</div>
          <div className="text-right">Requests</div>
        </div>
      }
    />
  );
}

export default MessageDrawer;
