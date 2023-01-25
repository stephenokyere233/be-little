import { FaUpload } from "react-icons/fa";
import { BiCloudUpload } from "react-icons/bi";
import { useContext, useState } from "react";
import { AppContext } from "@/context/context";

const Upload = ({ image, onChange, onDrop }) => {
  const {border, setBorder} = useContext(AppContext)
  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        console.log("drag enter");
        setBorder("3px dashed blueviolet");
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        console.log("drag left");
        setBorder("none");

      }}
      onDragOver={(event) => {
        event.preventDefault();
        console.log("drag entering..");
        setBorder("3px dashed blueviolet");

      }}
      onDrop={onDrop}
      style={{ border: border }}
      className={`flex h-full dark:bg-dim w-full ${border!=="none"&& "opacity-60"} cursor-pointer  items-center justify-center dark:bg-dim dark:text-slate-400 rounded-md bg-[#0070f31c] capitalize 
      `}
    >
      <input
        id="upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onChange}
        multiple
      />
      <label
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-xl font-medium"
        htmlFor="upload"
      >
        <div className="flex">
          <BiCloudUpload size={100} color={"blueviolet"} />
        </div>
        <div className="text-lg">upload or drop images here</div>
      </label>
    </div>
  );
};

export default Upload;
