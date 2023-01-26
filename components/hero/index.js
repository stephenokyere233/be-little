import React, { useContext, useEffect, useState } from "react";
import Button from "../button";
import Loader from "../loader/Loader";
import Upload from "../upload";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { AppContext } from "@/context/context";
import { BiCloudDownload } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import useDownload from "@/hooks/useDownload";
import Null from "../null";

const Hero = () => {
  const [fileSet, setFileSet] = useState([]);
  const [resultSet, setResultSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const { border, setBorder, isImage, setIsImage } = useContext(AppContext);
  const { download, downloaded } = useDownload();

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
      setTimeout(() => {
        setResultSet(updatedList);
        setLoading(false);
      }, 700);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const checkIsImage = (file) => {
    if (!file) {
      return false;
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
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
      console.log(newResultList);
    });
  };
  const error = () => {
    toast.error("File format unsupported");
  };

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const files = Array.from(event.target.files);
    if (files.length > 1) {
      setLoading(true);
      const newList = [...fileSet];
      files.map((file) => {
        if (checkIsImage(file)) {
          newList.push(file);
        }
      });
      setFileSet(newList);
      multipleCompression(newList);
    } else {
      if (checkIsImage(image)) {
        const updatedList = [...fileSet, image];
        setFileSet(updatedList);
        setLoading(true);
        compress(image);
      } else {
        error();
        setIsImage(false);
        return;
      }
    }
  };

  const onFileDrop = (event) => {
    event.preventDefault();
    const image = event.dataTransfer.files[0];
    if (!checkIsImage(image)) {
      setIsImage(false);
      setBorder("none");
      error();
      return;
    } else {
      const updatedList = [...fileSet, image];
      setFileSet(updatedList);
      compress(image);
      console.log(image);
    }
    setBorder("none");
  };

  return (
    <div
      className={`relative flex  flex-1 flex-col overflow-y-scroll dark:bg-darkBody`}
    >
      <Toaster />
      <div className="m-2 mx-auto flex h-40 w-[20em] items-center justify-center rounded-lg px-4 lg:w-[30em]">
        <Upload onDrop={onFileDrop} onChange={handleImageUpload} />
      </div>
      <section className="relative mx-auto w-full flex-1 rounded-md md:px-[3em] lg:w-[70%]">
        {fileSet.length <= 0 && <Null />}
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
                    alt={file?.name}
                    width={100}
                    height={100}
                    className="h-12 w-10 rounded-md object-cover md:w-16"
                  />
                  <p
                    className={`${
                      file?.name.length > 8 && "truncate"
                    } w-[60px] sm:w-[100px] md:w-[200px]`}
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
                    className="flex h-16 w-full items-center justify-between gap-2 pr-2 dark:text-gray-400 md:gap-4 md:pr-4"
                  >
                    {<p className="flex pl-2">done</p>}
                    <div className="flex items-center gap-2">
                      <p>{file && `${fileSize}MB`}</p>
                      <Button
                        action={() => {
                          download(file);
                        }}
                        icon={<BiCloudDownload size={24} />}
                      />
                    </div>
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
