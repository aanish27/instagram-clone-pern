import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openViewPostModal } from "../app/helpers";

function TabContent({ activeTab, posts, savedPosts }) {
  const [contents, setContents] = useState(null);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  useEffect(() => {
    switch (activeTab) {
      case 0:
        setContents(posts);
        break;
      case 1:
        setContents(savedPosts);
        break;
      default:
        setContents(null);
    }
  }, [activeTab]);

  const handlePostClick = (paramsObj) => {
    const post = { ...paramsObj };
    const username = activeTab == 0 ? authUser.username : post.creator.username;
    post["username"] = username;
    openViewPostModal(dispatch, post);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {contents &&
        contents.map((content) => {
          return (
            <img
              key={content.id}
              src={content.attachment}
              className="h-[300px] w-[300px]"
              onClick={() => handlePostClick(content)}
            />
          );
        })}
    </div>
  );
}

export default TabContent;
