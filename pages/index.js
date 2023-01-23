import Head from "next/head";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { FaUpload } from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [size, setSize] = useState("");
  const [initialSize, setInitialSize] = useState("");
  const router = useRouter();

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    setImageFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setInitialSize(image.size / 1024 / 1024);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
  };
  // let image;
  const compress = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    console.log("compressing");
    setLoading(true);
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImageFile(compressedFile);
      // image=compressedFile
      // console.log(compressedFile)
      setLoading(false);
      const fileSize = compressedFile.size / 1024 / 1024;
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
      );
      setSize(fileSize.toFixed(2));
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
  // };
  const date = new Date();
  return (
    <div className="flex h-screen flex-col ">
      <Navbar />
      <section className="flex flex-1 flex-col items-center justify-center gap-10 py-6 md:flex-row md:justify-between md:px-10">
        <div className="flex h-[300px] w-[350px] flex-col items-center justify-center rounded-lg border-2 bg-[#0070f31c] p-5 md:w-[400px]">
          <div
            className={`flex w-40  cursor-pointer items-center justify-center rounded-md border border-purple-700 p-4 capitalize ${
              imageFile && "hidden"
            }`}
          >
            <input
              id="upload"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <FaUpload />
            <label
              className="cursor-pointer text-xl font-medium"
              htmlFor="upload"
            >
              upload
            </label>
          </div>
          {imageFile && (
            <>
              <Image
                src={URL.createObjectURL(imageFile)}
                alt=""
                width={400}
                height={400}
                className="h-full object-cover"
              />
              {/* <p>{initialSize.toFixed(2)}MB</p> */}
              <p className="">
                Initial Size:
                <span className="ml-1">{initialSize.toFixed(2)}MB</span>
              </p>
            </>
          )}
        </div>
        <div className="flex w-[400px] flex-col items-center justify-center md:h-[300px]">
          {loading ? (
            <p>Loading..</p>
          ) : compressedImageFile ? (
            <button
              className="rounded-lg border bg-purple-700 px-6 py-3 text-xl font-medium capitalize text-white"
              onClick={download}
            >
              download
            </button>
          ) : (
            <button
              className={`rounded-lg  bg-purple-700 px-6 py-3 text-xl font-medium capitalize text-white ${
                !imageFile && "hidden"
              }`}
              onClick={compress}
            >
              compress
            </button>
          )}

          <div className="">{!imageFile && <p>Please Select an image</p>}</div>
        </div>
        <div className="flex h-[300px] w-[350px] flex-col items-center justify-center rounded-lg  border-2 bg-[#0070f31c] p-5 md:w-[400px]">
          {compressedImageFile && (
            <>
              <Image
                src={URL.createObjectURL(compressedImageFile)}
                alt=""
                width={400}
                height={400}
                className="h-full object-cover"
              />
              <p className="">
                Compressed Size:<span className="ml-1">{size}MB</span>
              </p>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
