import { useTheme } from "next-themes";
import Image from "next/image";
import { BiSun, BiMoon } from "react-icons/bi";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    console.log("changed");
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="flex h-20 items-center justify-between bg-[#0070f31c] px-10 dark:bg-dim dark:text-white">
      <h1 className="text-[1.6em] dark:text-gray-400 font-bold md:text-4xl">
        be<span className="text-purple-600">Little</span>
      </h1>
      <div className="flex items-center gap-4">
        {theme === "light" ? (
          <BiMoon size={25} onClick={changeTheme} className="text-slate-600" />
        ) : (
          <BiSun size={25} onClick={changeTheme} className="text-slate-400" />
        )}
        <Image
          alt="logo"
          src={"/profile.png"}
          width={200}
          height={200}
          className="w-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
