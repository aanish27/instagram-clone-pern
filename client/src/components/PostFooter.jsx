import { FaRegComment, FaRegHeart} from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";

function PostFooter() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <FaRegHeart style={{ fontSize: "25px" }} />{" "}
          <FaRegComment style={{ fontSize: "25px" }} />{" "}
          <IoPaperPlaneOutline style={{ fontSize: "25px" }} />
        </div>
        <FiBookmark style={{ fontSize: "25px" }} />
      </div>
      <div>
        <b>1948 </b>likes
      </div>
      <div>
        <b>Aanish</b> Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Totam, nesciunt. <span className="text-gray-400"> more</span>{" "}
      </div>
    </div>
  );
}

export default PostFooter;
