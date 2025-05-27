import { FaInstagram } from "react-icons/fa";

function BrandName({ isExpanded }) {
  return isExpanded ? (
    <div className="cookie-regular my-5 text-4xl md:hidden lg:block">
      Instagram
    </div>
  ) : (
    <FaInstagram className="mx-2 text-2xl" />
  );
}
export default BrandName;
