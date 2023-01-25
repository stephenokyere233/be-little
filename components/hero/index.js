import React, { useEffect, useState } from "react";
import Button from "../button";
import Container from "../container";
import Loader from "../loader/Loader";
import Upload from "../upload";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

const Hero = () => {
  const [imageFile, setImageFile] = useState(null);
  const [fileSet, setFileSet] = useState([]);
  const [resultSet, setResultSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const [finalSize, setFinalSize] = useState("");
  const [initialSize, setInitialSize] = useState("");
  const [border, setBorder] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const compress = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    setLoading(true);
    // const start = async () => {
    try {
      const compressedFile = await imageCompression(file, options);
      // setCompressedImageFile(compressedFile);
      const updatedList = [...resultSet, compressedFile];
      setResultSet(updatedList);
      setLoading(false);
      // const fileSize = compressedFile.size / 1024 / 1024;
      // setFinalSize(fileSize);
      // setImageFile(null);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // };
    // start();
    // setTimeout(start, 1500);
  };

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    // setTimeout(() => {
    setLoading(true);
    // }, 2000);
    const updatedList = [...fileSet, image];
    setFileSet(updatedList);
    const compress = async () => {
      try {
        const compressedFile = await imageCompression(image, options);
        const updatedResultList = [...resultSet, compressedFile];
        // setTimeout(() => {
        setResultSet(updatedResultList);
        // }, 1000);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    compress();
    // setTimeout(compress, 2000);
    // compress(image);
  };

  console.log(fileSet);
  console.log(resultSet);

  const drag = (event) => {
    // event.preventDefault()
    // setDragEnter(true);
    setBorder("2px dashed blue");
    console.log("entered");
    // handleImageUpload();
  };
  const drop = (event) => {
    event.preventDefault();
    console.log("dropped");
    setBorder("none");

    // setDragEnter(false);
    const image = event.target.files[0];
    setImageFile(event.dataTransfer.files[0]);
    setInitialSize(image.size / 1024 / 1024);
  };
  const download = async (file) => {
    console.log("starting");

    try {
      if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(file);
      const data = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      console.log("downloading");
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
        console.log("done");

        link.remove();
      }, 100);
      setDownloaded(true);
    } catch (e) {
      console.log(e);
    }
  };
  const date = new Date();

  return (
    // <section
    //   onDragEnter={(event) => {
    //     event.preventDefault();
    //     setBorder("2px dashed blue");
    //   }}
    //   onDrop={() => drop()}
    //   // onDragOver={(event) => {
    //   //   event.preventDefault();
    //   //   setBorder("2px dashed blue");
    //   // }}
    //   onDragLeave={(event) => {
    //     event.preventDefault();

    //     setBorder("none");
    //   }}
    //   style={{ border: `${border}` }}
    //   className={`
    //   ${border === "2px dashed blue" && "opacity-40"}
    //   flex flex-1 flex-col items-center justify-center gap-10 py-6 md:flex-row md:justify-between md:px-10`}
    // >
    //   <div className="flex h-[300px] w-[350px] flex-col items-center justify-center rounded-lg border-2 bg-[#0070f31c] p-5 md:w-[400px]">
    //     <Upload image={imageFile} onChange={handleImageUpload} />
    //     {imageFile && (
    //       <Container type="initial size" size={initialSize} image={imageFile} />
    //     )}
    //   </div>
    //   <div className="flex w-[400px] flex-col items-center justify-center md:h-[300px]">
    //     {loading ? (
    //       <Loader />
    //     ) : compressedImageFile ? (
    //       <Button text="download" onClick={download} image={imageFile} />
    //     ) : (
    //       <Button text="compress" onClick={compress} image={imageFile} />
    //     )}

    //     <div className="">{!imageFile && <p>Please Select an image</p>}</div>
    //   </div>
    //   <div className="flex h-[300px] w-[350px] flex-col items-center justify-center rounded-lg  border-2 bg-[#0070f31c] p-5 md:w-[400px]">
    //     {compressedImageFile && (
    //       <Container
    //         type="compressed size"
    //         size={finalSize}
    //         image={compressedImageFile}
    //       />
    //     )}
    //   </div>
    // </section>
    <div className="flex flex-1 flex-col overflow-y-scroll">
      <div className="m-2 mx-auto flex h-40 w-[20em] items-center justify-center rounded-lg px-4 lg:w-[30em]">
        <Upload
          onDrop={(event) => {
            // event.preventDefault()
            // handleImageUpload(event)
          }}
          onChange={handleImageUpload}
        />
      </div>
      <section className="relative mx-auto w-full flex-1 rounded-md md:px-[3em] lg:w-[70%]">
        {fileSet.length <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-500">
            No file Selected
          </div>
        )}
        <div className="relative m-2 flex flex-col">
          <div className="grid grid-cols-2 gap-2">
            {fileSet.map((file, index) => {
              const fileSize = (file?.size / 1024 / 1024).toFixed(2);
              return (
                <div
                  key={index}
                  className="col-span-2 flex h-16 w-full items-center justify-start gap-2 rounded-md bg-[#0070f31c] p-2"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt=""
                    width={100}
                    height={100}
                    className="h-12 w-10 rounded-md object-cover md:w-16"
                  />
                  <p
                    className={`${
                      file?.name.length > 8 && "truncate"
                    } w-[70px] sm:w-[100px] md:w-[200px]`}
                  >
                    {file?.name}
                  </p>
                  <p>{fileSize}MB</p>
                </div>
              );
            })}
            <div className="absolute right-0 col-start-2 col-end-2 flex w-[50%] flex-col items-center gap-2">
              {resultSet.map((file, index) => {
                const fileSize = (file?.size / 1024 / 1024).toFixed(2);

                return (
                  <section
                    key={index}
                    className="flex h-16 items-center gap-2 md:gap-4"
                  >
                    {!file ? <p>Loading.....</p> : <p>done</p>}
                    <p>{file && `${fileSize}MB`}</p>
                    <button
                      className="border"
                      onClick={() => {
                        download(file);
                      }}
                    >
                      {/* download */}
                      <FaDownload />
                    </button>
                  </section>
                );
              })}
            </div>
          </div>
          {/* </div> */}
          {/* );
          })
        } */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
