import { LuDot } from "react-icons/lu";

function FooterLink({text}) {
  return (
    <a href="" className="text-xs text-gray-500">
      {text} <LuDot className="inline" />
    </a>
  );
}

export default FooterLink;
