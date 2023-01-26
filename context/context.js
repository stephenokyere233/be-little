import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [border, setBorder] = useState("none");
  const [isImage, setIsImage] = useState(true);


  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        border,
        setBorder,
        downloaded,
        setDownloaded,
        isImage,
        setIsImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
