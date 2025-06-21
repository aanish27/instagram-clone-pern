import { FaInstagram } from "react-icons/fa";

function BrandName({ isActive = true, className = "" }) {
  return isActive ? (
    <FaInstagram className="mx-2 text-2xl" />
  ) : (
    <div
      className={`cookie-regular my-5 text-4xl text-black md:hidden lg:block dark:text-white ${className}`}>
      Instagram
    </div>
  );
}
export default BrandName;
