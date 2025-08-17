import React, { useEffect, useState } from "react";
import { PlayIcon, PlusIcon } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { getSubjects } from "../api/api"; 
import { useWatchlist } from "../context/watchlistContext"; 
import { toast } from "react-hot-toast"; 

const SubjectDetails = () => {
  const { id } = useParams(); 
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToList } = useWatchlist(); 

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await getSubjects(); 
        const subject = res.data.find((item) => item._id === id);
        setSelected(subject);
      } catch (err) {
        console.error("Error fetching subject details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p> Subject not found. Go back and choose one.</p>
        <Link to="/" className="mt-4 px-4 py-2 bg-primary rounded-md">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-6 py-10 flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={selected.image}
            alt={selected.title}
            className="w-full h-[400px] md:h-[500px] object-cover object-center"
          />
        </div>

        {/* Right Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">{selected.title}</h1>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed">
            {selected.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <a
              href={selected.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/80 transition rounded-full font-medium">
              <PlayIcon className="w-4 h-4" /> Watch Video
            </a>

            <button
              onClick={() => {addToList(selected), toast.success(" Added to Watchlist!");}} 
              className="flex items-center gap-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-full font-medium">
              <PlusIcon className="w-4 h-4" /> Add to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
