import Image from "next/image";

const Container = ({ type, size, image }) => {
  return (
    <div
      // onDragEnter={() => {
      //   setBorder("2px dashed blue");
      // }}
      // onDrop={() => drop()}
      // onDragOver={() => {
      //   setBorder("2px dashed blue");
      // }}
      // onDragLeave={() => {
      //   setBorder("none");
      // }}
      // style={{ border: `${border}` }}
    >
      <Image
        src={URL.createObjectURL(image)}
        alt=""
        width={250}
        height={400}
        className="h-[90%] object-cover"
      />
      <p className="capitalize">
        {type}:<span className="ml-1">{size.toFixed(2)}MB</span>
      </p>
    </div>
  );
};

export default Container;
