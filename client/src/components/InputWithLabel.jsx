const InputWithLabel = ({ label, children }) => {
  return (
    <div className="flex flex-col">
      <div className="font-semibold capitalize">{label}</div>
      {children}
    </div>
  );
};

export default InputWithLabel;
