function Hint({ message, color = "text-red-400" }) {
  return <div className={`py-1 ${color} text-left text-xs`}>{message}</div>;
}

export default Hint;
