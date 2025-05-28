import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import url from "../assets/avatar.jpg";
import Avatar from "./Avatar";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";
import { useGetStories } from "../hooks/Query/storyQueryHooks";
import { useSelector } from "react-redux";

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
                <div className="bg-insta-black flex h-full w-[25vw] flex-col justify-between">
                  <div className="flex justify-between p-2">
                    <div className="flex items-center gap-2">
                      <Avatar
                        img={story.creator.profile_pic}
                        size={"h-15 w-15"}
                      />
                      <div>
                        {story.creator.username}{" "}
                        <span className="text-sm">3h</span>
                      </div>
                    </div>
                    <IoEllipsisHorizontal className="mx-2 text-2xl" />
                  </div>
                  <img src={story.attachment} className="h-auto w-full" />
                  <div className="flex items-center justify-center gap-3 p-2">
                    <input
                      type="text"
                      className="w-[300px] rounded-2xl border-2 px-4 py-1"
                    />
                    <FaRegHeart className="text-2xl" />
                    <IoPaperPlaneOutline className="text-2xl" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
