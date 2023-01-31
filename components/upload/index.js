import { BiCloudUpload } from "react-icons/bi";
import { useContext } from "react";
import { AppContext } from "@/context/context";

const Upload = ({ image, onChange, onDrop }) => {
  const { border, setBorder } = useContext(AppContext);
  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        setBorder(styles.activeBorder);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setBorder("none");
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setBorder(styles.activeBorder);
      }}
      onDrop={onDrop}
      style={{ border: border }}
      className={`${border !== "none" && "opacity-60"} ${styles.wrapper}`}
    >
      <input
        id="upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onChange}
        // multiple
      />
      <label className={styles.label} htmlFor="upload">
        <BiCloudUpload size={100} color={"#8A2BE2"} />
        <p className="text-lg">upload or drop images here</p>
      </label>
    </div>
  );
};
const styles = {
  activeBorder: "3px dashed #8A2BE2",
  wrapper:
    "flex h-full w-full dark:bg-dim cursor-pointer  items-center justify-center rounded-md bg-[#0070f31c] capitalize dark:bg-dim dark:text-slate-400",
  label:
    "flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-xl font-medium",
};

export default Upload;
