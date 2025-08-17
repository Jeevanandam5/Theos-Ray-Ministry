// src/api/api.js
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export const getSubjects = () => API.get("/api/subjects");
export const createSubject = (formData) =>
  API.post("/api/subjects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// Watchlist APIs
export const addToWatchlist = (data) => API.post("/api/watchlist", data);
export const getWatchlist = (userId) => API.get(`/api/watchlist/${userId}`);
export const removeFromWatchlist = (id) => API.delete(`/api/watchlist/${id}`);
