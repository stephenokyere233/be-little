import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex h-20 justify-between items-center border px-4">
      <h1 className="text-4xl font-bold">
        Be<span className="text-purple-600">Little</span>
      </h1>
      <Image alt="" src={""} width={100} height={100}/>
    </div>
  );
};

export default Navbar;
