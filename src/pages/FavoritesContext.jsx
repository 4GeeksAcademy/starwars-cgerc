
import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.uid === item.uid && fav.type === item.type)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFavorite = (uid, type) => {
    const favorite = favorites.find((fav) => fav.uid === uid && fav.type === type);
    if (favorite) {
      
      setFavorites((prev) => prev.filter((fav) => !(fav.uid === uid && fav.type === type)));
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};