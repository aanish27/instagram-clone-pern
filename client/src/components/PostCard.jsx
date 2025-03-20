function PostCard({attachment}) {
  return (
    <div className="w-full p-0">
      <div className="">
        <img className="h-auto w-full max-h-[450px]" src={attachment} alt="" />
      </div>
    </div>
  );
}

export default PostCard;
