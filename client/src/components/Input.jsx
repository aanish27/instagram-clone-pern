function Input({
  type,
  placeholder,
  register,
  className,
  disable = false,
  hidden = false,
}) {
  return (
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className={`bg-insta-black h-8 w-full rounded-xl border-1 border-[#424242] p-2 placeholder:text-xs focus:outline-none ${className}`}
      disabled={disable}
      hidden={hidden}
    />
  );
}

export default Input;
