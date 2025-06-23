const SentText = ({ name, text, sentTime, seenTime }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
          />
        </div>
      </div>
      <div className="chat-header">
        {name}
        <time className="text-xs opacity-50">{sentTime}</time>
      </div>
      <div className="chat-bubble">{text}</div>
      <div className="chat-footer opacity-50">Seen at {seenTime}</div>
    </div>
  );
};

export default SentText;
