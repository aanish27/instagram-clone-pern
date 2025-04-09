function Input({ type, placeholder, name, register , className}) {
  return (
    <input
      {...register(name, { required: true })}
      type={type}
      placeholder={placeholder}
      className={`mt-2 rounded-[2px] border-1 border-[#424242] bg-[#191919] p-1 placeholder:text-xs focus:outline-none ${className}`}
    />
  );
}

export default Input;
