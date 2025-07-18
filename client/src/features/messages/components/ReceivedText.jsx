const ReceivedText = ({ name, text, status, receivedTime }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
          />
        </div>
      </div>
      <div className="chat-header">
        {name}
        <time className="text-xs opacity-50">{receivedTime}</time>
      </div>
      <div className="chat-bubble">{text}</div>
      <div className="chat-footer opacity-50">{status}</div>
    </div>
  );
};

export default ReceivedText;
