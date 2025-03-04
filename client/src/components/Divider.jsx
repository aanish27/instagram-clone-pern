function Divider({ text }) {
  return (
    <div className="relative flex w-full items-center px-8">
      <div className="flex-grow border-t border-gray-700"></div>
      <span className="mx-4 flex-shrink font-semibold text-gray-500">
        {text}
      </span>
      <div className="flex-grow border-t border-gray-700"></div>
    </div>
  );
}

export default Divider;
