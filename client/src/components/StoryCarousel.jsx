import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import { useEffect } from "react";
import { useGetStories } from "../hooks/Query/storyQueryHooks";
import { useSelector } from "react-redux";
import StoryCard from "./StoryCard";

export const StoryCarousel = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);
  const { isSuccess, data: stories } = useGetStories();
  const id = useSelector((state) => state.ui.StoryId);

  useEffect(() => {
    if (emblaApi && id) {
      const index = stories.findIndex((story) => story.id === id);
      emblaApi.scrollTo(index, true);
    }
  }, [emblaApi, id]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {isSuccess &&
            stories?.map((story) => (
              <div key={story.id} className="embla__slide">
                <StoryCard
                  id={story.id}
                  username={story.creator.username}
                  profile_pic={story.creator.profile_pic}
                  attachment={story.attachment}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
