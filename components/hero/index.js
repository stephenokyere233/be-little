import React, { useState } from "react";
import Button from "../button";
import Container from "../container";
import Loader from "../loader/Loader";
import Upload from "../upload";
import imageCompression from "browser-image-compression";


const Hero = () => {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const [finalSize, setFinalSize] = useState("");
  const [initialSize, setInitialSize] = useState("");

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    setImageFile(image);
    setInitialSize(image.size / 1024 / 1024);
  };
  const compress = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    setLoading(true);
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImageFile(compressedFile);
      setLoading(false);
      const fileSize = compressedFile.size / 1024 / 1024;
      setFinalSize(fileSize);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const download = async () => {
    try {
      if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(compressedImageFile);
      const data = window.URL.createObjectURL(compressedImageFile);
      const link = document.createElement("a");
      link.href = data;
      link.download = `little-${date.toISOString()}.jpg`;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    } catch (e) {
      console.log(e);
    }
  };
  const date = new Date();

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10 py-6 md:flex-row md:justify-between md:px-10">
      <div className="flex h-[300px] w-[350px] flex-col items-center justify-center rounded-lg border-2 bg-[#0070f31c] p-5 md:w-[400px]">
        <Upload image={imageFile} onChange={handleImageUpload} />
        {imageFile && (
          <Container type="initial size" size={initialSize} image={imageFile} />
        )}
      </div>
      <div className="flex w-[400px] flex-col items-center justify-center md:h-[300px]">
        {loading ? (
          <Loader />
        ) : compressedImageFile ? (
          <Button text="download" onClick={download} image={imageFile} />
        ) : (
          <Button text="compress" onClick={compress} image={imageFile} />
        )}

        <div className="">{!imageFile && <p>Please Select an image</p>}</div>
      </div>
      <div className="flex h-[300px] w-[350px] flex-col items-center justify-center rounded-lg  border-2 bg-[#0070f31c] p-5 md:w-[400px]">
        {compressedImageFile && (
          <Container
            type="compressed size"
            size={finalSize}
            image={compressedImageFile}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;


  // const [imageFile, setImageFile] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [compressedImageFile, setCompressedImageFile] = useState(null);
  // const [finalSize, setFinalSize] = useState("");
  // const [initialSize, setInitialSize] = useState("");

  // const handleImageUpload = async (event) => {
  //   const image = event.target.files[0];
  //   setImageFile(image);
  //   setInitialSize(image.size / 1024 / 1024);
  // };
  // const compress = async () => {
  //   const options = {
  //     maxSizeMB: 1,
  //     maxWidthOrHeight: 1920,
  //     useWebWorker: true,
  //   };
  //   setLoading(true);
  //   try {
  //     const compressedFile = await imageCompression(imageFile, options);
  //     setCompressedImageFile(compressedFile);
  //     setLoading(false);
  //     const fileSize = compressedFile.size / 1024 / 1024;
  //     setFinalSize(fileSize);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  // const download = async () => {
  //   try {
  //     if (window.navigator && window.navigator.msSaveOrOpenBlob)
  //       return window.navigator.msSaveOrOpenBlob(compressedImageFile);
  //     const data = window.URL.createObjectURL(compressedImageFile);
  //     const link = document.createElement("a");
  //     link.href = data;
  //     link.download = `little-${date.toISOString()}.jpg`;
  //     link.dispatchEvent(
  //       new MouseEvent("click", {
  //         bubbles: true,
  //         cancelable: true,
  //         view: window,
  //       }),
  //     );
  //     setTimeout(() => {
  //       window.URL.revokeObjectURL(data);
  //       link.remove();
  //     }, 100);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // };