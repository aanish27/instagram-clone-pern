import StoryRow from "./StoryRow";
import PostContainer from "./PostContainer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

function MainContent() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const handleLogoutClick = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then(function (response) {
        console.log(response.data.message);
        setToken();
        console.log(Cookies.get("accessToken"), "Login");
        navigate("/login", { replace: true });
      })
      .catch(function (error) {
        console.log(error);

        console.log(error.response.data.error);
      });
  };

  const handleUsersClick = async (e) => {
    e.preventDefault();

    await axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);

        console.log(error.response.data.error);
      });
  };

  return (
    <main className="hide-scroll-bar display- my-10 h-screen w-full overflow-y-scroll p-1 md:my-0 md:px-5 lg:w-[50%]">
      <StoryRow />
      <div className="flex w-full flex-col items-center justify-center md:px-20">
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </div>
      <button className="mx-5 bg-red-400 px-20" onClick={handleLogoutClick}>
        Logout
      </button>
      <button className="mx-5 bg-red-400 px-20" onClick={handleUsersClick}>
        USERS
      </button>
    </main>
  );
}

export default MainContent;
