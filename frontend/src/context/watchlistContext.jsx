// src/context/WatchlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../api/api";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const userId = "123"; // temporary until real auth

  // Fetch watchlist on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getWatchlist(userId);
        setWatchlist(data);
      } catch (err) {
        toast.error("❌ Failed to fetch watchlist");
      }
    };
    fetchData();
  }, []);

  // Add item
  const addToList = async (subject) => {
    try {
      await addToWatchlist({ userId, subjectId: subject._id }); // ✅ pass only ids
      toast.success("Added to Watchlist!");
      setWatchlist((prev) => [...prev, subject]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add watchlist");
    }
  };


  // Remove item
  const removeFromList = async (id) => {
    try {
      await removeFromWatchlist(id);
      setWatchlist((prev) => prev.filter((item) => item._id !== id));
      toast.success(" Removed from Watchlist");
    } catch (err) {
      toast.error(" Failed to remove item");
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToList, removeFromList }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
