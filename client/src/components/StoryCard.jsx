
function StoryCard({ url, username}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-21 w-21 flex-col items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500">
        <img src={url} alt="" className="h-20 w-20 rounded-full" />
      </div>
      <span> {username} </span>
    </div>
  );
}

export default StoryCard
