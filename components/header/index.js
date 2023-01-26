import { useTheme } from "next-themes";
import Image from "next/image";
import { BiSun, BiMoon } from "react-icons/bi";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>
        be<span className="text-brand">Little</span>
      </h1>
      <div className={styles.section}>
        {theme === "light" ? (
          <BiMoon size={25} onClick={changeTheme} className="text-slate-600" />
        ) : (
          <BiSun size={25} onClick={changeTheme} className="text-grey" />
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
const styles = {
  header:
    "flex h-20 items-center justify-between bg-light px-10 dark:bg-dim dark:text-white",
  logo: "text-[1.6em] dark:text-grey font-bold md:text-4xl",
  section: "flex items-center gap-4",
};

export default Header;
