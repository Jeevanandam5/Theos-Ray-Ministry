import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Subject from "../pages/Subject";
import { images } from "../assets/data/assets";
import { getSubjects } from "@/api/api";
import { useWatchlist } from "../context/watchlistContext";

const HomeScreen = () => {
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const { addToList } = useWatchlist();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await getSubjects();
        setSubjects(data);
        if (data.length > 0) setSelected(data[0]);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  if (!selected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Main Preview */}
      <div className="w-full bg-black text-white min-h-screen flex flex-col">
        <div
          className="relative w-full h-[95vh] md:h-[70vh] bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${selected.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-5 left-5 md:left-16 max-w-3xl grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="flex flex-col sm:items-start md:items-center gap-10">
              <img src={images.logo} alt="logo" className="w-35" />
              <div className="flex gap-4 mt-2 max-sm:hidden">
                <a
                  href={selected.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-primary rounded-md hover:bg-primary/80 transition text-white font-medium">
                  ▶ Play
                </a>
                <button
                  onClick={() => addToList(selected)}
                  className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-400 transition text-white font-medium">
                  + Add to List
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-white text-xl md:text-2xl font-semibold">
                {selected.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-4">
                {selected.description}
              </p>
              <div className="flex gap-4 mt-2 md:hidden">
                <a
                  href={selected.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-primary rounded-md hover:bg-primary/80 transition text-white font-medium">
                  ▶ Play
                </a>
                <button
                  onClick={() => addToList(selected)}
                  className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-400 transition text-white font-medium">
                  + Add to List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto px-8 py-10 max-sm:py-10 bg-black/90 scrollbar-hide">
          {subjects.map((item) => (
            <div
              key={item._id}
              className={`flex-shrink-0 w-28 h-16 md:w-40 md:h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ${selected._id === item._id
                ? "border-primary scale-105"
                : "border-transparent"
                }`}
              onClick={() => setSelected(item)}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover origin-right hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Section */}
      <div
        className="w-full md:min-h-screen md:bg-cover bg-center p-5 md:p-10 flex flex-col items-center justify-start"
        style={{ backgroundImage: `url(${images.download})` }}>
        <div className="grid grid-cols-2 md:gap-15 w-full max-w-6xl">
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex items-center justify-center rounded-2xl">
              <img
                src={images.defaultimage}
                className="object-cover transition-transform duration-700 rounded-2xl group-hover:scale-105 max-sm:w-40 max-sm:p-2"/>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={images.defaultimage}
                className="object-cover transition-transform duration-700 rounded-2xl group-hover:scale-105 max-sm:w-40 max-sm:p-2"/>
            </div>
          </div>

          <div className="flex-1 h-35 mt-7 md:mt-15 md:h-[70vh] border-4 border-white rounded-xl overflow-hidden relative group">
            <a
              href={selected.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full" >
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="bg-red-600 rounded-full p-2 shadow-lg opacity-80 group-hover:opacity-100 transition">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 mt-5 md:mt-20 w-full max-w-6xl overflow-hidden">
          <h1 className="text-primary bg-white p-1 md:px-4 md:py-2 rounded-lg flex-shrink-0  md:text-2xl font-bold animate-slideUp">
            தொடர் பாடம்
          </h1>
          <div className="overflow-hidden w-full">
            <span className="marquee text-white text-sm md:text-base font-medium">
              {selected.description} &nbsp; • &nbsp; {selected.description} &nbsp; • &nbsp; {selected.description}
            </span>
          </div>
        </div>
      </div>

      <div>
        <Subject />
        <Link to="/subject" className="block text-center mt-6">
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 transition rounded-lg font-medium text-white shadow-md hover:shadow-lg cursor-pointer">
            Show More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
