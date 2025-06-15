import { useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import { openViewPostModal } from "../../utils/helpers";
import { useGetExploreQuery } from "../../features/post/postQueryHooks";

function Explore() {
  const dispatch = useDispatch();
  const { isSuccess, data } = useGetExploreQuery();

  const handlePostClick = (post) => {
    openViewPostModal(dispatch, post);
  };

  return (
    <MainLayout>
      <div className="hide-scroll-bar flex max-h-screen w-full flex-wrap items-center justify-center overflow-y-scroll p-2 md:my-0 md:px-5">
        {isSuccess &&
          data.map((post) => {
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
