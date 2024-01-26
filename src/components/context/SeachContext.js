import React, { createContext, useState } from "react";

export const WallPaperContext = createContext();

export const SearchProvider = ({ children }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateSharedData = (newData) => {
    setWallpapers(newData);
  };
  const updateLoading = (data) => {
    setIsLoading(data);
  };

  return (
    <WallPaperContext.Provider
      value={{ wallpapers, updateSharedData, isLoading, updateLoading }}
    >
      {children}
    </WallPaperContext.Provider>
  );
};
