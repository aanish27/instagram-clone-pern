import { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

function ThemeController() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "black",
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) setTheme("dark");
    else setTheme("light");
  };

  return (
    <label className="swap swap-rotate bg-black">
      <input
        type="checkbox"
        className="theme-controller"
        onChange={handleToggle}
      />
      <FiSun className="swap-off h-10 w-10 fill-current" />
      <FaRegMoon className="swap-on h-10 w-10 fill-current" />
    </label>
  );
}

export default ThemeController;
