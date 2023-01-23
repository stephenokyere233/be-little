import Head from "next/head";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // async function handleImageUpload(event) {
  //   const handleFileChange = (event) => {
  //     setSelectedFile(event.target.files[0]);
  //   };
  //   handleFileChange();
  //   // const imageFile = event.target.files[0];
  //   console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  //   console.log(`originalFile size ${selectedFile.size / 1024 / 1024} MB`);

  //   const options = {
  //     maxSizeMB: 1,
  //     maxWidthOrHeight: 1920,
  //     useWebWorker: true,
  //   };
  //   try {
  //     const compressedFile = await imageCompression(selectedFile, options);
  //     console.log(
  //       "compressedFile instanceof Blob",
  //       compressedFile instanceof Blob,
  //     ); // true
  //     console.log(
  //       `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
  //     ); // smaller than maxSizeMB

  //     await uploadToServer(compressedFile); // write your own logic
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const ImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const router = useRouter();

  const handleImageUpload = async (event) => {
    setImageFile(event.target.files[0]);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
  };
  const compress = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImageFile(compressedFile);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = async () => {
    try {
      await uploadToServer(compressedImageFile); // write your own logic
      router.push("/success");
    } catch (error) {
      console.log(error);
    }
  };
  // };

  return (
    <div className="flex flex-col px-10">
      <Navbar/>
      {/* <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      ></input> */}
      <div>
        <input type="file" onChange={handleImageUpload} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={compress}>compress</button>
      </div>
      <section className="flex gap-10 justify-between">
      <div className="h-[300px] w-[400px] rounded-lg border-2 p-5">
        {imageFile && (
          <Image
          src={URL.createObjectURL(imageFile)}
            alt=""
            width={400}
            height={400}
            className="h-full object-cover"
            />
            )}
      </div>
      <div className="h-[300px] w-[400px] rounded-lg border-2 p-5">
        {compressedImageFile && (
          <Image
          src={URL.createObjectURL(compressedImageFile)}
          alt=""
          width={400}
          height={400}
          className="h-full object-cover"
          />
          )}
      </div>
          </section>

      {/* <>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" />
        )}
      </> */}
    </div>
  );
}
