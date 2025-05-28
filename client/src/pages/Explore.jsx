import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { openViewPostModal } from "../app/helpers";
import { useDispatch } from "react-redux";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Explore() {
  const [feed, setFeed] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${serverUrl}/post/explore`, { withCredentials: true })
      .then((response) => {
        setFeed(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePostClick = (post) => {
    openViewPostModal(dispatch, post);
  };

  return (
    <MainLayout>
      <div className="hide-scroll-bar flex max-h-screen w-full flex-wrap items-center justify-center overflow-y-scroll p-2 md:my-0 md:px-5">
        {feed &&
          feed.map((post) => {
            return (
              <img
                src={`${post.attachment}`}
                key={post.id}
                onClick={() => handlePostClick(post)}
              />
            );
          })}
      </div>
    </MainLayout>
  );
}

export default Explore;
