function Hint({ message, color = "text-red-400" }) {
  return <div className={`${color} text-left text-xs`}>{message}</div>;
}

export default Hint;
