function StoryCard({ url, username }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-17 w-17 flex-col items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 overflow-ellipsis md:h-18 md:w-18">
        <img
          src={url}
          alt=""
          className="h-16 w-16 rounded-full md:h-17 md:w-17"
        />
      </div>
      <span> {username} </span>
    </div>
  );
}

export default StoryCard;
