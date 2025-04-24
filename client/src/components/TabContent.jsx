import { useEffect, useState } from "react";

function TabContent({ activeTab, posts, savedPosts }) {
  const [contents, setContents] = useState(null);

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

  return (
    <div className="flex flex-wrap gap-2">
      {contents &&
        contents.map((content) => {
          return (
            <img
              key={content.id}
              src={content.attachment}
              className="h-[300px] w-[300px]"
            />
          );
        })}
    </div>
  );
}

export default TabContent;
