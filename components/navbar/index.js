import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex h-20 items-center justify-between bg-[#0070f31c] px-10">
      <h1 className="text-4xl font-bold">
        Be<span className="text-purple-600">Little</span>
      </h1>
      <Image alt="" src={"/favicon.ico"} width={50} height={50} />
    </div>
  );
};

export default Navbar;
