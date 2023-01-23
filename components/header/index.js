import Image from "next/image";

const Header = () => {
  return (
    <div className="flex h-20 items-center justify-between bg-[#0070f31c] px-10">
      <h1 className="text-[1.6em] font-bold md:text-4xl">
        be<span className="text-purple-600">Little</span>
      </h1>
      <Image
        alt="logo"
        src={"/profile.png"}
        width={200}
        height={200}
        className="w-12 rounded-full"
      />
    </div>
  );
};

export default Header;
