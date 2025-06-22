import { useDispatch } from "react-redux";
import { useGetExploreQuery } from "../../features/post/postQueryHooks";
import { openViewPostModal } from "../../utils/helpers";
import MainLayout from "../layouts/MainLayout";

function Explore() {
  const dispatch = useDispatch();
  const { isSuccess, data } = useGetExploreQuery();

  const handlePostClick = (post) => {
    openViewPostModal(dispatch, post);
  };

  return (
    <MainLayout>
      <div className="m-20 grid md:grid-cols-3">
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
