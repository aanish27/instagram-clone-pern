function Input({ type, placeholder, register, className }) {
  return (
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className={`mt-2 rounded border-1 border-[#424242] bg-[#191919] p-1 placeholder:text-xs focus:outline-none ${className}`}
    />
  );
}

export default Input;
