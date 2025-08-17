import React from "react";
import { useWatchlist } from "../context/watchlistContext";
import { Link } from "react-router-dom";
import { PlayIcon, Trash2 } from "lucide-react";
import { images } from "../assets/data/assets";

const Watchlist = () => {
  const { watchlist, removeFromList } = useWatchlist();

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <img
          src={images.logo}
          alt="empty"
          className="w-32 opacity-70"/>
        <p className="text-gray-900 mt-4 text-lg">Your Watchlist is empty</p>
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-primary rounded-lg hover:bg-primary/80">
          Browse Subjects
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 text-white min-h-screen ">
      <h1 className="text-gray-900  text-3xl font-bold mb-6">My Watchlist</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {watchlist.map((item) => {
          const subject = item.subjectId || item; // fallback if subjectId is populated
          return (
            <div
              key={item._id}
              className="bg-gray-900 rounded-xl shadow-lg overflow-hidden group hover:scale-[1.02] transition"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="w-full h-48 object-cover"
                />
                <a
                  href={subject.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                >
                  <PlayIcon className="w-12 h-12 text-white bg-red-600 p-2 rounded-full shadow-lg" />
                </a>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {subject.title}
                </h2>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {subject.description}
                </p>
                <div className="flex justify-between mt-3">
                  <a
                    href={subject.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-primary rounded-md hover:bg-primary/80 text-sm"
                  >
                    ▶ Play
                  </a>
                  <button
                    onClick={() => removeFromList(item._id)}
                    className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-500 flex items-center gap-1 text-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
