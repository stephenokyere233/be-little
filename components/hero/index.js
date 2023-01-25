import React, { useContext, useEffect, useState } from "react";
import Button from "../button";
import Container from "../container";
import Loader from "../loader/Loader";
import Upload from "../upload";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { AppContext } from "@/context/context";
import { BiCloudDownload } from "react-icons/bi";

const Hero = () => {
  const [fileSet, setFileSet] = useState([]);
  const [resultSet, setResultSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const { border, setBorder } = useContext(AppContext);
  const [downloaded, setDownloaded] = useState(false);

  const compress = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    setLoading(true);
    try {
      const compressedFile = await imageCompression(file, options);
      const updatedList = [...resultSet, compressedFile];
      // setTimeout(() => {
      setResultSet(updatedList);
      setLoading(false);
      // },700);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const multipleCompression = async (array) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const newResultList = [...resultSet];
    array.map(async (file) => {
      try {
        let compressedFile = await imageCompression(file, options);
        console.log(file);
        newResultList.push(compressedFile);
      } catch (error) {
        console.log(error);
      }
      setResultSet(newResultList);
    });
  };

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const files = Array.from(event.target.files);

    if (files.length > 1) {
      setLoading(true);
      const newList = [...fileSet];
      files.map((file) => {
        newList.push(file);
      });
      setFileSet(newList);
      multipleCompression(newList);
    } else if (files.length <= 0) {
      return;
    } else {
      const updatedList = [...fileSet, image];
      setFileSet(updatedList);
      setLoading(true);
      compress(image);
    }
  };

  console.log(resultSet);

  const onFileDrop = (event) => {
    event.preventDefault();
    console.log("dropped");
    const image = event.dataTransfer.files[0];
    const updatedList = [...fileSet, image];
    setFileSet(updatedList);
    setBorder("none");
    compress(image);
    console.log(event.dataTransfer);
    setBorder("none");
  };
  const download = async (file) => {
    try {
      if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(file);
      const data = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = data;
      link.download = `little-${date}.jpg`;
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
      setDownloaded(true);
    } catch (e) {
      console.log(e);
    }
  };
  const date = new Date();

  return (
    <div className="flex flex-1 flex-col overflow-y-scroll dark:bg-darkBody">
      <div className="m-2 mx-auto flex h-40 w-[20em] items-center justify-center rounded-lg px-4 lg:w-[30em]">
        <Upload onDrop={onFileDrop} onChange={handleImageUpload} />
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
                  className="col-span-2 flex h-16 w-full items-center justify-start gap-2 rounded-md bg-[#0070f31c] p-2 dark:bg-dim dark:text-gray-400"
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
              {/* {resultSet ===null&& <div>Loading..................</div>} */}
              {resultSet.map((file, index) => {
                const fileSize = (file?.size / 1024 / 1024).toFixed(2);

                return (
                  <section
                    key={index}
                    className="flex h-16 items-center gap-2 dark:text-gray-400 md:gap-4"
                  >
                    {!file ? <p>Loading.....</p> : <p>done</p>}
                    <p>{file && `${fileSize}MB`}</p>
                    <button
                      className="rounded-md bg-purple-700 px-4 py-1 text-white"
                      onClick={() => {
                        download(file);
                      }}
                    >
                      <BiCloudDownload size={24} />
                    </button>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
