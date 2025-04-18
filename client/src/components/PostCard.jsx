const env = import.meta.env.VITE_STORAGE_URL;

function PostCard({ attachment }) {
  return (
    <div className="w-full p-0">
      <div className="">
        <img
          className="h-auto max-h-[450px] w-full"
          src={`${env}${attachment}`}
          alt=""
        />
      </div>
    </div>
  );
}

export default PostCard;
