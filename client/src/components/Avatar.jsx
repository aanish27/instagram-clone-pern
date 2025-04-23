function Avatar({ size = "h-10 w-10", isStory, img, ringSize }) {
  return (
    <>
      {isStory ? (
        <div
          className={`flex ${ringSize} items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500`}>
          <img src={img} className={`${size} rounded-full`} />
        </div>
      ) : (
        <img src={img} className={`${size} rounded-full`} />
      )}
    </>
  );
}

export default Avatar;
