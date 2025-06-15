import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import StoryCard from "./StoryCard";

export const StoryCarousel = ({ options }) => {
  const { stories, storyId } = useSelector((state) => state.ui);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  useEffect(() => {
    if (emblaApi && storyId) {
      const index = stories.findIndex((story) => story.id === storyId);
      emblaApi.scrollTo(index, true);
    }
  }, [emblaApi, storyId]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {stories?.map((story) => (
            <div key={story.id} className="embla__slide">
              <StoryCard
                id={story.id}
                username={story.creator.username}
                profile_pic={story.creator.profile_pic}
                attachment={story.attachment}
                creatorId={story.creator.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
