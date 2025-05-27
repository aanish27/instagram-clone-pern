import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openViewPostModal } from "../app/helpers";

function TabContent({ activeTab, posts, savedPosts }) {
  const [contents, setContents] = useState(null);
  const dispatch = useDispatch();

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

  const handlePostClick = (post) => {
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
