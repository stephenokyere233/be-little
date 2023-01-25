import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const [finalSize, setFinalSize] = useState("");
  const [initialSize, setInitialSize] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [border, setBorder] = useState("none");


  return (
    <AppContext.Provider
      value={{
        imageFile,
        setImageFile,
        loading,
        setLoading,
        compressedImageFile,
        setCompressedImageFile,
        finalSize,
        setFinalSize,
        initialSize,
        setInitialSize,
        border,
        setBorder,
        downloaded,
        setDownloaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
