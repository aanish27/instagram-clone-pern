function Input({type, placeholder, name , onChange , value}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="mt-2 rounded-[2px] border-1 border-[#424242] bg-[#191919] p-1 placeholder:text-xs focus:outline-none"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
