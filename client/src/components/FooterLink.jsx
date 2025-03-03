import { LuDot } from "react-icons/lu";

function FooterLink({text , url , icon = true}) {
  return (
    <a href={url} className="text-xs text-gray-500">
      {text} {icon ? <LuDot className="inline" /> : ''}
    </a>
  );
}

export default FooterLink;
