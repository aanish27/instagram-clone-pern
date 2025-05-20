function Input({ type, placeholder, register, className, disable = false }) {
  return (
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className={`bg-insta-black rounded-xl border-1 border-[#424242] p-2 placeholder:text-xs focus:outline-none ${className}`}
      disabled={disable}
    />
  );
}

export default Input;
