import { FaUpload } from "react-icons/fa";
import { BiCloudUpload } from "react-icons/bi";

const Upload = ({
  image,
  onChange,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
}) => {
  // ${
  //   image && "hidden"
  // }
  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        console.log("drag enter");
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        console.log("drag left");
      }}
      onDragOver={(event) => {
        event.preventDefault();
        console.log("drag entering..");
      }}
      onDrop={
        //   (event) => {
        //   event.preventDefault();
        //   console.log("file droppped here");
        // }
        onDrop
      }
      className={`flex h-full w-full cursor-pointer  items-center justify-center rounded-md bg-[#0070f31c] capitalize 
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
        <div>upload or drop images here</div>
      </label>
    </div>
  );
};

export default Upload;
