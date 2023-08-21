import { useState } from "react";

const useDownload = () => {
  const [downloaded, setDownloaded] = useState(false);
  const date = Date.now();

  const download = async (file) => {
    try {
      if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(file);
      const data = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = data;
      const fileType = file.type.split("/")[1];
      link.download = `little-${date}.${fileType}`;
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
  return { download, downloaded };
};

export default useDownload;
