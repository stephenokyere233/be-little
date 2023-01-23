import { FaUpload } from "react-icons/fa";

const Upload = ({ image, onChange }) => {
  return (
    <div
      className={`flex w-40  cursor-pointer items-center justify-center rounded-md border border-purple-700 p-4 capitalize ${
        image && "hidden"
      }`}
    >
      <input
        id="upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      <FaUpload />
      <label className="cursor-pointer text-xl font-medium" htmlFor="upload">
        upload
      </label>
    </div>
  );
};

export default Upload;
