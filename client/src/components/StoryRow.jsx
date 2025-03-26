import StoryCard from "./StoryCard";
import { useEffect, useState } from "react";
import axios from "axios";

function StoryRow() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/story", { withCredentials: true })
      .then((response) => {
        setStories(response.data.stories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="hide-scroll-bar flex min-w-full shrink-0 gap-2 overflow-x-scroll md:w-full md:gap-4">
      {stories &&
        stories.map((story) => {
          return (
            <StoryCard
              key={story.id}
              url={story.attachment}
              username={story.creator.username}
            />
          );
        })}
    </div>
  );
}

export default StoryRow;
